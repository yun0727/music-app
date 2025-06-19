import { createContext, PropsWithChildren, useContext } from "react";
import { tw } from "@/twMerge";

type Variant = "horizontal" | "vertical";

const SongCardContext = createContext<{ variant: Variant }>({
  variant: "vertical",
});

function SongCard({
  variant,
  children,
  className,
}: Cn<PropsWithChildren<{ variant: Variant }>>) {
  const variantClass =
    variant === "vertical"
      ? "flex-col gap-y-16"
      : "flex-row gap-x-14 items-center";
  return (
    <SongCardContext.Provider value={{ variant }}>
      <div className={tw(variantClass, "flex", className)}>{children}</div>
    </SongCardContext.Provider>
  );
}

function SongCardImage({
  src,
  alt,
  className,
}: Cn<{ src: string; alt: string }>) {
  const { variant } = useContext(SongCardContext);
  const variantClass =
    variant === "vertical" ? "rounded-6 size-150" : "rounded-4 size-50 mr-14";
  return (
    <img
      className={tw(variantClass, "object-cover", className)}
      src={src}
      alt={alt}
    />
  );
}

function SongCardTitle({ children, className }: Cn<PropsWithChildren>) {
  const { variant } = useContext(SongCardContext);
  const variantClass = variant === "vertical" ? "text-white" : "text-gray200 ";
  return <h5 className={tw(variantClass, "text-16", className)}>{children}</h5>;
}

function SongCardDescription({ children, className }: Cn<PropsWithChildren>) {
  const { variant } = useContext(SongCardContext);
  const variantClass =
    variant === "vertical" ? "text-gray300 font-light" : "text-gray500";
  return <p className={tw(variantClass, "text-14", className)}>{children}</p>;
}

function SongCardContent({ children, className }: Cn<PropsWithChildren>) {
  const { variant } = useContext(SongCardContext);
  const variantClass = variant === "vertical" ? "gap-y-11" : "gap-y-7";
  return (
    <div className={tw(variantClass, "flex flex-col ", className)}>
      {children}
    </div>
  );
}

SongCard.Image = SongCardImage;
SongCard.Title = SongCardTitle;
SongCard.Description = SongCardDescription;
SongCard.Content = SongCardContent;
export default SongCard;
