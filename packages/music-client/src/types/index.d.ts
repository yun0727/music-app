type Cn<T = unknown> = T & { className?: string };

type AudioStatus = "playing" | "paused" | "stopped";

type Team =
  | "두산 베어스"
  | "LG 트윈스"
  | "키움 히어로즈"
  | "SSG 랜더스"
  | "KIA 타이거즈"
  | "삼성 라이온즈"
  | " kt wiz"
  | "롯데 자이언츠"
  | "한화 이글스"
  | "NC 다이노스";

interface Tag {
  id: number;
  name: string;
}

interface Song {
  id: number;
  title: string;
  team: string;
  genres: Genre[];
  path: string;
  tags?: Tag[];
  thumbnail: string;
}

interface Genre {
  id: number;
  name: string;
}

interface Playlist {
  id: number;
  name: string;
  songs: Song[];
}

interface MixMaker {
  id: string;
  name: string;
  description: string;
  songs: Song[];
}
