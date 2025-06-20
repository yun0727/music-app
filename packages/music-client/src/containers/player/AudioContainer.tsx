import ProgressBar from "@/containers/player/ProgressBar";
import VolumeController from "@/containers/player/VolumeController";
import useAudioPlayer from "@/hooks/player/useAudioPlayer";
import PlayButton from "@/presentationals/player/PlayButton";

interface Props {
  src: string;
}

export default function AudioContainer({ src }: Props) {
  const {
    audioRef,
    play,
    pause,
    status,
    duration,
    currentTime,
    volume,
    changeCurrentTime,
    changeVolume,
  } = useAudioPlayer();
  return (
    <div className="flex justify-center items-end pt-18 pb-22">
      <div className="flex flex-col gap-y-16">
        <div className="flex gap-x-20 w-[464px] justify-center">
          <div>shuffle</div>
          <div>prev</div>
          <PlayButton
            status={status}
            onToggle={status === "playing" ? pause : play}
          />
          <button>next</button>
          <button>repeat</button>
        </div>
        <div className="flex items-center gap-x-17">
          <ProgressBar
            currentTime={currentTime}
            duration={duration}
            onChange={(seconds) => changeCurrentTime(seconds)}
          />
          <p>{}</p>
        </div>
      </div>
      <div className="ml-61">
        <VolumeController onChange={(v) => changeVolume(v)} volume={volume} />
      </div>
      <audio ref={audioRef} src={src} />
    </div>
  );
}
