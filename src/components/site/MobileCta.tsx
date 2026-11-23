"use client";
import { useEffect, useRef } from "react";
import Link from "next/link";

/** Sticky CTA shown under 640px; hides itself while the enquiry form is in view. */
export default function MobileCta({ label }: { label: string }) {
  const ref = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const el = ref.current;
    const target = document.querySelector("#contact");
    if (!el || !target) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) el.setAttribute("data-away", "");
        else el.removeAttribute("data-away");
      },
      { threshold: 0.12 }
    );
    io.observe(target);
    return () => io.disconnect();
  }, []);

  return (
    <Link href="/#contact" className="mobile-cta" ref={ref}>
      {label}{" "}
      <span className="arr" aria-hidden="true">
        →
      </span>
    </Link>
  );
}
