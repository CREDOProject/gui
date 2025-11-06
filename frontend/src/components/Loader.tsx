"use client";

import { useLoader } from "@/hooks/useLoader";
import { cn } from "@/lib/utils";
import React, { useEffect, useState } from "react";

export default function Loader() {
  const { loading } = useLoader();

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    if (loading) {
      setIsMounted(true);
    }
  }, [loading]);

  useEffect(() => {
    if (!loading && isMounted) {
      const timer = setTimeout(() => setIsMounted(loading), 300);
      return () => clearTimeout(timer);
    }
  }, [loading, isMounted]);

  if (!loading && !isMounted) return null;

  return (
    <div
      className={cn(
        "fixed inset-0 h-24 w-full blur-2xl",
        "bg-linear-to-l from-blue-500 via-purple-500 to-pink-500",
        "backdrop-blur-3xl",
        "pointer-events-none z-10",
        "animate-[appear_0.3s_ease-out,glow_3s_linear_infinite]",
        !loading && "animate-disappear",
      )}
    />
  );
}
