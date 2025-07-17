import { create } from "zustand";

interface AppState {
  currentSong: Song | null;
  currentSongIndex: number;
  isPlayListExpanded: boolean;
  playlist: Song[];
  likedSongs: Song[];
  playlists: Playlist[];
  audioStatus: AudioStatus;
}

interface Action {
  setCurrentSong: (song: Song) => void;
  setCurrentSongIndex: (index: number) => void;
  setAudioStatus: (status: AudioStatus) => void;
  togglePlayList: () => void;
  addToPlayList: (songs: Song[]) => void;
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
  currentSongIndex: -1,
  isPlayListExpanded: false,
  playlist: [],
  likedSongs: [],
  playlists: [],
  audioStatus: "stopped",
  setCurrentSong: (song: Song) => set((state) => {
    const index = state.playlist.findIndex(s => s.id === song.id);
    return { currentSong: song, currentSongIndex: index, audioStatus: "stopped" };
  }),
  setCurrentSongIndex: (index: number) => set({ currentSongIndex: index }),
  setAudioStatus: (status: AudioStatus) => set({ audioStatus: status }),
  togglePlayList: () =>
    set((state) => ({ isPlayListExpanded: !state.isPlayListExpanded })),
  addToPlayList: (songs: Song[]) =>
    set((state) => {
      const existingIds = new Set(state.playlist.map((song) => song.id));
      const newSongs = songs.filter((song) => !existingIds.has(song.id));
      return { playlist: [...state.playlist, ...newSongs] };
    }),
  removeFromPlayList: (song: Song) =>
    set((state) => {
      const newPlaylist = state.playlist.filter((s) => s.id !== song.id);
      let newCurrentSongIndex = state.currentSongIndex;
      
      // 현재 재생 중인 노래가 제거된 경우
      if (state.currentSong && state.currentSong.id === song.id) {
        newCurrentSongIndex = -1;
      } else if (state.currentSongIndex >= 0) {
        // 제거된 노래가 현재 노래보다 앞에 있었던 경우 인덱스 조정
        const removedIndex = state.playlist.findIndex(s => s.id === song.id);
        if (removedIndex < state.currentSongIndex) {
          newCurrentSongIndex = state.currentSongIndex - 1;
        }
      }
      
      return {
        playlist: newPlaylist,
        currentSongIndex: newCurrentSongIndex,
      };
    }),
  setPlaylist: (playlist: Song[]) => set((state) => {
    let newCurrentSongIndex = state.currentSongIndex;
    
    // 현재 노래가 새로운 재생목록에 없는 경우 인덱스 초기화
    if (state.currentSong && !playlist.find(s => s.id === state.currentSong?.id)) {
      newCurrentSongIndex = -1;
    } else if (state.currentSong) {
      // 현재 노래의 새로운 인덱스 찾기
      newCurrentSongIndex = playlist.findIndex(s => s.id === state.currentSong?.id);
    }
    
    return { 
      playlist, 
      currentSongIndex: newCurrentSongIndex 
    };
  }),
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
