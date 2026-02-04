"use client";

import { useEffect, useState } from "react";
import { StarsCanvas } from "@/components/main/star-background";

export default function ClientProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  const [enableHeavyFX, setEnableHeavyFX] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setEnableHeavyFX(true);
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {enableHeavyFX && <StarsCanvas />}
      {children}
    </>
  );
}
