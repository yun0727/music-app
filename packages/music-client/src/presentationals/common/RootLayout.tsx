import { PropsWithChildren } from "react";

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <div className="w-full min-h-full flex justify-center bg-gray-900">
      <main className="w-[654px]">{children}</main>
    </div>
  );
}
