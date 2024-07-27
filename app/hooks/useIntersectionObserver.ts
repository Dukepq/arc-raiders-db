import { useEffect, useState, useRef, RefObject } from "react";

export default function useIntersectionObserver(
  ref: RefObject<HTMLElement>,
  observerOptions: IntersectionObserverInit
) {
  const [isObserved, setIsObserved] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);
  useEffect(() => {
    observerRef.current = new IntersectionObserver(([entry]) => {
      setIsObserved(entry.isIntersecting);
    }, observerOptions);
  }, [observerOptions]);
  useEffect(() => {
    if (observerRef.current && ref.current) {
      observerRef.current.observe(ref.current);
    }
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [ref]);
  return isObserved;
}
