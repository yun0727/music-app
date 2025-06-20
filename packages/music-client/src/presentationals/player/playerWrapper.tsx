import { PropsWithChildren } from "react";

export default function PlayerWrapper({ children }: PropsWithChildren) {
  return (
    <div className="fixed inset-x-0 bottom-0 w-full bg-black text-white">
      {children}
    </div>
  );
}
