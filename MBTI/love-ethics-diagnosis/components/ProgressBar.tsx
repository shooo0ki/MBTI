type ProgressBarProps = {
  percent: number;
  label?: string;
};

export default function ProgressBar({ percent, label }: ProgressBarProps) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-xs text-gray-600">
        <span className="font-semibold text-gray-700">{label ?? "進捗"}</span>
        <span className="font-bold text-emerald-700">{Math.round(percent)}%</span>
      </div>
      <div className="relative h-2.5 w-full overflow-hidden rounded-full bg-gray-100">
        <div
          className="absolute inset-y-0 left-0 bg-gradient-to-r from-emerald-400 via-emerald-500 to-sky-500 transition-all"
          style={{ width: `${Math.min(100, Math.max(0, percent))}%` }}
        />
        <div
          className="absolute top-1/2 h-3 w-3 -translate-y-1/2 rounded-full border-2 border-white bg-emerald-600 shadow"
          style={{ left: `${Math.min(100, Math.max(0, percent))}%` }}
        />
      </div>
    </div>
  );
}
