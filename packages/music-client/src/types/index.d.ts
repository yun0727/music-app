type Cn<T = unknown> = T & { className?: string };

interface Song {
  id: number;
  title: string;
  artist: string;
  genre: string;
}
