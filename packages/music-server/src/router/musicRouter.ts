import { Router } from "express";
import { getMusicRecommendations } from "../openai";

const musicRouter = Router();

musicRouter.get("/recommendations", async (req, res) => {
  const tags = req.query.tags as string;
  const recommendations: { artist: string; title: string; album: string }[] =
    await getMusicRecommendations(tags);
  const songs = recommendations.map((song, index) => ({
    id: index,
    title: song.title,
    album: {
      title: song.album,
      artist: {
        name: song.artist,
      },
      thumbnail: "https://picsum.photos/150",
    },
    genres: [],
  }));
  res.json(songs);
});

export default musicRouter;
