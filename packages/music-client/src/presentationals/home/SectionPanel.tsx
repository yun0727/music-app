import Section from "@/presentationals/common/Section";
import SongCard from "@/presentationals/common/SongCard";

interface Props {
  songs: Song[];
  title: string;
  moreLink: string;
}

export default function SectionPanel({ songs, title, moreLink }: Props) {
  return (
    <Section>
      <Section.Title className="flex justify-between">
        <span>{title}</span>
        <a className="text-gray300 text-16 font-medium" href={moreLink}>
          All
        </a>
      </Section.Title>
      <Section.Content>
        <div className="flex">
          {songs?.map((song) => (
            <SongCard key={song.id} variant="vertical" className="shrink-0">
              <SongCard.Image src={song.album.thumbnail} alt={song.title} />
              <SongCard.Content>
                <SongCard.Title>{song.title}</SongCard.Title>
                <SongCard.Description>
                  {song.album.artist.name}
                </SongCard.Description>
              </SongCard.Content>
            </SongCard>
          ))}
        </div>
      </Section.Content>
    </Section>
  );
}
