"use client";

import Link from "next/link";
import { useMemo } from "react";
import Avatar from "@/components/Avatar/Avatar";
import AxisBar from "@/components/AxisBar";
import ShareButtons from "@/components/ShareButtons";
import { axisMap, axisOrder } from "@/data/axes";
import { typeProfiles } from "@/data/types";
import { decodePayload } from "@/lib/payload";
import { toPercents } from "@/lib/normalize";
import { calculateAxisScores } from "@/lib/scoring";
import { resolveTypeKey } from "@/lib/typeResolver";
import { formatPercent } from "@/lib/utils";
import { useSearchParams } from "next/navigation";

const profileNameMap = typeProfiles.reduce((acc, profile) => {
  acc[profile.key] = profile.name;
  return acc;
}, {} as Record<string, string>);

function useDecodedPayload() {
  const params = useSearchParams();
  const encoded = params.get("p");
  return useMemo(() => decodePayload(encoded), [encoded]);
}

export default function ResultClient() {
  const payload = useDecodedPayload();

  if (!payload) {
    return (
      <div className="mx-auto max-w-2xl rounded-3xl border border-rose-100 bg-rose-50 p-8 text-center shadow-sm">
        <h1 className="text-2xl font-bold text-rose-700">結果が読み込めませんでした</h1>
        <p className="mt-3 text-sm text-rose-700">
          URLが壊れているか、有効な診断データが見つかりませんでした。お手数ですが再度診断をお願いします。
        </p>
        <div className="mt-6">
          <Link
            href="/diagnose"
            className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-emerald-500 to-sky-500 px-5 py-2 text-sm font-semibold text-white shadow-md hover:shadow-lg"
          >
            診断ページへ
          </Link>
        </div>
      </div>
    );
  }

  const axisScores = calculateAxisScores(payload.answers);
  const axisPercents = toPercents(axisScores);
  const typeKey = resolveTypeKey(axisPercents);
  const profile =
    typeProfiles.find((item) => item.key === typeKey) ??
    typeProfiles[0];

  return (
    <div className="space-y-10">
      <header className="relative overflow-hidden rounded-3xl border border-emerald-100 bg-white p-8 shadow-xl ring-1 ring-emerald-50 sm:flex sm:items-center sm:justify-between">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-[-80px] top-[-60px] h-60 w-60 rounded-full bg-emerald-100/60 blur-3xl" />
          <div className="absolute right-[-60px] bottom-[-80px] h-64 w-64 rounded-full bg-sky-100/60 blur-3xl" />
        </div>
        <div className="relative space-y-3">
          <div className="flex flex-wrap gap-2">
            <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 ring-1 ring-emerald-100">
              診断結果
            </span>
            <span className="rounded-full bg-sky-50 px-3 py-1 text-xs font-semibold text-sky-700 ring-1 ring-sky-100">
              タイプ {typeKey}
            </span>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            {profile.name}
          </h1>
          <p className="max-w-2xl text-sm leading-relaxed text-gray-700 sm:text-base">
            {profile.tagline}
          </p>
          <div className="flex flex-wrap gap-2 text-xs">
            {axisOrder.map((axisId) => {
              const axis = axisMap[axisId];
              return (
                <span
                  key={axisId}
                  className="rounded-full bg-white/80 px-3 py-1 font-semibold text-gray-800 ring-1 ring-emerald-100/60"
                >
                  {axis.title}: {formatPercent(axisPercents[axisId])}
                </span>
              );
            })}
          </div>
        </div>
        <div className="relative mt-6 flex justify-center sm:mt-0">
          <div className="rounded-[26px] border border-emerald-100 bg-white/90 p-4 shadow-lg">
            <Avatar percents={axisPercents} typeKey={typeKey} size={220} />
          </div>
        </div>
      </header>

      <section className="grid gap-6 md:grid-cols-2">
        <div className="space-y-3 rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900">4軸スコア</h2>
          <div className="space-y-3">
            {axisOrder.map((axisId) => {
              const axis = axisMap[axisId];
              return (
                <AxisBar
                  key={axisId}
                  leftLabel={axis.leftLabel}
                  rightLabel={axis.rightLabel}
                  percent={axisPercents[axisId]}
                />
              );
            })}
          </div>
        </div>
        <div className="space-y-3 rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900">解説</h2>
          <p className="text-sm leading-relaxed text-gray-700">{profile.summary}</p>
        </div>
      </section>

      <section className="grid gap-6 md:grid-cols-2">
        <div className="space-y-3 rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
          <h3 className="text-lg font-bold text-gray-900">あるある</h3>
          <ul className="space-y-2 text-sm text-gray-700">
            {profile.aruaru.map((item) => (
              <li key={item} className="flex items-start gap-2">
                <span className="mt-1 h-1.5 w-1.5 rounded-full bg-emerald-500" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="space-y-3 rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
          <h3 className="text-lg font-bold text-gray-900">立ち回り</h3>
          <ul className="space-y-2 text-sm text-gray-700">
            {profile.moves.map((item) => (
              <li key={item} className="flex items-start gap-2">
                <span className="mt-1 h-1.5 w-1.5 rounded-full bg-sky-500" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="grid gap-6 md:grid-cols-2">
        <div className="space-y-3 rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
          <h3 className="text-lg font-bold text-gray-900">揉めやすいポイント</h3>
          <ul className="space-y-2 text-sm text-gray-700">
            {profile.conflicts.map((item) => (
              <li key={item} className="flex items-start gap-2">
                <span className="mt-1 h-1.5 w-1.5 rounded-full bg-rose-500" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="space-y-3 rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
          <h3 className="text-lg font-bold text-gray-900">相性</h3>
          <div className="space-y-2 text-sm">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-emerald-600">
                合うタイプ
              </p>
              <div className="mt-1 flex flex-wrap gap-2">
                {profile.compatibility.good.map((key) => (
                  <span
                    key={key}
                    className="rounded-full border border-emerald-100 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700"
                  >
                    {key} {profileNameMap[key] ?? ""}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-rose-600">
                しんどいタイプ
              </p>
              <div className="mt-1 flex flex-wrap gap-2">
                {profile.compatibility.tough.map((key) => (
                  <span
                    key={key}
                    className="rounded-full border border-rose-100 bg-rose-50 px-3 py-1 text-xs font-semibold text-rose-700"
                  >
                    {key} {profileNameMap[key] ?? ""}
                  </span>
                ))}
              </div>
            </div>
          </div>
          <div className="mt-2 rounded-2xl bg-gradient-to-r from-emerald-50 to-sky-50 p-4 text-sm text-gray-800">
            <p className="font-semibold text-emerald-700">ワンポイント</p>
            <p className="mt-1">{profile.onePoint}</p>
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-4 rounded-3xl border border-gray-100 bg-white p-6 shadow-sm md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-gray-500">
            CTA
          </p>
          <p className="text-lg font-bold text-gray-900">
            結果をシェアして、友だちのタイプも知ろう
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <ShareButtons title="恋愛倫理スタイル診断結果" />
          <Link
            href="/diagnose"
            className="inline-flex items-center justify-center rounded-full border border-gray-200 px-4 py-2 text-sm font-semibold text-gray-800 shadow-sm transition hover:border-gray-300 hover:bg-gray-50"
          >
            もう一度診断する
          </Link>
        </div>
      </section>
    </div>
  );
}
