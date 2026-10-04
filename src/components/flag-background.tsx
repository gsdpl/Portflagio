"use client";

import { useRef, useEffect, useCallback } from "react";
import * as THREE from "three";

const vertexShader = /* glsl */ `
  uniform float uTime;
  uniform float uAmplitude;
  varying vec2 vUv;
  varying float vWave;

  void main() {
    vUv = uv;
    vec3 pos = position;
    float wave = sin(pos.x * 2.0 + uTime * 0.7) * uAmplitude
               + sin(pos.y * 1.5 + uTime * 0.4) * uAmplitude * 0.6;
    pos.z += wave;
    vWave = wave;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

const fragmentShader = /* glsl */ `
  uniform sampler2D uTexture;
  varying vec2 vUv;
  varying float vWave;

  void main() {
    vec4 tex = texture2D(uTexture, vUv);
    float shade = 0.94 + vWave * 1.2;
    shade = clamp(shade, 0.86, 1.0);
    vec3 col = tex.rgb * shade;
    gl_FragColor = vec4(col, 1.0);
  }
`;

function extractLogo(
  img: HTMLImageElement,
  tint: string,
  tileSize: number,
): HTMLCanvasElement {
  const c = document.createElement("canvas");
  c.width = tileSize;
  c.height = tileSize;
  const ctx = c.getContext("2d")!;

  ctx.drawImage(img, 0, 0, tileSize, tileSize);

  const imageData = ctx.getImageData(0, 0, tileSize, tileSize);
  const d = imageData.data;

  const tc = document.createElement("canvas").getContext("2d")!;
  tc.fillStyle = tint;
  tc.fillRect(0, 0, 1, 1);
  const tintRgb = tc.getImageData(0, 0, 1, 1).data;

  const bgR = d[0], bgG = d[1], bgB = d[2];

  for (let i = 0; i < d.length; i += 4) {
    const r = d[i], g = d[i + 1], b = d[i + 2];

    const diffR = Math.abs(r - bgR);
    const diffG = Math.abs(g - bgG);
    const diffB = Math.abs(b - bgB);
    const dist = Math.sqrt(diffR * diffR + diffG * diffG + diffB * diffB);

    if (dist < 60) {
      d[i] = 255;
      d[i + 1] = 255;
      d[i + 2] = 255;
      d[i + 3] = 0;
    } else {
      d[i] = tintRgb[0];
      d[i + 1] = tintRgb[1];
      d[i + 2] = tintRgb[2];
      d[i + 3] = 255;
    }
  }

  ctx.putImageData(imageData, 0, 0);
  return c;
}

function buildPatternTexture(
  textureSrc: string,
  tint: string,
): Promise<THREE.CanvasTexture> {
  return new Promise((resolve) => {
    const size = 2048;
    const canvas = document.createElement("canvas");
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext("2d")!;

    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, size, size);

    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      const tileSize = 280;
      const gap = 80;
      const step = tileSize + gap;
      const cols = Math.ceil(size / step) + 1;
      const rows = Math.ceil(size / step) + 1;

      const logoTile = extractLogo(img, tint, tileSize);

      ctx.globalAlpha = 0.2;
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const offsetX = r % 2 === 1 ? step * 0.5 : 0;
          ctx.drawImage(logoTile, c * step + offsetX, r * step, tileSize, tileSize);
        }
      }
      ctx.globalAlpha = 1;

      const tex = new THREE.CanvasTexture(canvas);
      tex.wrapS = THREE.RepeatWrapping;
      tex.wrapT = THREE.RepeatWrapping;
      tex.repeat.set(2, 4);
      tex.needsUpdate = true;
      resolve(tex);
    };
    img.onerror = () => {
      const tex = new THREE.CanvasTexture(canvas);
      tex.wrapS = THREE.RepeatWrapping;
      tex.wrapT = THREE.RepeatWrapping;
      tex.repeat.set(2, 4);
      resolve(tex);
    };
    img.src = textureSrc;
  });
}

export function FlagBackground({
  textureSrc,
  tint,
}: {
  textureSrc: string;
  tint: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<number>(0);
  const startTimeRef = useRef(0);

  const setup = useCallback(async () => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight;
    if (width === 0 || height === 0) return;

    const scene = new THREE.Scene();

    const vFov = 50;
    const camera = new THREE.PerspectiveCamera(vFov, width / height, 0.1, 100);
    const dist = 4;
    camera.position.set(0, 0, dist);
    camera.lookAt(0, 0, 0);

    const vFovRad = (vFov * Math.PI) / 180;
    const visibleH = 2 * Math.tan(vFovRad / 2) * dist;

    const renderer = new THREE.WebGLRenderer({
      alpha: false,
      antialias: false,
      powerPreference: "low-power",
    });
    renderer.setSize(width, height);
    const isMobile = width < 700;
    renderer.setPixelRatio(isMobile ? 1 : Math.min(window.devicePixelRatio, 1.5));
    renderer.setClearColor(0xffffff, 1);
    container.appendChild(renderer.domElement);

    const texture = await buildPatternTexture(textureSrc, tint);

    const material = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uAmplitude: { value: isMobile ? 0.08 : 0.12 },
        uTexture: { value: texture },
      },
      vertexShader,
      fragmentShader,
      side: THREE.FrontSide,
      depthWrite: false,
    });

    const refAspect = 16 / 9;
    const planeH = visibleH * 1.4;
    const planeW = visibleH * refAspect * 1.4;
    const segments = isMobile ? 60 : 120;
    const geometry = new THREE.PlaneGeometry(planeW, planeH, segments, segments);
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    const onResize = () => {
      const w = container.clientWidth;
      const h = container.clientHeight;
      if (w === 0 || h === 0) return;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", onResize);

    startTimeRef.current = performance.now();

    const animate = () => {
      const elapsed = (performance.now() - startTimeRef.current) / 1000;
      material.uniforms.uTime.value = elapsed;
      renderer.render(scene, camera);
      frameRef.current = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(frameRef.current);
      texture.dispose();
      material.dispose();
      geometry.dispose();
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [textureSrc, tint]);

  useEffect(() => {
    let cleanup: (() => void) | undefined;
    setup().then((fn) => {
      cleanup = fn;
    });
    return () => {
      cancelAnimationFrame(frameRef.current);
      cleanup?.();
    };
  }, [setup]);

  return <div ref={containerRef} className="flag-background" aria-hidden="true" />;
}
