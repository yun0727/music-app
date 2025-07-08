import { useNavigate } from "react-router-dom";

export default function AdminNavBar() {
  const navigate = useNavigate();

  return (
    <div className=" w-full h-[30px] flex gap-20">
      <button onClick={() => navigate("/")}>Home</button>
      <button onClick={() => navigate("/admin-song")}>Song</button>
      <button onClick={() => navigate("/admin-mix-maker")}>Mix Maker</button>
    </div>
  );
}
