import { graphqlClient } from "@/graphqlClient";
import { useMutation } from "@tanstack/react-query";
import { gql } from "graphql-request";

const DELETE_MIX_MAKER = gql`
  mutation deleteMixMaker($id: ID!) {
    deleteMixMaker(id: $id) {
      id
      name
      description
      songs {
        title
        team
      }
    }
  }
`;

export default function useDeleteMixMaker() {
  return useMutation({
    mutationFn: async (id: string) => {
      const data = await graphqlClient.request<{
        deleteMixMaker: MixMaker;
      }>(DELETE_MIX_MAKER, { id: id.toString() });
      return data.deleteMixMaker;
    },
  });
}
