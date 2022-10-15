import { useEffect, RefObject } from "react";

type MouseDownHandler = (event: MouseEvent | TouchEvent) => void;

export const useOnClickOutside = <
  RefType extends HTMLElement = HTMLElement,
  ExcludedRefType extends HTMLElement = HTMLElement
>({
  ref,
  handler,
  excludedRef,
}: {
  ref: RefObject<RefType>;
  handler: MouseDownHandler;
  excludedRef?: RefObject<ExcludedRefType>;
}) => {
  useEffect(() => {
    const listener: MouseDownHandler = (event) => {
      const eventTarget = event.target as Node;
      if (
        ref.current === null ||
        ref.current.contains(eventTarget) ||
        (excludedRef !== undefined &&
          excludedRef.current !== null &&
          excludedRef.current.contains(eventTarget))
      ) {
        return;
      }
      handler(event);
    };

    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);

    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, handler, excludedRef]);
};
