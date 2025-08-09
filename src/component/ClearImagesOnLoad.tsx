"use client";

import { useEffect } from "react";

export default function ClearImagesOnLoad() {
  useEffect(() => {
    fetch("/api/clear-images", { method: "POST" });
  }, []);

  return null;
}