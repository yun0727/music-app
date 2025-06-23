import useOutsideClick from "@/hooks/common/useOutsideClick";
import { PropsWithChildren } from "react";
import { motion } from "framer-motion";

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function SliderPanel({
  open,
  children,
  onClose,
}: PropsWithChildren<Props>) {
  const containerRef = useOutsideClick<HTMLDivElement>(onClose);
  // if (!open) return null;
  return (
    <motion.div
      ref={containerRef}
      initial={{ x: "100%" }}
      animate={open ? "open" : "closed"}
      variants={{
        open: { x: 0 },
        closed: { x: "100%" },
      }}
      className="absolute inset-y-0 h-full right-0 bg-gray900 border-l-2 border-gray800"
    >
      {children}
    </motion.div>
  );
}
