import Section from "@/presentationals/common/Section";
import SongCard from "@/presentationals/common/SongCard";
import Tag from "@/presentationals/tag/Tag";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

interface Props {
  songs: Song[];
  title: string;
  moreLink: string;
  onItemClick: (song: Song) => void;
}

export default function SectionPanel({
  songs,
  title,
  moreLink,
  onItemClick,
}: Props) {
  const navigate = useNavigate();
  const [selectedTeam, setSelectedTeam] = useState("전체");
  return (
    <Section>
      <Section.Title className="flex justify-between">
        <span>{title}</span>
        <div className="text-gray300 text-16 font-medium flex gap-10 items-center">
          <a href={moreLink}>All </a>
          <div>|</div>
          <button
            onClick={() => {
              navigate("/admin-song");
            }}
          >
            admin
          </button>
        </div>
      </Section.Title>
      {/* 팀 태그 */}
      <Tag selectedTeam={selectedTeam} onTeamSelect={setSelectedTeam} />
      <Section.Content>
        <div className="flex">
          {songs?.map((song) =>
            selectedTeam === "전체" ? (
              <SongCard
                key={song.id}
                variant="vertical"
                className="shrink-0"
                onClick={() => {
                  onItemClick(song);
                }}
              >
                <SongCard.Image src={song.thumbnail} alt={song.title} />
                <SongCard.Content>
                  <SongCard.Title>{song.title}</SongCard.Title>
                  <SongCard.Description>{song.team}</SongCard.Description>
                </SongCard.Content>
              </SongCard>
            ) : song.team === selectedTeam ? (
              <SongCard
                key={song.id}
                variant="vertical"
                className="shrink-0"
                onClick={() => {
                  onItemClick(song);
                }}
              >
                <SongCard.Image src={song.thumbnail} alt={song.title} />
                <SongCard.Content>
                  <SongCard.Title>{song.title}</SongCard.Title>
                  <SongCard.Description>{song.team}</SongCard.Description>
                </SongCard.Content>
              </SongCard>
            ) : (
              <></>
            )
          )}
        </div>
      </Section.Content>
    </Section>
  );
}
