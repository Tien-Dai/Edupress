import { useEffect, useRef, useState } from "react";

export function useScrollButtons(offset = 300) {
  const [showTop, setShowTop] = useState(false);
  const visibleRef = useRef(false); //không gây re-render

  useEffect(() => {
    const onScroll = () => {
      const shouldShow = window.scrollY > offset;

      // Không setState nếu trạng thái không đổi
      if (visibleRef.current !== shouldShow) {
        visibleRef.current = shouldShow;
        setShowTop(shouldShow);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [offset]);

  return { showTop };
}
