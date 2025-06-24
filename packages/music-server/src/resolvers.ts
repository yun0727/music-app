import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const resolvers = {
  Query: {
    genres: async () => prisma.genre.findMany(),
    artists: async () =>
      prisma.artist.findMany({
        // include -> prisma에 작성된 relation 항목
        include: { albums: true },
      }),
    artist: async (_: any, { id }: { id: string }) => {
      const artist = await prisma.artist.findUnique({
        where: { id: parseInt(id) },
        include: { albums: true },
      });
      return artist;
    },
    songs: async () =>
      prisma.song.findMany({
        include: {
          genres: true,
          album: {
            include: { artist: true },
          },
        },
      }),
    albums: async () =>
      prisma.album.findMany({
        include: {
          artist: true,
          songs: true,
        },
      }),
    //query getMixMakers
    mixMakers: async () =>
      prisma.mixMaker.findMany({
        include: {
          songs: {
            include: {
              genres: true,
              album: {
                include: { artist: true },
              },
            },
          },
        },
      }),
  },
  Mutation: {
    // typeDefs에서 정의한 Mutation에 대한 resolver 함수
    addGenre: async (_: any, { name }: { name: string }) => {
      const genre = await prisma.genre.create({
        data: { name },
      });
      return genre;
    },
    addArtist: async (_: any, { name }: { name: string }) => {
      const artist = await prisma.artist.create({
        data: { name },
      });
      return artist;
    },
    addSong: async (
      _: any,
      {
        title,
        albumId,
        genreIds,
        path,
      }: { title: string; albumId: string; genreIds: string[]; path: string }
    ) => {
      const song = await prisma.song.create({
        data: {
          title,
          album: { connect: { id: parseInt(albumId) } },
          genres: { connect: genreIds.map((id) => ({ id: parseInt(id) })) },
          path,
        },
        include: {
          album: true,
          genres: true,
        },
      });
      return song;
    },
    addAlbum: async (
      _: any,
      {
        title,
        releaseDate,
        artistId,
        thumbnail,
      }: {
        title: string;
        releaseDate: string;
        artistId: string;
        thumbnail: string;
      }
    ) => {
      const artist = await prisma.artist.findUnique({
        where: { id: parseInt(artistId) },
      });
      if (!artist) {
        throw new Error(`Artist with ID ${artistId} not found`);
      }
      const album = await prisma.album.create({
        data: {
          title,
          releaseDate: new Date(releaseDate),
          artist: { connect: { id: parseInt(artistId) } },
          thumbnail,
        },
        include: {
          artist: true,
        },
      });
      return album;
    },
    addMixMaker: async (
      _: any,
      {
        name,
        description,
        songIds,
      }: { name: string; description: string; songIds: string[] }
    ) => {
      const mixMaker = await prisma.mixMaker.create({
        data: {
          name,
          description,
          songs: {
            connect: songIds.map((id) => ({
              id: parseInt(id),
            })),
          },
        },
        include: { songs: true },
      });
      return mixMaker;
    },
  },
};
