import { Question } from "@/data/questions";
import LikertScale from "./LikertScale";

type QuestionCardProps = {
  question: Question;
  index: number;
  total: number;
  value?: number;
  onChange: (value: number) => void;
};

export default function QuestionCard({
  question,
  index,
  total,
  value,
  onChange,
}: QuestionCardProps) {
  return (
    <div className="space-y-6 rounded-[26px] border border-white/60 bg-white/85 p-6 shadow-md ring-1 ring-emerald-50/60">
      <div className="flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-wide text-gray-600">
        <span className="rounded-full bg-emerald-50 px-3 py-1 text-emerald-700 ring-1 ring-emerald-100">
          Q{index + 1} / {total}
        </span>
      </div>
      <p className="text-2xl font-bold leading-relaxed text-gray-900">
        {question.text}
      </p>
      <LikertScale
        value={value}
        onChange={onChange}
      />
    </div>
  );
}
