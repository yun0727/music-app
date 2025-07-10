import { useState } from "react";

import AdminNavBar from "@/presentationals/common/AdminNavBar";
import { Slide, toast, ToastContainer } from "react-toastify";
import useGetSongs from "@/hooks/get/useGetSongs";
import useGetGenres from "@/hooks/get/useGetGenres";
import useGetTags from "@/hooks/get/useGetTags";
import useDeleteSong from "@/hooks/delete/useDeleteSong";
import useAddSong from "@/hooks/add/useAddSong";

export default function AdminSongPage() {
  const { data: songs } = useGetSongs();
  const { data: genres } = useGetGenres();
  const { data: tags } = useGetTags();

  const deleteSongMutation = useDeleteSong();
  const addSongMutation = useAddSong();

  const [title, setTitle] = useState("");
  const teams = [
    "두산 베어스",
    "LG 트윈스",
    "키움 히어로즈",
    "SSG 랜더스",
    "KIA 타이거즈",
    "삼성 라이온즈",
    " kt wiz",
    "롯데 자이언츠",
    "한화 이글스",
    "NC 다이노스",
  ];
  const [team, setTeam] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [tagIds, setTagIds] = useState<string[]>([]);
  const [genreIds, setGenreIds] = useState<string[]>([]);
  const [path, setPath] = useState("");

  // 곡 추가
  const handleAddSong = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addSongMutation.mutateAsync({
        title,
        thumbnail,
        team,
        tagIds,
        genreIds,
        path,
      });

      toast("곡이 성공적으로 추가되었습니다.");

      // 폼 초기화
      setTitle("");
      setTeam("");
      setThumbnail("");
      setTagIds([]);
      setGenreIds([]);
      setPath("");
    } catch (error) {
      console.error("추가 중 오류 발생:", error);
      toast("곡 추가 중 오류가 발생했습니다.");
    }
  };

  // 곡 삭제
  const handleDeleteSong = async (songId: number) => {
    if (window.confirm("정말로 이 곡을 삭제하시겠습니까?")) {
      try {
        await deleteSongMutation.mutateAsync(songId);
        toast("곡이 성공적으로 삭제되었습니다.");
      } catch (error) {
        console.error("삭제 중 오류 발생:", error);
        toast("삭제 중 오류가 발생했습니다.");
      }
    }
  };

  return (
    <div className="bg-black h-full flex flex-col p-50 items-center mb-70">
      <AdminNavBar />
      <ToastContainer
        position="top-center"
        theme="dark"
        autoClose={3000}
        transition={Slide}
      />
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
        <select value={team} onChange={(e) => setTeam(e.target.value)}>
          {teams.map((team) => (
            <option value={team}>{team}</option>
          ))}
        </select>
        <input
          value={thumbnail}
          onChange={(e) => setThumbnail(e.target.value)}
          placeholder="썸네일 URL"
          required
        />
        <select
          multiple
          value={tagIds}
          onChange={(e) => {
            const selectedValue = e.target.value;
            if (tagIds.includes(selectedValue)) {
              setTagIds(tagIds.filter((id) => id !== selectedValue));
            } else {
              setTagIds([...tagIds, selectedValue]);
            }
          }}
        >
          {tags?.map((tag) => (
            <option value={tag.id} key={tag.id}>
              {tag.name}
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
        <thead>
          <tr>
            <th>ID</th>
            <th>제목</th>
            <th>팀</th>
            <th>태그</th>
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
              <td className="border-1  text-center">
                {song.tags?.map((t) => t.name).join(", ")}
              </td>
              <td className="border-1  text-center">
                {song.genres.map((g) => g.name).join(", ")}
              </td>
              <td className="border-1  text-center">{song.path}</td>
              <td className="border-1  text-center">
                <button
                  onClick={() => handleDeleteSong(song.id)}
                  disabled={deleteSongMutation.isPending}
                  className={`px-8 py-4 rounded-4 ${
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
