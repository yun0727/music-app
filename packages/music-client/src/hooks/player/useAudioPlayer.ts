import { useEffect, useRef, useState } from "react";

export default function useAudioPlayer() {
  const [status, setStatus] = useState<AudioStatus>("stopped");
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(1);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const updateTime = () => {
      setCurrentTime(audio.currentTime ?? 0);
    };
    const updateVolume = () => {
      setVolume(audio.volume);
    };
    const updateDuration = () => {
      setDuration(audio.duration);
    };
    audio.addEventListener("timeupdate", updateTime);
    audio.addEventListener("volumechange", updateVolume);
    audio.addEventListener("loadedmetadata", updateDuration);
    // 해당 컴포넌트가 unmount 될 때 이벤트 리스너 제거
    return () => {
      audio.removeEventListener("timeupdate", updateTime);
      audio.removeEventListener("volumechange", updateVolume);
      audio.removeEventListener("loadedmetadata", updateDuration);
    };
  }, []);

  const play = () => {
    audioRef.current?.play();
    setStatus("playing");
  };
  const pause = () => {
    audioRef.current?.pause();
    setStatus("paused");
  };

  const changeCurrentTime = (seconds: number) => {
    if (!audioRef.current) return;
    audioRef.current.currentTime = seconds;
    setCurrentTime(seconds);
  };

  const changeVolume = (volume: number) => {
    if (!audioRef.current) return;
    audioRef.current.volume = volume;
  };
  return {
    audioRef,
    status,
    currentTime,
    volume,
    duration,
    play,
    pause,
    changeCurrentTime,
    changeVolume,
  };
}
