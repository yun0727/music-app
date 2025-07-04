import { graphqlClient } from "../graphqlClient";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { gql } from "graphql-request";

const DELETE_SONG = gql`
  mutation DeleteSong($id: ID!) {
    deleteSong(id: $id) {
      id
      title
      team
      path
      genres {
        id
        name
      }
      tags {
        id
        name
      }
    }
  }
`;

export default function useDeleteSong() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number) => {
      const data = await graphqlClient.request<{
        deleteSong: Song;
      }>(DELETE_SONG, { id: id.toString() });
      return data.deleteSong;
    },
    onSuccess: () => {
      // 삭제 성공 후 songs 쿼리 무효화하여 목록 새로고침
      queryClient.invalidateQueries({ queryKey: ["songs"] });
    },
    onError: (error) => {
      console.error("Error deleting song:", error);
    },
  });
}
