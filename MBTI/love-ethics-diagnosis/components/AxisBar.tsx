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
  return (
    <div className="space-y-2 rounded-2xl border border-gray-100 bg-white/80 p-4 shadow-sm">
      <div className="flex items-center justify-between text-sm text-gray-700">
        <span className="font-semibold text-emerald-700">{leftLabel}</span>
        <span className="text-gray-500">|</span>
        <span className="font-semibold text-sky-700">{rightLabel}</span>
      </div>
      <div className="relative h-3 w-full overflow-hidden rounded-full bg-gray-100">
        <div
          className="absolute inset-y-0 left-0 bg-gradient-to-r from-emerald-400 via-emerald-500 to-sky-500 transition-all"
          style={{ width: `${percent}%` }}
        />
        <div className="absolute inset-0 flex items-center justify-center text-[11px] font-semibold text-gray-800">
          {Math.round(percent)}%
        </div>
      </div>
    </div>
  );
}
