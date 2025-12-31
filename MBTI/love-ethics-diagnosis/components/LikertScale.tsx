type LikertScaleProps = {
  value?: number;
  onChange: (value: number) => void;
};

const options = [
  { value: 7, label: "とてもそう思う" },
  { value: 6, label: "そう思う" },
  { value: 5, label: "ややそう思う" },
  { value: 4, label: "どちらとも言えない" },
  { value: 3, label: "ややそう思わない" },
  { value: 2, label: "あまりそう思わない" },
  { value: 1, label: "まったくそう思わない" },
];

export default function LikertScale({ value, onChange }: LikertScaleProps) {
  const sizes = [40, 34, 28, 24, 28, 34, 40]; // 端が大きく中央が小さい
  const leftColor = "#10b981";
  const rightColor = "#8b5cf6";

  return (
    <div className="flex items-center justify-center gap-4 sm:gap-6">
      <span className="text-sm font-semibold text-emerald-600">そう思う</span>
      <div className="flex items-center gap-3 sm:gap-4">
        {options.map((option, idx) => {
          const selected = value === option.value;
          const size = sizes[idx] ?? 30;
          const isLeft = option.value >= 4;
          const ringColor = isLeft ? leftColor : rightColor;
          return (
            <button
              key={option.value}
              type="button"
              aria-label={`${option.value}: ${option.label}`}
              aria-pressed={selected}
              onClick={() => onChange(option.value)}
              className={`relative inline-flex items-center justify-center rounded-full transition focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                selected ? "shadow-[0_6px_20px_rgba(0,0,0,0.08)]" : "hover:scale-105"
              }`}
              style={{
                width: size,
                height: size,
                border: `2px solid ${ringColor}`,
                background: selected ? ringColor : "transparent",
                opacity: selected ? 1 : 0.5,
              }}
            >
              {selected && (
                <svg
                  viewBox="0 0 20 20"
                  className="h-4 w-4 text-white"
                  aria-hidden
                >
                  <path
                    d="M6 10.5 8.5 13l5-6"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </button>
          );
        })}
      </div>
      <span className="text-sm font-semibold text-purple-600">そう思わない</span>
    </div>
  );
}
