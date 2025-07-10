import useAddTag from "@/hooks/add/useAddTag";
import useGetTags from "@/hooks/get/useGetTags";
import AdminNavBar from "@/presentationals/common/AdminNavBar";
import React, { useState } from "react";
import { Slide, toast, ToastContainer } from "react-toastify";

export default function AdminTagPage() {
  const { data: tags } = useGetTags();

  const addTagMutation = useAddTag();

  const [name, setName] = useState("");
  console.log(tags);
  const handleAddTag = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addTagMutation.mutateAsync({
        name,
      });
      toast("tag가 추가되었습니다");
      setName("");
    } catch (error) {
      console.error("오류 발생 : ", error);
      toast("오류 발생");
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
      <h2 className="text-gray-400 text-50 mb-30">Tag 관리</h2>
      <form
        action=""
        onSubmit={handleAddTag}
        className="flex flex-col gap-30 text-black"
      >
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="tag 이름"
          required
        />
        <button className="text-white border-1 rounded-4" type="submit">
          tag 추가
        </button>
      </form>
      {/* tag 목록 */}
      <h3 className="mt-20 pb-20">tag 목록</h3>
      <table border={1} cellPadding={8} className="w-full border-1">
        <thead>
          <tr>
            <th>name</th>
            <th>song lists</th>
          </tr>
        </thead>
        <tbody>
          {tags?.map((tag) => (
            <tr key={tag.id}>
              <td className="border-1  text-center">{tag.name}</td>
              {/* <td className="border-1  text-center">{tag.songs.title}</td> */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
