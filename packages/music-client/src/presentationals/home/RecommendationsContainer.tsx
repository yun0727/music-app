import useGetRecommendations from "@/hooks/useGetRecommendations";
import SectionPanel from "@/presentationals/home/SectionPanel";
import { useAppStore } from "@/store";

export default function RecommendationsContainer() {
  const { playlist, addToPlayList } = useAppStore();
  const tags = playlist
    .map((song) => [
      ...song.genres.map((genre) => genre.name),
      ...(song.tags?.map((tag) => tag.name) ?? []),
    ])
    .flat();
  const { data } = useGetRecommendations(tags);
  return (
    data && (
      <SectionPanel
        onItemClick={(song) => addToPlayList([song])}
        moreLink="/"
        songs={data}
        title="AI 추천 곡"
      />
    )
  );
}
