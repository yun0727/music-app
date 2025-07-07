const teams = [
  "전체",
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

interface TagProps {
  selectedTeam: string;
  onTeamSelect: (team: string) => void;
}

export default function Tag({ selectedTeam, onTeamSelect }: TagProps) {
  return (
    <div className="flex w-[100%] pb-20 overflow-x-scroll gap-20 text-15 [&::-webkit-scrollbar]:hidden">
      {teams.map((team) => (
        <button
          //누르면 필터 기능 적용
          onClick={() => {
            onTeamSelect(team);
          }}
          className={`border-white border-1 w-100 h-40 flex-shrink-0 rounded-10 ${
            selectedTeam === team ? "bg-bg text-[#1A1A1A]" : ""
          }`}
        >
          {team}
        </button>
      ))}
    </div>
  );
}
