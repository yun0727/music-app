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
        ],
      },
    });
  }),
];
