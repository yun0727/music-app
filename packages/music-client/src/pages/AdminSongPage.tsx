import React, { useEffect, useState } from "react";
import { graphqlClient } from "../graphqlClient";

interface Song {
  id: string;
  title: string;
  team: string;
  path: string;
  album: { id: string; title: string };
  genres: { id: string; name: string }[];
}

const AdminSongPage: React.FC = () => {
  const [songs, setSongs] = useState<Song[]>([]);
  const [title, setTitle] = useState("");
  const [team, setTeam] = useState("");
  const [albumId, setAlbumId] = useState("");
  const [genreIds, setGenreIds] = useState<string[]>([]);
  const [path, setPath] = useState("");
  const [albums, setAlbums] = useState<{ id: string; title: string }[]>([]);
  const [genres, setGenres] = useState<{ id: string; name: string }[]>([]);
  const [loading, setLoading] = useState(false);

  // 곡 목록 불러오기
  const fetchSongs = async () => {
    setLoading(true);
    const query = `
      query {
        songs {
          id
          title
          team
          path
          album { id title }
          genres { id name }
        }
      }
    `;
    const res = (await graphqlClient.request(query)) as { songs: Song[] };
    setSongs(res.songs);
    setLoading(false);
  };

  // 앨범/장르 목록 불러오기
  const fetchAlbumsAndGenres = async () => {
    const query = `
      query {
        albums { id title }
        genres { id name }
      }
    `;
    const res = (await graphqlClient.request(query)) as {
      albums: { id: string; title: string }[];
      genres: { id: string; name: string }[];
    };
    setAlbums(res.albums);
    setGenres(res.genres);
  };

  useEffect(() => {
    fetchSongs();
    fetchAlbumsAndGenres();
  }, []);

  // 곡 추가
  const handleAddSong = async (e: React.FormEvent) => {
    e.preventDefault();
    const mutation = `
      mutation AddSong($title: String!, $team: String!, $albumId: String!, $genreIds: [String!]!, $path: String!) {
        addSong(title: $title, team: $team, albumId: $albumId, genreIds: $genreIds, path: $path) {
          id
        }
      }
    `;
    await graphqlClient.request(mutation, {
      title,
      team,
      albumId,
      genreIds,
      path,
    });
    setTitle("");
    setTeam("");
    setAlbumId("");
    setGenreIds([]);
    setPath("");
    fetchSongs();
  };

  // 곡 삭제
  const handleDeleteSong = async () => {
    // 실제 삭제 뮤테이션이 서버에 없다면, 구현 필요
    alert("삭제 기능은 서버에 구현되어 있지 않습니다.");
  };

  return (
    <div style={{ maxWidth: 800, margin: "40px auto", padding: 24 }}>
      <h2 style={{ fontSize: 28, fontWeight: 700, marginBottom: 24 }}>
        곡 관리(Admin)
      </h2>
      <form
        onSubmit={handleAddSong}
        style={{
          marginBottom: 32,
          display: "flex",
          flexDirection: "column",
          gap: 8,
        }}
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
          placeholder="팀/가수"
          required
        />
        <select
          value={albumId}
          onChange={(e) => setAlbumId(e.target.value)}
          required
        >
          <option value="">앨범 선택</option>
          {albums.map((a) => (
            <option key={a.id} value={a.id}>
              {a.title}
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
          {genres.map((g) => (
            <option key={g.id} value={g.id}>
              {g.name}
            </option>
          ))}
        </select>
        <input
          value={path}
          onChange={(e) => setPath(e.target.value)}
          placeholder="오디오 파일 경로"
          required
        />
        <button type="submit">곡 추가</button>
      </form>
      <h3>곡 목록</h3>
      {loading ? (
        <div>로딩 중...</div>
      ) : (
        <table
          border={1}
          cellPadding={8}
          style={{ width: "100%", borderCollapse: "collapse" }}
        >
          <thead>
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
            {songs.map((song) => (
              <tr key={song.id}>
                <td>{song.id}</td>
                <td>{song.title}</td>
                <td>{song.team}</td>
                <td>{song.album?.title}</td>
                <td>{song.genres.map((g) => g.name).join(", ")}</td>
                <td>{song.path}</td>
                <td>
                  <button onClick={() => handleDeleteSong()}>삭제</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminSongPage;
