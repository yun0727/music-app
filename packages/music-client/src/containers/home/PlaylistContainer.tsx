import PlaylistItem from "@/presentationals/home/PlaylistItem";
import { useAppStore } from "@/store";

export default function PlaylistContainer() {
  const {
    playlist,
    playlists,
    setCurrentSong,
    removeFromPlayList,
    addPlaylist,
    addSongToPlaylist,
    likeSong,
  } = useAppStore();
  return (
    <div className="flex flex-col h-full">
      <h1 className="px-30 py-20 text-gray200 text-24 font-medium w-[522px]">
        재생목록
      </h1>
      <ul className="flex-1 flex flex-col">
        {playlist.length === 0 ? (
          <li className="flex items-center justify-center h-full">
            재생목록이 없습니다.
          </li>
        ) : (
          playlist.map((song) => (
            <PlaylistItem
              onAddSongToPlaylist={addSongToPlaylist}
              onLikeSong={likeSong}
              playlists={playlists}
              onAddPlaylist={addPlaylist}
              key={song.id}
              song={song}
              onClick={(song) => {
                setCurrentSong(song);
              }}
              onRemoveFromPlaylist={(song) => removeFromPlayList(song)}
            />
          ))
        )}
      </ul>
    </div>
  );
}
