import { useAppStore } from "@/store";
import { useEffect, useRef, useState } from "react";

export default function useAudioPlayer() {
  // const [status, setStatus] = useState<AudioStatus>("stopped");
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(1);
  const [duration, setDuration] = useState(0);

  const { 
    setAudioStatus, 
    playlist, 
    currentSongIndex, 
    setCurrentSong, 
    setCurrentSongIndex 
  } = useAppStore();

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
    const handleEnded = () => {
      // 재생목록이 있고 현재 노래가 재생목록에 있는 경우에만 다음 노래 재생
      if (playlist.length > 0 && currentSongIndex >= 0 && currentSongIndex < playlist.length - 1) {
        const nextIndex = currentSongIndex + 1;
        const nextSong = playlist[nextIndex];
        setCurrentSongIndex(nextIndex);
        setCurrentSong(nextSong);
        setAudioStatus("playing");
        // 다음 노래 재생
        setTimeout(() => {
          audioRef.current?.play();
        }, 100);
      } else {
        setAudioStatus("stopped");
      }
    };
    audio.addEventListener("timeupdate", updateTime);
    audio.addEventListener("volumechange", updateVolume);
    audio.addEventListener("loadedmetadata", updateDuration);
    audio.addEventListener("ended", handleEnded);
    // 해당 컴포넌트가 unmount 될 때 이벤트 리스너 제거
    return () => {
      audio.removeEventListener("timeupdate", updateTime);
      audio.removeEventListener("volumechange", updateVolume);
      audio.removeEventListener("loadedmetadata", updateDuration);
      audio.removeEventListener("ended", handleEnded);
    };
  }, [playlist, currentSongIndex, setAudioStatus, setCurrentSong, setCurrentSongIndex]);

  const play = () => {
    audioRef.current?.play();
    // setStatus("playing");
    setAudioStatus("playing");
  };
  const pause = () => {
    audioRef.current?.pause();
    setAudioStatus("paused");
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
    currentTime,
    volume,
    duration,
    play,
    pause,
    changeCurrentTime,
    changeVolume,
  };
}
