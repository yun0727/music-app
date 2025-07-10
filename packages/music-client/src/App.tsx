import PlaylistContainer from "@/containers/home/PlaylistContainer";
import AudioContainer from "@/containers/player/AudioContainer";

import ErrorFallBack from "@/presentationals/common/ErrorFallBack";
import RootLayout from "@/presentationals/common/RootLayout";
import SliderPanel from "@/presentationals/common/SliderPanel";
import MixMakerContainer from "@/presentationals/home/MixMakerContainer";
import RecommendationsContainer from "@/presentationals/home/RecommendationsContainer";
import SectionPanel from "@/presentationals/home/SectionPanel";
import PlayerWrapper from "@/presentationals/player/playerWrapper";
import { useAppStore } from "@/store";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";

import AdminSongPage from "./pages/AdminSongPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AdminMixMakerPage from "@/pages/AdminMixMakerPage";
import useGetSongs from "@/hooks/get/useGetSongs";
import AdminTagPage from "@/pages/AdminTagPage";

const queryClient = new QueryClient();

function App() {
  const { isPlayListExpanded, currentSong } = useAppStore();

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/admin-song" element={<AdminSongPage />} />
          <Route path="/admin-mix-maker" element={<AdminMixMakerPage />} />
          <Route path="/admin-tag" element={<AdminTagPage />} />
          <Route
            path="/*"
            element={
              <RootLayout>
                <ErrorBoundary FallbackComponent={ErrorFallBack}>
                  <TempComponent />
                  <MixMakerContainer />
                  <RecommendationsContainer />
                </ErrorBoundary>
                <SliderPanel open={isPlayListExpanded}>
                  <PlaylistContainer />
                </SliderPanel>
              </RootLayout>
            }
          />
        </Routes>
        <PlayerWrapper>
          <AudioContainer src={currentSong?.path} />
        </PlayerWrapper>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

function TempComponent() {
  const { data } = useGetSongs();
  const { addToPlayList } = useAppStore();

  return (
    <SectionPanel
      onItemClick={(song) => addToPlayList([song])}
      moreLink="/"
      songs={data ?? []}
      title="음악 추천"
    />
  );
}

export default App;
