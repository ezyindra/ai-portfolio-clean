"use client";

import { useEffect, useState } from "react";

export default function DelayedMount({
  children,
  delay = 300,
}: {
  children: React.ReactNode;
  delay?: number;
}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const id = setTimeout(() => setMounted(true), delay);
    return () => clearTimeout(id);
  }, [delay]);

  if (!mounted) return null;
  return <>{children}</>;
}
