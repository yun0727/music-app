import { Router } from "express";
import { getMusicRecommendations } from "../openai";

const musicRouter = Router();

musicRouter.get("/recommendations", async (req, res) => {
  const tags = req.query.tags as string;
  const recommendations: { title: string }[] = await getMusicRecommendations(
    tags
  );
  const songs = recommendations.map((song, index) => ({
    id: index,
    title: song.title,
    genres: [],
  }));
  res.json(songs);
});

export default musicRouter;
