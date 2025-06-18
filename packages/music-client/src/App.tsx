import { graphqlClient } from "@/graphqlClient";
import useGetSongs from "@/hooks/useGetSongs";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="bg-red-100 w-full h-full">
        <TempComponent />
      </div>
    </QueryClientProvider>
  );
}

function TempComponent() {
  const { data } = useGetSongs();
  return <div>{data ? JSON.stringify(data) : "loading"}</div>;
}

export default App;
