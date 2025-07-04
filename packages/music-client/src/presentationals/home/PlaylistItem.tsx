import SongCard from "@/presentationals/common/SongCard";
import MenuIcon from "@/assets/icons/more_horiz.svg?react";
import { useState } from "react";
import Menu from "@/containers/common/Menu";
import AddIcon from "@/assets/icons/add.svg?react";
import AddCircleIcon from "@/assets/icons/add_circle.svg?react";
import DeleteIcon from "@/assets/icons/delete.svg?react";

interface Props {
  song: Song;
  playlists: Playlist[];
  onClick: (song: Song) => void;
  onRemoveFromPlaylist: (song: Song) => void;
  onAddPlaylist: (song: Song) => void;
  onAddSongToPlaylist: (id: number, song: Song) => void;
  onLikeSong: (song: Song) => void;
}

export default function PlaylistItem({
  song,
  playlists,
  onClick,
  onRemoveFromPlaylist,
  onAddPlaylist,
  onAddSongToPlaylist,
  onLikeSong,
}: Props) {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex relative" onClick={() => onClick(song)}>
      <button
        className="absolute top-10 right-17 z-10"
        onClick={() => setOpen((prev) => !prev)}
      >
        <MenuIcon />
      </button>

      {open && (
        <Menu
          className="absolute right-0 left-auto top-48 z-20"
          onClose={() => setOpen(false)}
        >
          <Menu.MenuItem
            label={
              <div className="flex">
                <AddIcon className="mr-6" />
                <span>플레이리스트에 추가하기</span>
              </div>
            }
            value="1"
          >
            <Menu.Submenu>
              <Menu.MenuItem
                label={
                  <div className="flex">
                    <AddIcon className="mr-6" />
                    <span>새 플레이리스트</span>
                  </div>
                }
                onSelect={() => onAddPlaylist(song)}
                value="sub1"
              />
              {playlists.map((playlist) => (
                <Menu.MenuItem
                  label={playlist.name}
                  value={`${playlist.id}`}
                  onSelect={() => onAddSongToPlaylist(playlist.id, song)}
                />
              ))}
            </Menu.Submenu>
          </Menu.MenuItem>
          <Menu.MenuItem
            label={
              <div className="flex">
                <AddCircleIcon className="mr-6" />
                <span>좋아요 표시한 곡에 저장하기</span>
              </div>
            }
            value="2"
            onSelect={() => onLikeSong(song)}
          />
          <Menu.MenuItem
            label={
              <div className="flex">
                <DeleteIcon className="mr-6" />
                <span>재생목록에서 삭제</span>
              </div>
            }
            value="2"
            onSelect={() => onRemoveFromPlaylist(song)}
          />
        </Menu>
      )}
      <SongCard variant="horizontal">
        <SongCard.Image src={song.thumbnail} alt={song.title} />
        <SongCard.Content>
          <SongCard.Title>{song.title}</SongCard.Title>
        </SongCard.Content>
      </SongCard>
    </div>
  );
}
