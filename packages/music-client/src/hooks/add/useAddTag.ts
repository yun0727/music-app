import { graphqlClient } from "@/graphqlClient";
import { useMutation } from "@tanstack/react-query";
import { gql } from "graphql-request";

const ADD_TAG = gql`
  mutation addTag(name: $name) {
    name
  }
`;

interface AddTagVariables {
  name: string;
}

export default function useAddTag() {
  return useMutation({
    mutationFn: async (variables: AddTagVariables) => {
      const data = await graphqlClient.request<{
        addTag: Tag;
      }>(ADD_TAG, variables);
      return data.addTag;
    },
  });
}
