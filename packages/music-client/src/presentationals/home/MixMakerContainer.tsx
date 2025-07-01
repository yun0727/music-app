import useMixMakers from "@/hooks/useGetMixMakers";
import MixMakerPanel from "@/presentationals/home/MixMakerPanel";
import { useAppStore } from "@/store";

export default function MixMakerContainer() {
  const { data } = useMixMakers();
  const { addToPlayList } = useAppStore();
  return data ? (
    <MixMakerPanel
      mixMakers={data}
      title="믹스메이커"
      onItemClick={addToPlayList}
    />
  ) : null;
}
