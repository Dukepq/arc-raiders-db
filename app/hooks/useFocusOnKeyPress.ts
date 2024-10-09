import { MutableRefObject, useEffect } from "react";

export default function useFocusOnKeyPress(
  ref: MutableRefObject<HTMLElement | null>,
  keyOptions: Partial<
    Pick<KeyboardEvent, "altKey" | "ctrlKey" | "shiftKey">
  > & { keys: string[] }
) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!ref.current) return;
      if (keyOptions.ctrlKey && !e.ctrlKey) return;
      if (keyOptions.altKey && !e.altKey) return;
      if (keyOptions.shiftKey && !e.shiftKey) return;
      if (!keyOptions.keys.includes(e.key)) return;

      ref.current.focus();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);
}
