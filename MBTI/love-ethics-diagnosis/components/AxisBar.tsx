type AxisBarProps = {
  leftLabel: string;
  rightLabel: string;
  percent: number;
};

export default function AxisBar({
  leftLabel,
  rightLabel,
  percent,
}: AxisBarProps) {
  const clamped = Math.min(100, Math.max(0, percent));
  // percentは左側が100, 右側が0 の向きなので、見た目は逆方向に配置する
  const markerLeft = `${100 - clamped}%`;

  return (
    <div className="space-y-2 rounded-2xl border border-gray-100 bg-white/80 p-4 shadow-sm">
      <div className="flex items-center justify-between text-sm text-gray-700">
        <span className="font-semibold text-emerald-700">{leftLabel}</span>
        <span className="text-gray-500">|</span>
        <span className="font-semibold text-sky-700">{rightLabel}</span>
      </div>
      <div className="relative h-3 w-full overflow-hidden rounded-full bg-gray-100">
        {/* 背景グラデ */}
        <div
          className="absolute inset-y-0 left-0 bg-gradient-to-r from-emerald-400 via-emerald-500 to-sky-500"
          style={{ width: "100%" }}
        />
        {/* マーカーライン */}
        <div
          className="absolute top-0 h-full w-px bg-white/80"
          style={{ left: markerLeft }}
        />
        {/* マーカー丸 */}
        <div
          className="absolute top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white bg-white/90 shadow"
          style={{ left: markerLeft }}
        />
        {/* 値表示 */}
        <div className="absolute inset-0 flex items-center justify-center text-[11px] font-semibold text-gray-800">
          {Math.round(clamped)}%
        </div>
      </div>
    </div>
  );
}
