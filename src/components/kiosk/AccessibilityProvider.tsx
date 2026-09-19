"use client";

import React, { useEffect } from "react";
import { useKioskStore } from "@/store/kiosk-store";

export function AccessibilityProvider({ children }: { children: React.ReactNode }) {
  const { fontSize, highContrast } = useKioskStore();

  useEffect(() => {
    if (typeof document !== "undefined") {
      const body = document.body;
      body.classList.remove("font-size-large", "font-size-xl");
      if (fontSize === "large") body.classList.add("font-size-large");
      if (fontSize === "xl") body.classList.add("font-size-xl");

      if (highContrast) {
        body.classList.add("high-contrast");
      } else {
        body.classList.remove("high-contrast");
      }
    }
  }, [fontSize, highContrast]);

  return <>{children}</>;
}
