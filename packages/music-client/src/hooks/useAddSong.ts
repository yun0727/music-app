import { graphqlClient } from "../graphqlClient";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { gql } from "graphql-request";

const ADD_SONG = gql`
  mutation AddSong(
    $title: String!
    $thumbnail: String!
    $team: String!
    $genreIds: [ID!]!
    $path: String!
  ) {
    addSong(title: $title, thumbnail: $thumbnail, team: $team, genreIds: $genreIds, path: $path) {
      id
      title
      thumbnail
      team
      path
      genres {
        id
        name
      }
    }
  }
`;

interface AddSongVariables {
  title: string;
  thumbnail: string;
  team: string;
  genreIds: string[];
  path: string;
}

export default function useAddSong() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (variables: AddSongVariables) => {
      const data = await graphqlClient.request<{
        addSong: Song;
      }>(ADD_SONG, variables);
      return data.addSong;
    },
    onSuccess: () => {
      // 추가 성공 후 songs 쿼리 무효화하여 목록 새로고침
      queryClient.invalidateQueries({ queryKey: ["songs"] });
    },
    onError: (error) => {
      console.error("Error adding song:", error);
    },
  });
}
