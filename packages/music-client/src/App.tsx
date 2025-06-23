import AudioContainer from "@/containers/player/AudioContainer";
import useGetSongs from "@/hooks/useGetSongs";
import ErrorFallBack from "@/presentationals/common/ErrorFallBack";
import RootLayout from "@/presentationals/common/RootLayout";
import SliderPanel from "@/presentationals/common/SliderPanel";
import SectionPanel from "@/presentationals/home/SectionPanel";
import PlayerWrapper from "@/presentationals/player/playerWrapper";
import { useAppStore } from "@/store";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { ErrorBoundary } from "react-error-boundary";

const queryClient = new QueryClient();

function App() {
  const [open, setOpen] = useState(false);
  const { currentSong, setCurrentSong } = useAppStore();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    setCurrentSong({
      id: 1,
      title: "Song 1",
      album: {
        id: 1,
        title: "Album 1",
        artist: {
          id: 1,
          name: "Artist 1",
        },
        thumbnail: "https://picsum.photos/150",
      },
      genres: [{ id: 1, name: "rock" }],
      path: "http://localhost:4000/audio/nodens-field-song-6041.mp3.mp3",
    });
  }, [setCurrentSong]);
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
        <AudioContainer src={currentSong?.path} />
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
