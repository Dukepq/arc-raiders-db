import { useState, useEffect } from "react";

export default function useDebounce<T>(value: T, timer: number = 500) {
  const [debouncedVal, setDebouncedVal] = useState<T>(value);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedVal(value);
    }, timer);
    return () => clearTimeout(timeout);
  }, [value, timer]);

  return debouncedVal;
}
