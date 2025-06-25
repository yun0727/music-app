import { gql } from "apollo-server";

export const typeDefs = gql`
  type Artist {
    id: ID!
    name: String!
    albums: [Album!]
  }
  type Album {
    id: ID!
    title: String!
    artist: Artist!
    songs: [Song!]
    thumbnail: String!
  }
  type Song {
    id: ID!
    title: String!
    genres: [Genre!]!
    album: Album!
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
    artists: [Artist!]!
    artist(id: ID!): Artist
    songs: [Song!]!
    albums: [Album!]!
    mixMakers: [MixMaker!]!
    tags: [Tag!]!
  }
  # add
  type Mutation {
    addGenre(name: String!): Genre!
    addArtist(name: String!): Artist!
    addSong(
      title: String!
      albumId: ID!
      genreIds: [ID!]!
      path: String!
    ): Song!
    addAlbum(
      title: String!
      releaseDate: String!
      thumbnail: String!
      artistId: ID!
    ): Album!
    addMixMaker(name: String!, description: String!, songIds: [ID!]!): MixMaker!
    addTag(name: String!, songIds: [ID!]): Tag!
    addTagToSong(tagId: ID!, songId: ID!): Song!
  }
`;
