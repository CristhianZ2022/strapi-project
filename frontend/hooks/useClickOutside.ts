import { useEffect, useRef } from "react";

export function useClickOutside<T extends HTMLElement = HTMLElement>(
  handler: () => void,
  ignoreRef?: React.RefObject<HTMLElement>,
) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      if (!ref.current || ref.current.contains(event.target as Node)) {
        return;
      }

      if (ignoreRef?.current?.contains(event.target as Node)) {
        return;
      }

      handler();
    };

    document.addEventListener("mousedown", listener, { capture: true });
    document.addEventListener("touchstart", listener, { capture: true });

    return () => {
      document.removeEventListener("mousedown", listener, { capture: true });
      document.removeEventListener("touchstart", listener, { capture: true });
    };
  }, [handler, ignoreRef]);

  return ref;
}
