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
      }
    }
  }
`;

export default function useGetMixMakers() {
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
