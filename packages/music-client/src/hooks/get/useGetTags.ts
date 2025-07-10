import { graphqlClient } from "@/graphqlClient";
import { useQuery } from "@tanstack/react-query";
import { gql } from "graphql-request";

const GET_TAGS = gql`
  query GetTags {
    tags {
      name
      songs {
        title
        team
      }
    }
  }
`;

export default function useGetTags() {
  return useQuery({
    queryKey: ["tags"],
    queryFn: async () => {
      const data = await graphqlClient.request<{
        tags: Tag[];
      }>(GET_TAGS);
      return data.tags;
    },
  });
}
