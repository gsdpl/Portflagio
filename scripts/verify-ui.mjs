import assert from "node:assert/strict";
import os from "node:os";
import path from "node:path";
import { chromium } from "playwright-core";

const edge =
  "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe";
const baseUrl = process.env.PORTFOLIO_URL ?? "http://localhost:3000";
const browser = await chromium.launch({ executablePath: edge, headless: true });
const results = [];

async function loadAndCheckImages(page) {
  const images = page.locator("img");
  const imageCount = await images.count();
  for (let index = 0; index < imageCount; index += 1) {
    const image = images.nth(index);
    await image.evaluate((element) =>
      element.scrollIntoView({ block: "center", inline: "center" }),
    );
    await image.evaluate(
      (element) =>
        element.complete ||
        new Promise((resolve) => {
          element.addEventListener("load", resolve, { once: true });
          element.addEventListener("error", resolve, { once: true });
        }),
    );
  }
  await page.evaluate(() => window.scrollTo(0, 0));
  const broken = await page.locator("img").evaluateAll((images) =>
    images
      .filter((image) => !image.complete || image.naturalWidth === 0)
      .map((image) => image.getAttribute("src")),
  );
  assert.deepEqual(broken, [], `Broken images: ${broken.join(", ")}`);
}

async function verifyViewport(name, viewport) {
  const context = await browser.newContext({
    viewport,
    reducedMotion: name === "mobile" ? "reduce" : "no-preference",
  });
  const page = await context.newPage();
  const errors = [];
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(message.text());
  });
  page.on("pageerror", (error) => errors.push(error.message));

  await page.goto(`${baseUrl}/en`, { waitUntil: "networkidle" });
  assert.match(await page.title(), /Gaspard Duplaix/);
  await expectVisible(page.getByRole("heading", { name: /Digital project lead/ }));
  await expectVisible(page.getByRole("link", { name: "Download French CV" }));
  assert.equal(
    await page.locator(".brand-emblem").count(),
    4,
    "The home page should use the emblem in the hero, work heading, CV and footer.",
  );
  await loadAndCheckImages(page);
  await page.screenshot({
    path: path.join(os.tmpdir(), `portfolio-${name}-full.png`),
    fullPage: true,
  });

  if (name === "mobile") {
    const menu = page.locator(".menu-trigger");
    await expectVisible(menu);
    await menu.click();
    await expectVisible(page.getByRole("link", { name: "03 Contact", exact: true }));
    await menu.click();
  } else {
    assert.equal(
      await page.locator(".project-card").count(),
      6,
      "The complete project grid should contain six cards.",
    );
    await page.getByRole("radio", { name: /Design/ }).check();
    assert.equal(
      await page.locator(".project-card:visible").count(),
      4,
      "The design filter should show four projects.",
    );
  }

  await page.getByRole("link", { name: /Switch language: FR/ }).click();
  await page.waitForURL("**/fr");
  assert.equal(new URL(page.url()).pathname, "/fr");
  assert.equal(errors.length, 0, `Browser errors on ${name}: ${errors.join(" | ")}`);
  results.push(`${name}: ok`);
  await context.close();
}

async function expectVisible(locator) {
  assert.equal(await locator.isVisible(), true);
}

await verifyViewport("desktop", { width: 1440, height: 1000 });
await verifyViewport("tablet", { width: 768, height: 1024 });
await verifyViewport("mobile", { width: 360, height: 800 });

const projectContext = await browser.newContext({
  viewport: { width: 1440, height: 1000 },
});
const projectPage = await projectContext.newPage();
const projectErrors = [];
projectPage.on("console", (message) => {
  if (message.type() === "error") projectErrors.push(message.text());
});
projectPage.on("pageerror", (error) => projectErrors.push(error.message));
await projectPage.goto(`${baseUrl}/en/projects/neo-travel`, {
  waitUntil: "networkidle",
});
await loadAndCheckImages(projectPage);
await expectVisible(projectPage.getByRole("heading", { name: "NeoTravel" }));
await expectVisible(projectPage.getByRole("link", { name: "Open live project" }));
assert.equal(await projectPage.locator(".project-gallery figure").count(), 3);
const firstGalleryImage = projectPage.locator(".gallery-image-trigger").first();
await firstGalleryImage.click();
await expectVisible(projectPage.getByRole("dialog"));
await expectVisible(projectPage.getByRole("button", { name: "Close enlarged image" }));
await projectPage.keyboard.press("Escape");
assert.equal(await projectPage.getByRole("dialog").count(), 0);
await projectPage.evaluate(() =>
  document
    .querySelector(".gallery-section")
    ?.scrollIntoView({ block: "start", inline: "nearest" }),
);
await projectPage.waitForTimeout(700);
await projectPage.screenshot({
  path: path.join(os.tmpdir(), "portfolio-project-full.png"),
  fullPage: true,
});
assert.equal(projectErrors.length, 0, projectErrors.join(" | "));
results.push("project page: ok");
await projectContext.close();

await browser.close();
console.log(results.join("\n"));
