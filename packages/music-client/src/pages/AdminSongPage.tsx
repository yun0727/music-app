import { useState } from "react";
import useGetSongs from "@/hooks/useGetSongs";
import useDeleteSong from "@/hooks/useDeleteSong";
import useAddSong from "@/hooks/useAddSong";
import useGetAlbums from "@/hooks/useGetAlbums";
import useGetGenres from "@/hooks/useGetGenres";

export default function AdminSongPage() {
  const { data: songs } = useGetSongs();
  const { data: albums } = useGetAlbums();
  const { data: genres } = useGetGenres();
  const deleteSongMutation = useDeleteSong();
  const addSongMutation = useAddSong();
  console.log(albums);
  const [title, setTitle] = useState("");
  const [team, setTeam] = useState("");
  const [albumId, setAlbumId] = useState("1");
  const [genreIds, setGenreIds] = useState<string[]>([]);
  const [path, setPath] = useState("");

  // 곡 추가
  const handleAddSong = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !team || !albumId || genreIds.length === 0 || !path) {
      alert("모든 필드를 입력해주세요.");
      return;
    }

    try {
      await addSongMutation.mutateAsync({
        title,
        team,
        albumId,
        genreIds,
        path,
      });

      alert("곡이 성공적으로 추가되었습니다.");

      // 폼 초기화
      setTitle("");
      setTeam("");
      setGenreIds([]);
      setPath("");
    } catch (error) {
      console.error("추가 중 오류 발생:", error);
      alert("곡 추가 중 오류가 발생했습니다.");
    }
  };

  // 곡 삭제
  const handleDeleteSong = async (songId: number) => {
    if (window.confirm("정말로 이 곡을 삭제하시겠습니까?")) {
      try {
        await deleteSongMutation.mutateAsync(songId);
        alert("곡이 성공적으로 삭제되었습니다.");
      } catch (error) {
        console.error("삭제 중 오류 발생:", error);
        alert("삭제 중 오류가 발생했습니다.");
      }
    }
  };

  return (
    <div className="bg-black h-full flex flex-col p-50 items-center mb-70">
      <h2 className="text-gray-400 text-50 mb-30">곡 관리(Admin)</h2>
      <form
        onSubmit={handleAddSong}
        className="flex flex-col gap-30 text-black"
      >
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="곡 제목"
          required
        />
        <input
          value={team}
          onChange={(e) => setTeam(e.target.value)}
          placeholder="팀"
          required
        />
        <select
          value={albumId}
          onChange={(e) => setAlbumId(e.target.value)}
          required
        >
          <option value="">앨범 선택</option>
          {albums?.map((album) => (
            <option key={album.id} value={album.id}>
              {album.title} - {album.artist.name}
            </option>
          ))}
        </select>
        <select
          multiple
          value={genreIds}
          onChange={(e) =>
            setGenreIds(Array.from(e.target.selectedOptions, (o) => o.value))
          }
        >
          {genres?.map((genre) => (
            <option key={genre.id} value={genre.id}>
              {genre.name}
            </option>
          ))}
        </select>
        <input
          value={path}
          onChange={(e) => setPath(e.target.value)}
          placeholder="오디오 파일 경로"
          required
        />
        <button className="text-white border-1 rounded-4" type="submit">
          곡 추가
        </button>
      </form>

      {/* 곡 목록 */}
      <h3 className="mt-20 pb-20">곡 목록</h3>

      <table
        border={1}
        cellPadding={8}
        className="w-full border-1 "
        // style={{ borderCollapse: "collapse" }}
      >
        <thead className="border-1">
          <tr>
            <th>ID</th>
            <th>제목</th>
            <th>팀</th>
            <th>앨범</th>
            <th>장르</th>
            <th>경로</th>
            <th>관리</th>
          </tr>
        </thead>
        <tbody>
          {songs?.map((song) => (
            <tr key={song.id}>
              <td className="border-1  text-center">{song.id}</td>
              <td className="border-1  text-center">{song.title}</td>
              <td className="border-1  text-center">{song.team}</td>
              <td className="border-1  text-center">{song.album?.title}</td>
              <td className="border-1  text-center">
                {song.genres.map((g) => g.name).join(", ")}
              </td>
              <td className="border-1  text-center">{song.path}</td>
              <td className="border-1  text-center">
                <button
                  onClick={() => handleDeleteSong(song.id)}
                  disabled={deleteSongMutation.isPending}
                  className={`text-white px-8 py-4 rounded-4 ${
                    deleteSongMutation.isPending
                      ? "bg-[#666] cursor-not-allowed"
                      : "bg-[#dc2626] cursor-pointer"
                  }`}
                >
                  {deleteSongMutation.isPending ? "삭제 중..." : "삭제"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
