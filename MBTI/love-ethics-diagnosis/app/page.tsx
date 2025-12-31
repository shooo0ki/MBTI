import Link from "next/link";
import { encodePayload } from "@/lib/payload";

const samplePayload = encodePayload(Array(23).fill(3));

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-gradient-to-b from-[#f7fbff] via-white to-[#f6fff8]">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[-120px] top-[-80px] h-72 w-72 rounded-full bg-emerald-200/40 blur-3xl" />
        <div className="absolute right-[-90px] top-[120px] h-72 w-72 rounded-full bg-sky-200/40 blur-3xl" />
        <div className="absolute right-20 bottom-[-120px] h-80 w-80 rounded-full bg-emerald-100/50 blur-3xl" />
      </div>
      <div className="relative mx-auto flex max-w-6xl flex-col gap-12 px-4 pb-16 pt-14 sm:pt-20">
        <section className="grid gap-10 rounded-[32px] bg-white/80 p-8 shadow-xl ring-1 ring-emerald-100 sm:grid-cols-[1.1fr,0.9fr] sm:items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-3 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 ring-1 ring-emerald-100">
              23問・5分 / 4軸16タイプ
              <span className="rounded-full bg-white px-2 py-0.5 text-[11px] text-gray-600 ring-1 ring-gray-100">
                無料
              </span>
            </div>
            <div className="space-y-3">
              <h1 className="text-4xl font-bold leading-tight text-gray-900 sm:text-5xl">
                恋愛倫理スタイル診断
                <span className="block text-2xl text-emerald-600">あなたの「関わり方」の軸を可視化</span>
              </h1>
              <p className="text-base leading-relaxed text-gray-700">
                恋愛で大切にする価値観を「介入 / 放任」「一貫 / 正直」「抑制 / 忠実」「明確 / 可変」の4軸でスコア化。
                16タイプで強み・相性・立ち回りを提示します。直感で選んでください。
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/diagnose"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-emerald-500 to-sky-500 px-7 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-200 transition hover:translate-y-[-1px] hover:shadow-xl"
              >
                診断を始める
              </Link>
              <Link
                href={`/result?p=${samplePayload}`}
                className="inline-flex items-center justify-center rounded-full border border-gray-200 px-7 py-3 text-sm font-semibold text-gray-800 shadow-sm transition hover:border-emerald-200 hover:bg-emerald-50/60"
              >
                結果サンプルを見る
              </Link>
            </div>
            <div className="flex flex-wrap gap-4 text-xs text-gray-600">
              <span className="flex items-center gap-2 rounded-full bg-gray-50 px-3 py-1 ring-1 ring-gray-100">
                ⏱ 約5分
              </span>
              <span className="flex items-center gap-2 rounded-full bg-gray-50 px-3 py-1 ring-1 ring-gray-100">
                🧭 4軸スコア表示
              </span>
              <span className="flex items-center gap-2 rounded-full bg-gray-50 px-3 py-1 ring-1 ring-gray-100">
                🧩 16タイプ判定
              </span>
              <span className="flex items-center gap-2 rounded-full bg-gray-50 px-3 py-1 ring-1 ring-gray-100">
                🎨 合成アバター
              </span>
            </div>
          </div>
          <div className="relative">
            <div className="absolute inset-4 rounded-[40px] bg-gradient-to-br from-emerald-100/60 via-white to-sky-100/50 blur-3xl" />
            <div className="relative space-y-4 rounded-[28px] border border-emerald-100 bg-white/80 p-6 shadow-lg">
              <div className="flex items-center justify-between text-xs font-semibold text-gray-500">
                <span>4つの軸</span>
                <span className="rounded-full bg-emerald-50 px-3 py-1 text-emerald-700 ring-1 ring-emerald-100">
                  スコア 0〜100%
                </span>
              </div>
              <div className="space-y-3">
                {[
                  { title: "介入 / 放任", sub: "安心か自由か" },
                  { title: "一貫 / 正直", sub: "約束か本音か" },
                  { title: "抑制 / 忠実", sub: "理性か惹かれか" },
                  { title: "明確 / 可変", sub: "ルール固定か更新か" },
                ].map((item) => (
                  <div
                    key={item.title}
                    className="rounded-2xl border border-gray-100 bg-gradient-to-r from-emerald-50/80 to-sky-50/80 px-4 py-3 shadow-sm"
                  >
                    <p className="text-sm font-semibold text-gray-900">{item.title}</p>
                    <p className="text-xs text-gray-600">{item.sub}</p>
                  </div>
                ))}
              </div>
              <p className="text-xs text-gray-600">
                回答はURLにエンコードして再現可能。友だちと結果を比べるのも簡単です。
              </p>
            </div>
          </div>
        </section>

        <section className="grid gap-6 sm:grid-cols-3">
          {[
            {
              title: "4軸％と16タイプ",
              body: "各軸0〜100%を算出し、左右判定でIKCRなどのタイプキーを生成。",
            },
            {
              title: "4軸合成アバター",
              body: "base + 各軸SVGをopacityで合成。タイプごとにニュアンスを表現。",
            },
            {
              title: "結果URLで復元",
              body: "回答はURLパラメータに保存。戻っても同じ結果を確認できます。",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="rounded-3xl border border-gray-100 bg-white/90 p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <h3 className="text-lg font-bold text-gray-900">{item.title}</h3>
              <p className="mt-2 text-sm text-gray-700">{item.body}</p>
            </div>
          ))}
        </section>
      </div>
    </main>
  );
}
