import { gql } from "apollo-server";

export const typeDefs = gql`
  type Song {
    id: ID!
    title: String!
    thumbnail: String!
    team: String!
    genres: [Genre!]!
    path: String!
    tags: [Tag!]
  }
  type Genre {
    id: ID!
    name: String!
  }
  type MixMaker {
    id: ID!
    name: String!
    description: String!
    songs: [Song!]
  }
  type Tag {
    id: ID!
    name: String!
    songs: [Song!]
  }
  # get
  type Query {
    genres: [Genre!]!
    songs: [Song!]!
    mixMakers: [MixMaker!]!
    tags: [Tag!]!
  }
  # add
  type Mutation {
    addGenre(name: String!): Genre!
    addSong(
      title: String!
      thumbnail: String!
      team: String!
      genreIds: [ID!]!
      path: String!
    ): Song!
    addMixMaker(name: String!, description: String!, songIds: [ID!]!): MixMaker!
    addTag(name: String!, songIds: [ID!]): Tag!
    addTagToSong(tagId: ID!, songId: ID!): Song!
    deleteSong(id: ID!): Song!
  }
`;
