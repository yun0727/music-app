type Cn<T = unknown> = T & { className?: string };

type AudioStatus = "playing" | "paused" | "stopped";

interface Song {
  id: number;
  title: string;
  artist: string;
  genre: string;
}
