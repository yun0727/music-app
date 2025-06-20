import useGetSongs from "@/hooks/useGetSongs";
import ErrorFallBack from "@/presentationals/common/ErrorFallBack";
import RootLayout from "@/presentationals/common/RootLayout";
import SlidePanel from "@/presentationals/common/SlidePanel";
import SongCard from "@/presentationals/common/SongCard";
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
        <SlidePanel open={open} onClose={handleClose}>
          <div className="w-[300px]">
            <h3>재생목록</h3>
          </div>
        </SlidePanel>
      </RootLayout>
      <PlayerWrapper />
    </QueryClientProvider>
  );
}

function TempComponent() {
  const { data } = useGetSongs();
  return (
    <div className="flex flex-col gap-y-16">
      {data?.map((song) => (
        <SongCard key={song.id} variant="horizontal">
          <SongCard.Image src={"https://picsum.photos/150"} alt={song.title} />
          <SongCard.Content>
            <SongCard.Title>{song.title}</SongCard.Title>
            <SongCard.Description>{song.artist}</SongCard.Description>
          </SongCard.Content>
        </SongCard>
      ))}
    </div>
  );
}

export default App;
