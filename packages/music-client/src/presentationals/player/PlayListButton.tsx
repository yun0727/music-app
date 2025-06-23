import { tw } from "@/twMerge";
import { ButtonHTMLAttributes } from "react";
import PlayListIcon from "@/assets/icons/menu.svg?react";

export default function PlayListButton({
  className,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button className={tw(className)} {...props}>
      <PlayListIcon />
    </button>
  );
}
