import { graphqlClient } from "@/graphqlClient";
import { useMutation } from "@tanstack/react-query";
import { gql } from "graphql-request";

const ADD_MIX_MAKER = gql`
  mutation addMixmaker(
    $name: String!
    $description: String!
    $songIds: [ID!]!
  ) {
    addMixMaker(name: $name, description: $description, songIds: $songIds) {
      name
      description
      songs {
        title
        team
      }
    }
  }
`;

interface AddMixMakerVariables {
  name: string;
  description: string;
  songIds: string[];
}

export default function useAddMixMaker() {
  return useMutation({
    mutationFn: async (variables: AddMixMakerVariables) => {
      const data = await graphqlClient.request<{
        addMixMaker: MixMaker;
      }>(ADD_MIX_MAKER, variables);
      return data.addMixMaker;
    },
  });
}
