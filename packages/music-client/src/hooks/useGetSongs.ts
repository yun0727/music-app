import { graphqlClient } from "@/graphqlClient";
import { useQuery } from "@tanstack/react-query";
import { gql } from "graphql-request";

const GET_SONGS = gql`
  query GetSongs {
    songs {
      id
      title
      path
      team
      album {
        artist {
          id
          name
        }
        id
        title
        thumbnail
      }
      genres {
        id
        name
      }
    }
  }
`;

export default function useGetSongs() {
  return useQuery({
    queryKey: ["songs"],
    queryFn: async () => {
      const data = await graphqlClient.request<{
        songs: Song[];
      }>(GET_SONGS);
      return data.songs;
    },
    throwOnError: true,
  });
}
