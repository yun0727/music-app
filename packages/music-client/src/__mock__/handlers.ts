import { graphql, http, HttpResponse, passthrough } from "msw";

export const handlers = [
  graphql.query("GetSongs", () => {
    return HttpResponse.json<{ data: { songs: Song[] } }>({
      data: {
        songs: [
          {
            id: 1,
            title: "Song1",
            album: {
              id: 1,
              title: "Album 1",
              artist: { id: 1, name: "Name1" },
              thumbnail: "https://picsum.photos/150",
            },
            genres: [
              {
                id: 1,
                name: "rock",
              },
            ],
            path: "/audio/nodens-field-song-6041.mp3.mp3",
          },
          {
            id: 2,
            title: "Song2",
            album: {
              id: 2,
              title: "Album 2",
              artist: { id: 2, name: "Name2" },
              thumbnail: "https://picsum.photos/150",
            },
            genres: [
              {
                id: 1,
                name: "rock",
              },
            ],
            path: "/audio/nodens-field-song-6041.mp3.mp3",
          },
          {
            id: 3,
            title: "Song3",
            album: {
              id: 3,
              title: "Album 3",
              artist: { id: 3, name: "Name3" },
              thumbnail: "https://picsum.photos/150",
            },
            genres: [
              {
                id: 1,
                name: "rock",
              },
            ],
            path: "/audio/nodens-field-song-6041.mp3.mp3",
          },
          {
            id: 4,
            title: "Song4",
            album: {
              id: 4,
              title: "Album 4",
              artist: { id: 4, name: "Name4" },
              thumbnail: "https://picsum.photos/150",
            },
            genres: [
              {
                id: 1,
                name: "rock",
              },
            ],
            path: "/audio/nodens-field-song-6041.mp3.mp3",
          },
          {
            id: 5,
            title: "Song5",
            album: {
              id: 5,
              title: "Album 5",
              artist: { id: 5, name: "Name5" },
              thumbnail: "https://picsum.photos/150",
            },
            genres: [
              {
                id: 1,
                name: "rock",
              },
            ],
            path: "/audio/nodens-field-song-6041.mp3.mp3",
          },
          {
            id: 6,
            title: "Song6",
            album: {
              id: 6,
              title: "Album 6",
              artist: { id: 6, name: "Name6" },
              thumbnail: "https://picsum.photos/150",
            },
            genres: [
              {
                id: 1,
                name: "rock",
              },
            ],
            path: "/audio/nodens-field-song-6041.mp3.mp3",
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
  http.get(/\/audio\/.*/, () => {
    return passthrough();
  }),
];
