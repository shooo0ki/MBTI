import DiagnoseClient from "./DiagnoseClient";

export default function DiagnosePage() {
  return (
    <div className="relative min-h-screen bg-gradient-to-b from-[#f7fbff] via-white to-[#f6fff8]">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[-100px] top-[80px] h-72 w-72 rounded-full bg-emerald-100/50 blur-3xl" />
        <div className="absolute right-[-120px] top-[200px] h-80 w-80 rounded-full bg-sky-100/50 blur-3xl" />
      </div>
      <div className="relative mx-auto max-w-5xl px-4 py-12 sm:py-16">
        <div className="rounded-[28px] bg-white/85 p-8 shadow-xl ring-1 ring-emerald-100">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="space-y-3">
              <p className="text-xs font-semibold uppercase tracking-widest text-emerald-600">
                23問 / 所要時間 約5分
              </p>
              <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                恋愛倫理スタイル診断
              </h1>
              <p className="text-sm leading-relaxed text-gray-700">
                介入・一貫・抑制・明確の4軸で恋愛観を可視化し、16タイプで診断します。
                悩みすぎず直感で選んでください。
              </p>
            </div>
            <div className="flex flex-col gap-2 text-sm text-gray-700">
              <span className="flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 font-semibold text-emerald-700 ring-1 ring-emerald-100">
                ステップ 1/1 診断に回答
              </span>
              <span className="rounded-full bg-sky-50 px-3 py-1 text-sky-700 ring-1 ring-sky-100">
                結果はURLで自動保存・共有
              </span>
            </div>
          </div>
          <div className="mt-10">
            <DiagnoseClient />
          </div>
        </div>
      </div>
    </div>
  );
}
