import VolumeIcon from "@/assets/icons/volume_up.svg?react";
import Slider from "@/presentationals/player/Slider";
import { ChangeEvent } from "react";

interface Props {
  volume: number;
  onChange: (volume: number) => void;
}

export default function VolumeController({ onChange, volume }: Props) {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const v = Number(e.currentTarget.value);
    onChange(v);
  };
  return (
    <div className="flex gap-x-6 items-center w-[96px]">
      <VolumeIcon />
      <Slider
        min={0}
        max={1}
        step={0.01}
        onChange={handleChange}
        value={volume}
      />
    </div>
  );
}
