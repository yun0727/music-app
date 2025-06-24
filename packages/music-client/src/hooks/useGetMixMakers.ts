import { graphqlClient } from "@/graphqlClient";
import { useQuery } from "@tanstack/react-query";
import { gql } from "graphql-request";

const GET_MIX_MAKERS = gql`
  query GetMixMakers {
    mixMakers {
      id
      name
      description
      songs {
        id
        title
        album {
          id
          title
          artist {
            id
            name
          }
        }
      }
    }
  }
`;

export default function useMixMakers() {
  return useQuery({
    queryKey: ["mixMakers"],
    queryFn: async () => {
      const data = await graphqlClient.request<{
        mixMakers: MixMaker[];
      }>(GET_MIX_MAKERS);
      return data.mixMakers;
    },
    throwOnError: true,
  });
}
