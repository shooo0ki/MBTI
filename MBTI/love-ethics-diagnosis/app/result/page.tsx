import { Suspense } from "react";
import ResultClient from "./ResultClient";

export default function ResultPage() {
  return (
    <div className="relative min-h-screen bg-gradient-to-b from-[#f7fbff] via-white to-[#f6fff8]">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[-120px] top-[140px] h-72 w-72 rounded-full bg-emerald-100/50 blur-3xl" />
        <div className="absolute right-[-100px] top-[80px] h-80 w-80 rounded-full bg-sky-100/50 blur-3xl" />
      </div>
      <div className="relative mx-auto max-w-5xl px-4 py-12 sm:py-16">
        <Suspense
          fallback={
            <div className="rounded-3xl border border-gray-100 bg-white p-8 text-center shadow-sm">
              <p className="text-sm font-semibold text-gray-700">結果を読み込み中...</p>
            </div>
          }
        >
          <ResultClient />
        </Suspense>
      </div>
    </div>
  );
}
