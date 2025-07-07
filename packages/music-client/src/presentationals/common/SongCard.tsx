import { createContext, PropsWithChildren, useContext } from "react";
import { tw } from "@/twMerge";
import { motion } from "framer-motion";
import PlayButton from "@/presentationals/player/PlayButton";

type Variant = "horizontal" | "vertical";

const SongCardContext = createContext<{ variant: Variant }>({
  variant: "vertical",
});

function SongCard({
  variant,
  children,
  className,
  onClick,
}: Cn<PropsWithChildren<{ variant: Variant; onClick?: () => void }>>) {
  const variantClass =
    variant === "vertical"
      ? "flex-col gap-y-16"
      : "flex-row gap-x-14 items-center w-full";
  return (
    <SongCardContext.Provider value={{ variant }}>
      <motion.div
        whileTap="tap"
        whileHover="hover"
        variants={{
          hover: { background: "rgba(255, 255, 255, 0.1)" },
          tap: { scale: 0.95 },
          rest: { background: "rgba(255, 255, 255, 0)" },
        }}
        initial="rest"
        className={tw(variantClass, "flex relative p-9 rounded-6", className)}
        onClick={onClick}
      >
        {children}
      </motion.div>
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
    <div className="relative">
      <img
        className={tw(variantClass, "object-cover", className)}
        src={src}
        alt={alt}
      />
      {variant === "vertical" && (
        <motion.div
          className="absolute right-3 bottom-3 size-30"
          variants={{
            hover: { y: 0, opacity: 1 },
            rest: { opacity: 0, y: 9 },
          }}
        >
          <div className="bg-black/70 backdrop-blur-sm rounded-full p-3 shadow-xl h-30">
            <PlayButton status="paused" onToggle={() => {}} />
          </div>
        </motion.div>
      )}
    </div>
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
  const variantClass = variant === "vertical" ? "gap-y-1" : "gap-y-7";
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
