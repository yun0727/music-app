import useAddMixMaker from "@/hooks/add/useAddMixMaker";
import useDeleteMixMaker from "@/hooks/delete/useDeleteMixMaker";
import useGetMixMakers from "@/hooks/get/useGetMixMakers";

import useGetSongs from "@/hooks/get/useGetSongs";
import AdminNavBar from "@/presentationals/common/AdminNavBar";
import React, { useState } from "react";
import { Slide, toast, ToastContainer } from "react-toastify";

export default function AdminMixMakerPage() {
  const { data: songs } = useGetSongs();
  const { data: mixMakers } = useGetMixMakers();

  const addMixMakerMutation = useAddMixMaker();
  const deleteMixMakerMutation = useDeleteMixMaker();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [songIds, setSongIds] = useState<string[]>([]);

  const handleAddMixMaker = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addMixMakerMutation.mutateAsync({
        description,
        name,
        songIds,
      });
      toast("mix maker가 추가되었습니다");
      setName("");
      setDescription("");
      setSongIds([]);
    } catch (error) {
      console.error("추가 중 오류 발생: ", error);
      toast("오류 발생");
    }
  };
  const handleDeleteMixMaker = async (mixMakerId: string) => {
    if (window.confirm("정말로 이 믹스메이커를 삭제하시겠습니까?")) {
      try {
        await deleteMixMakerMutation.mutateAsync(mixMakerId);
        toast("믹스메이커가 성공적으로 삭제되었습니다.");
      } catch (error) {
        console.error("삭제 중 오류 발생:", error);
        toast("삭제 중 오류가 발생했습니다.");
      }
    }
  };
  return (
    <div className="bg-black h-full flex flex-col p-50 items-center mb-70">
      <ToastContainer
        position="top-center"
        theme="dark"
        autoClose={3000}
        transition={Slide}
      />
      <AdminNavBar />
      <h2 className="text-gray-400 text-50 mb-30">mix Maker 관리</h2>
      <form
        action=""
        onSubmit={handleAddMixMaker}
        className="flex flex-col gap-30 text-black"
      >
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="mix maker 이름"
          required
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="설명"
          required
        />
        <select
          multiple
          value={songIds}
          onChange={(e) => {
            const selectedValue = e.target.value;
            if (songIds.includes(selectedValue)) {
              setSongIds(songIds.filter((id) => id !== selectedValue));
            } else {
              setSongIds([...songIds, selectedValue]);
            }
          }}
        >
          {songs?.map((song) => (
            <option key={song.id} value={song.id}>
              {song.team} - {song.title}
            </option>
          ))}
        </select>
        <button className="text-white border-1 rounded-4" type="submit">
          mix maker 추가
        </button>
      </form>

      {/* mix maker 목록 */}
      <h3 className="mt-20 pb-20">mix maker 목록 </h3>
      <table border={1} cellPadding={8} className="w-full border-1">
        <thead>
          <tr>
            <th>name</th>
            <th>description</th>
            <th>songsId</th>
            <th>setting</th>
          </tr>
        </thead>
        <tbody>
          {mixMakers?.map((mixMaker) => (
            <tr key={mixMaker.id}>
              <td className="border-1  text-center">{mixMaker.name}</td>
              <td className="border-1  text-center">{mixMaker.description}</td>
              <td className="border-1  text-center">
                {mixMaker.songs.map((m) => m.title).join(", ")}
              </td>
              <td className="border-1  text-center">
                <button
                  onClick={() => handleDeleteMixMaker(mixMaker.id)}
                  disabled={deleteMixMakerMutation.isPending}
                  className={` px-8 py-4 rounded-4 ${
                    deleteMixMakerMutation.isPending
                      ? "bg-[#666] cursor-not-allowed"
                      : "bg-[#dc2626] cursor-pointer"
                  }`}
                >
                  삭제
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
