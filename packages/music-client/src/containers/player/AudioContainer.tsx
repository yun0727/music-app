import { useEffect } from "react";
import ProgressBar from "@/containers/player/ProgressBar";
import VolumeController from "@/containers/player/VolumeController";
import useAudioPlayer from "@/hooks/player/useAudioPlayer";
import PlayButton from "@/presentationals/player/PlayButton";
import PlayListButton from "@/presentationals/player/PlayListButton";
import { useAppStore } from "@/store";
// import { getAudioUrl } from "@/utils/audio";
import ShuffleIcon from "@/assets/icons/shuffle.svg?react";
import PrevIcon from "@/assets/icons/skip_next.svg?react";
import RepeatIcon from "@/assets/icons/repeat.svg?react";

interface Props {
  src?: string;
}

export default function AudioContainer({ src }: Props) {
  const {
    audioRef,
    play,
    pause,
    duration,
    currentTime,
    volume,
    changeCurrentTime,
    changeVolume,
  } = useAudioPlayer();
  const { togglePlayList, audioStatus, setAudioStatus } = useAppStore();

  // Convert audio path to use proxy in production
  // const audioSrc = src ? getAudioUrl(src) : undefined;

  // 오디오가 끝났을 때 상태 초기화
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleEnded = () => {
      setAudioStatus("stopped");
    };

    audio.addEventListener("ended", handleEnded);
    return () => {
      audio.removeEventListener("ended", handleEnded);
    };
  }, [setAudioStatus, audioRef]);

  return (
    <div className="flex justify-center items-end pt-18 pb-22">
      <div className="flex flex-col gap-y-16">
        <div className="flex gap-x-20 w-[464px] justify-center">
          <ShuffleIcon />
          <PrevIcon className="rotate-180" />

          <PlayButton
            status={audioStatus}
            onToggle={audioStatus === "playing" ? pause : play}
          />
          <PrevIcon />
          <RepeatIcon />
        </div>
        <div className="flex justify-center gap-x-17">
          <ProgressBar
            currentTime={currentTime}
            duration={duration}
            onChange={(seconds) => changeCurrentTime(seconds)}
          />
        </div>
      </div>
      <div className="ml-61 flex">
        <PlayListButton className="mr-10" onClick={() => togglePlayList()} />
        <VolumeController onChange={(v) => changeVolume(v)} volume={volume} />
      </div>
      <audio ref={audioRef} src={src} />
    </div>
  );
}
