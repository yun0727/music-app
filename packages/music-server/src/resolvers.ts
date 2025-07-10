import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const resolvers = {
  Query: {
    genres: async () => prisma.genre.findMany(),
    songs: async () =>
      prisma.song.findMany({
        include: {
          genres: true,
          tags: true,
        },
      }),
    //query getMixMakers
    mixMakers: async () =>
      prisma.mixMaker.findMany({
        include: {
          songs: {
            include: {
              genres: true,
            },
          },
        },
      }),
    tags: async () =>
      prisma.tag.findMany({
        include: {
          songs: true,
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
    addSong: async (
      _: any,
      {
        title,
        thumbnail,
        team,
        genreIds,
        path,
      }: {
        title: string;
        thumbnail: string;
        team: string;
        genreIds: string[];
        path: string;
      }
    ) => {
      const song = await prisma.song.create({
        data: {
          title,
          thumbnail,
          team,
          genres: { connect: genreIds.map((id) => ({ id: parseInt(id) })) },
          path,
        },
        include: {
          genres: true,
        },
      });
      return song;
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
    addTag: async (
      _: any,
      { name, songIds }: { name: string; songIds?: string[] }
    ) => {
      const tag = await prisma.tag.create({
        data: {
          name,
          songs: songIds
            ? { connect: songIds.map((id) => ({ id: parseInt(id) })) }
            : undefined,
        },
        include: { songs: true },
      });
      return tag;
    },
    addTagToSong: async (
      _: any,
      { tagId, songId }: { tagId: string; songId: string }
    ) => {
      const song = await prisma.song.update({
        where: { id: parseInt(songId) },
        data: {
          tags: {
            connect: { id: parseInt(tagId) },
          },
        },
        include: { tags: true },
      });
      return song;
    },
    deleteSong: async (_: any, { id }: { id: string }) => {
      const deletedSong = await prisma.song.delete({
        where: { id: parseInt(id) },
        include: {
          genres: true,
          tags: true,
          mixMakers: true,
        },
      });

      return deletedSong;
    },
    deleteMixMaker: async (_: any, { id }: { id: string }) => {
      const deletedMixMaker = await prisma.mixMaker.delete({
        where: {
          id: parseInt(id),
        },
        include: {
          songs: true,
        },
      });
      return deletedMixMaker;
    },
    deleteTag: async (_: any, { id }: { id: string }) => {
      const deletedTag = await prisma.tag.delete({
        where: {
          id: parseInt(id),
        },
        include: {
          songs: true,
        },
      });
      return deletedTag;
    },
  },
};
