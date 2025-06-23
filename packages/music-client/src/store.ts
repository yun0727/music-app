import { create } from "zustand";

interface AppState {
  currentSong: Song | null;
}

interface Action {
  setCurrentSong: (song: Song) => void;
}

export const useAppStore = create<AppState & Action>()((set) => ({
  currentSong: null,
  setCurrentSong: (song: Song) => set({ currentSong: song }),
}));
