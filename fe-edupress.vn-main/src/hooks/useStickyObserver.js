import { useEffect, useRef } from "react";


const useStickyObserver = (onChange, threshold = 200) => {
  const lastValue = useRef(false);

  useEffect(() => {
    const onScroll = () => {
      const shouldShow = window.scrollY > threshold;
      if (lastValue.current !== shouldShow) {
        lastValue.current = shouldShow;
        onChange(shouldShow);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [onChange, threshold]);
};


export {
    useStickyObserver
}