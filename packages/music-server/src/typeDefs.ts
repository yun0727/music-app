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
  }
  type Genre {
    id: ID!
    name: String!
  }
  type Query {
    genres: [Genre!]!
    artists: [Artist!]!
    artist(id: ID!): Artist
    songs: [Song!]!
    albums: [Album!]!
  }
  type Mutation {
    addGenre(name: String!): Genre!
    addArtist(name: String!): Artist!
    addSong(title: String!, albumId: ID!, genreIds: [ID!]!): Song!
    addAlbum(title: String!, releaseDate: String!, artistId: ID!): Album!
  }
`;
