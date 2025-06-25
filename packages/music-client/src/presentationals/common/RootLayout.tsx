import { PropsWithChildren } from "react";

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    // Slidepanel의 absolute 위치를 고려하여 설정한 relative
    <div className="w-full min-h-full flex justify-center bg-gray900 relative pb-104 overflow-scroll">
      <main className="w-[654px]">{children}</main>
    </div>
  );
}
