import AudioContainer from "@/containers/player/AudioContainer";
import useGetSongs from "@/hooks/useGetSongs";
import ErrorFallBack from "@/presentationals/common/ErrorFallBack";
import RootLayout from "@/presentationals/common/RootLayout";
import SliderPanel from "@/presentationals/common/SliderPanel";
import SectionPanel from "@/presentationals/home/SectionPanel";
import PlayerWrapper from "@/presentationals/player/playerWrapper";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { ErrorBoundary } from "react-error-boundary";

const queryClient = new QueryClient();

function App() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <QueryClientProvider client={queryClient}>
      <RootLayout>
        <ErrorBoundary FallbackComponent={ErrorFallBack}>
          <TempComponent />
        </ErrorBoundary>
        <button onClick={handleOpen}>open</button>
        <SliderPanel open={open} onClose={handleClose}>
          <div className="w-[300px]">
            <h3>재생목록</h3>
          </div>
        </SliderPanel>
      </RootLayout>
      <PlayerWrapper>
        <AudioContainer src="../public/nodens-field-song-6041.mp3.mp3" />
      </PlayerWrapper>
    </QueryClientProvider>
  );
}

function TempComponent() {
  const { data } = useGetSongs();
  return (
    <SectionPanel
      moreLink="/"
      songs={data ?? []}
      title="패캠을 위한 음악 추천"
    />
  );
}

export default App;
