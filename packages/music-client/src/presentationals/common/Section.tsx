import { tw } from "@/twMerge";
import { PropsWithChildren } from "react";

function Section({ className, children }: Cn<PropsWithChildren>) {
  return (
    <section className={tw("flex flex-col", className)}>{children}</section>
  );
}

function SectionTitle({ className, children }: Cn<PropsWithChildren>) {
  return (
    <h3 className={tw("text-gray200 text-24 font-medium mb-24", className)}>
      {children}
    </h3>
  );
}

function SectionContent({ className, children }: Cn<PropsWithChildren>) {
  return (
    <div className={tw("w-full overflow-x-scroll", className)}>{children}</div>
  );
}

Section.Title = SectionTitle;
Section.Content = SectionContent;

export default Section;
