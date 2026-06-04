"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

interface LazyOnScrollProps {
  children: ReactNode;
  /** Reserved space before mount so scroll position / layout stays stable. */
  minHeight?: number;
  /** How far ahead of the viewport to begin mounting. */
  rootMargin?: string;
}

// Mounts its children only once they scroll near the viewport. Paired with a
// dynamic(ssr:false) import, this keeps a section's JavaScript out of the initial
// load and defers its hydration until the user actually reaches it.
export function LazyOnScroll({
  children,
  minHeight = 400,
  rootMargin = "300px",
}: LazyOnScrollProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || visible) return;

    // Fallback for environments without IntersectionObserver: render immediately.
    if (typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [rootMargin, visible]);

  return (
    <div ref={ref} style={visible ? undefined : { minHeight }}>
      {visible ? children : null}
    </div>
  );
}
