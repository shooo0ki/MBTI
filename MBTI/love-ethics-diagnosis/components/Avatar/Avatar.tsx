import Image from "next/image";
import { axisOrder } from "@/data/axes";
import { AxisPercentMap } from "@/lib/normalize";
import { avatarConfig } from "./avatar.config";

type AvatarProps = {
  percents: AxisPercentMap;
  typeKey?: string;
  size?: number;
};

function opacityFromPercent(percent: number): number {
  const diff = Math.abs(percent - 50);
  if (diff <= 5) return 0.25;
  if (diff <= 20) return 0.5;
  if (diff <= 35) return 0.75;
  return 1;
}

export default function Avatar({ percents, typeKey, size = 260 }: AvatarProps) {
  const layers = axisOrder.map((axisId) => {
    const side = percents[axisId] >= 50 ? "left" : "right";
    return {
      axisId,
      src: avatarConfig.layers[axisId][side],
      opacity: opacityFromPercent(percents[axisId]),
    };
  });

  return (
    <div
      className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-50 via-white to-sky-50 shadow-inner"
      style={{ width: size, height: size }}
    >
      <Image
        src={typeKey && avatarConfig.baseByType[typeKey] ? avatarConfig.baseByType[typeKey] : avatarConfig.base}
        alt="avatar base"
        fill
        priority
        sizes={`${size}px`}
        className="object-contain"
      />
      {layers.map((layer) => (
        <Image
          key={layer.axisId}
          src={layer.src}
          alt={`axis-${layer.axisId}`}
          fill
          sizes={`${size}px`}
          className="object-contain"
          style={{ opacity: layer.opacity }}
        />
      ))}
    </div>
  );
}
