import { graphql, HttpResponse } from "msw";

export const handlers = [
  graphql.query("GetSongs", () => {
    return HttpResponse.json({
      data: {
        songs: [
          {
            id: 1,
            title: "Song1",
            artist: "Artist1",
            genre: "rock",
          },
          {
            id: 2,
            title: "Song1",
            artist: "Artist1",
            genre: "rock",
          },
          {
            id: 3,
            title: "Song1",
            artist: "Artist1",
            genre: "rock",
          },
          {
            id: 4,
            title: "Song1",
            artist: "Artist1",
            genre: "rock",
          },
          {
            id: 5,
            title: "Song1",
            artist: "Artist1",
            genre: "rock",
          },
          {
            id: 6,
            title: "Song1",
            artist: "Artist1",
            genre: "rock",
          },
          {
            id: 7,
            title: "Song1",
            artist: "Artist1",
            genre: "rock",
          },
          {
            id: 8,
            title: "Song1",
            artist: "Artist1",
            genre: "rock",
          },
        ],
      },
    });
    // return HttpResponse.json({
    //   errors: [
    //     {
    //       message: "Internal Server Error",
    //     },
    //   ],
    // });
  }),
];
