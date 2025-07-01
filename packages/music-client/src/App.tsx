import PlaylistContainer from "@/containers/home/PlaylistContainer";
import AudioContainer from "@/containers/player/AudioContainer";
import useGetSongs from "@/hooks/useGetSongs";
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

const queryClient = new QueryClient();

function App() {
  const { isPlayListExpanded, currentSong } = useAppStore();
  console.log(isPlayListExpanded);
  return (
    <QueryClientProvider client={queryClient}>
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
      <PlayerWrapper>
        <AudioContainer src={currentSong?.path} />
      </PlayerWrapper>
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
