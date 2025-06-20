import { useEffect, useRef } from "react";

export default function useOutsideClick<RefType extends HTMLElement>(
  callback: () => void
) {
  const ref = useRef<RefType>(null);
  console.log(ref);
  useEffect(() => {
    const handleClick = (e: MouseEvent | TouchEvent) => {
      // 클릭된 요소가 있고 클릭된 요소가 내부에 없으면 callback 실행
      // 외부만 클릭했을때
      if (ref.current && !ref.current.contains(e.target as Node)) {
        callback();
      }
    };
    document.addEventListener("mousedown", handleClick);
    document.addEventListener("touchstart", handleClick);
    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("touchstart", handleClick);
    };
  }, []);
  return ref;
}
