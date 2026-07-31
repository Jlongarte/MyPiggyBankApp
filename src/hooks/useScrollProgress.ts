
import { useState, useEffect } from "react";

export const useScrollProgress = (maxScrollLimit = 700) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentProgress = Math.min(1, Math.max(0, window.scrollY / maxScrollLimit));
      setProgress(currentProgress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [maxScrollLimit]);

  return progress;
};