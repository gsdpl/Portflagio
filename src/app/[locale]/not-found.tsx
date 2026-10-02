import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <main id="main-content" className="not-found">
      <span>404 · Lost / Perdu</span>
      <h1>This page has wandered off.</h1>
      <p>
        The page may have moved, or the link may be taking a creative detour.
      </p>
      <Link href="/en">
        <ArrowLeft aria-hidden="true" />
        Return home
      </Link>
    </main>
  );
}
