import Section from "@/presentationals/common/Section";
import SongCard from "@/presentationals/common/SongCard";
import thumbnail1 from "@/assets/images/mixmaker1.png";
import thumbnail2 from "@/assets/images/mixmaker2.png";
import thumbnail3 from "@/assets/images/mixmaker3.png";
import thumbnail4 from "@/assets/images/mixmaker4.png";

interface Props {
  title: string;
  mixMakers: MixMaker[];
  onItemClick: (songs: Song[]) => void;
}

export default function MixMakerPanel({
  title,
  mixMakers,
  onItemClick,
}: Props) {
  return (
    <Section>
      <Section.Title className="flex justify-between">
        <span>{title}</span>
      </Section.Title>
      <Section.Content>
        <div className="flex">
          {mixMakers.map((mixMaker) => (
            <SongCard
              key={mixMaker.id}
              variant="vertical"
              className="shrink-0"
              onClick={() => onItemClick(mixMaker.songs)}
            >
              <SongCard.Image src={getRandomThumbnail()} alt={mixMaker.id} />
              <SongCard.Content>
                <SongCard.Title>{mixMaker.name}</SongCard.Title>
                <SongCard.Description>
                  {mixMaker.description}
                </SongCard.Description>
              </SongCard.Content>
            </SongCard>
          ))}
        </div>
      </Section.Content>
    </Section>
  );
}

const getRandomThumbnail = () => {
  const thumbnails = [thumbnail1, thumbnail2, thumbnail3, thumbnail4];
  return thumbnails[Math.floor(Math.random() * thumbnails.length)];
};
