import useGetSongs from "@/hooks/useGetSongs";
import ErrorFallBack from "@/presentationals/common/ErrorFallBack";
import RootLayout from "@/presentationals/common/RootLayout";
import PlayerWrapper from "@/presentationals/player/playerWrapper";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RootLayout>
        <ErrorBoundary FallbackComponent={ErrorFallBack}>
          <TempComponent />
        </ErrorBoundary>
      </RootLayout>
      <PlayerWrapper />
    </QueryClientProvider>
  );
}

function TempComponent() {
  const { data } = useGetSongs();
  return <div>{data ? JSON.stringify(data) : "loading"}</div>;
}

export default App;
