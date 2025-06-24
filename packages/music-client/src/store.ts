import { create } from "zustand";

interface AppState {
  currentSong: Song | null;
  isPlayListExpanded: boolean;
  playlist: Song[];
  likedSongs: Song[];
  playlists: Playlist[];
}

interface Action {
  setCurrentSong: (song: Song) => void;
  togglePlayList: () => void;
  addToPlayList: (song: Song) => void;
  removeFromPlayList: (song: Song) => void;
  setPlaylist: (playlist: Song[]) => void;
  likeSong: (song: Song) => void;
  unlikeSong: (song: Song) => void;
  // 플레이리스트 추가
  addPlaylist: (song: Song) => void;
  // 플레이리스트에 노래 추가
  addSongToPlaylist: (id: number, song: Song) => void;
}

export const useAppStore = create<AppState & Action>()((set) => ({
  currentSong: null,
  isPlayListExpanded: false,
  playlist: [],
  likedSongs: [],
  playlists: [],
  setCurrentSong: (song: Song) => set({ currentSong: song }),
  togglePlayList: () =>
    set((state) => ({ isPlayListExpanded: !state.isPlayListExpanded })),
  addToPlayList: (song: Song) =>
    set((state) => ({ playlist: [...state.playlist, song] })),
  removeFromPlayList: (song: Song) =>
    set((state) => ({
      playlist: state.playlist.filter((s) => s.id !== song.id),
    })),
  setPlaylist: (playlist: Song[]) => set({ playlist }),
  likeSong: (song: Song) =>
    set((state) => ({ likedSongs: { ...state.likedSongs, song } })),
  unlikeSong: (song: Song) =>
    set((state) => ({
      likedSongs: state.likedSongs.filter((s) => s.id !== song.id),
    })),
  addPlaylist: (song: Song) =>
    set((state) => ({
      playlists: [
        ...state.playlists,
        { id: Date.now(), name: song.title, songs: [song] },
      ],
    })),
  addSongToPlaylist: (id: number, song: Song) =>
    set((state) => ({
      playlists: state.playlists.map((playlist) =>
        playlist.id === id
          ? { ...playlist, songs: [...playlist.songs, song] }
          : playlist
      ),
    })),
}));
