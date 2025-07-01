import PlaylistItem from "@/presentationals/home/PlaylistItem";
import { useAppStore } from "@/store";
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "react-beautiful-dnd";

export default function PlaylistContainer() {
  const {
    playlist,
    playlists,
    setCurrentSong,
    removeFromPlayList,
    setPlaylist,
    addPlaylist,
    addSongToPlaylist,
    likeSong,
  } = useAppStore();
  //1. handler설정
  const handleOnDragEnd = (result: DropResult) => {
    if (!result.destination) {
      return;
    }
    const items = Array.from(playlist);
    // 원래 위치에서 제거
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setPlaylist(items);
  };
  return (
    <div className="flex flex-col h-full">
      <h1 className="px-30 py-20 text-gray200 text-24 font-medium w-[522px]">
        재생목록
      </h1>
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="playlist_1">
          {(provided) => (
            <ul
              className="flex-1 flex flex-col"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {playlist.length === 0 ? (
                <li className="flex items-center justify-center h-full">
                  재생목록이 없습니다.
                </li>
              ) : (
                playlist.map((song, index) => (
                  <Draggable
                    key={`${song.id}-${index}`}
                    draggableId={`${song.id}-${index}`}
                    index={index}
                  >
                    {(provided) => (
                      <li
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                      >
                        <PlaylistItem
                          onAddSongToPlaylist={addSongToPlaylist}
                          onLikeSong={likeSong}
                          playlists={playlists}
                          onAddPlaylist={addPlaylist}
                          song={song}
                          onClick={(song) => {
                            setCurrentSong(song);
                          }}
                          onRemoveFromPlaylist={(song) =>
                            removeFromPlayList(song)
                          }
                        />
                      </li>
                    )}
                  </Draggable>
                ))
              )}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}
