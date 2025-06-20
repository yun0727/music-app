import PlayIcon from "@/assets/icons/play_circle.svg?react";
import PauseIcon from "@/assets/icons/pause_circle.svg?react";

interface Props {
  status: AudioStatus;
  onToggle: () => void;
}
export default function PlayButton({ onToggle, status }: Props) {
  return (
    <button onClick={onToggle}>
      {status === "playing" ? <PauseIcon /> : <PlayIcon />}
    </button>
  );
}
