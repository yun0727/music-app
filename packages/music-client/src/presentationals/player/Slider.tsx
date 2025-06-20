import { InputHTMLAttributes } from "react";

export default function Slider({
  min,
  max,
  ...props
}: InputHTMLAttributes<HTMLInputElement>) {
  return <input type="range" {...props} min={min} max={max} />;
}
