import useOutsideClick from "@/hooks/common/useOutsideClick";
import { PropsWithChildren } from "react";

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function SlidePanel({
  open,
  children,
  onClose,
}: PropsWithChildren<Props>) {
  const containerRef = useOutsideClick<HTMLDivElement>(onClose);
  if (!open) return null;
  return (
    <div
      ref={containerRef}
      className="absolute inset-y-0 h-full right-0 bg-gray900 border-l-2 border-gray800"
    >
      {children}
    </div>
  );
}
