"use client";

import { useEffect, useId, useRef, useState } from "react";
import Link from "next/link";

type NavLink = { label: string; link: string };

/* Hamburger button + dropdown panel. Only visible on small screens (see globals.css). */
export default function MobileMenu({
  links,
  buttonLabel,
}: {
  links: NavLink[];
  buttonLabel: string;
}) {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    const onClick = (e: MouseEvent) => {
      const t = e.target as Node;
      if (!panelRef.current?.contains(t) && !toggleRef.current?.contains(t)) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("click", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("click", onClick);
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <>
      <button
        ref={toggleRef}
        type="button"
        className="menu-toggle"
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => setOpen((o) => !o)}
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
          {open ? (
            <path d="M6 6l12 12M18 6L6 18" />
          ) : (
            <path d="M4 7h16M4 12h16M4 17h16" />
          )}
        </svg>
      </button>
      <div ref={panelRef} id={panelId} className={`menu-panel${open ? " is-open" : ""}`}>
        {links.map((l) => (
          <Link key={l.link} href={l.link} onClick={close}>
            {l.label}
          </Link>
        ))}
        <Link href="/#contact" className="btn btn-ink" onClick={close}>
          {buttonLabel}
        </Link>
      </div>
    </>
  );
}
