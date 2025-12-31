"use client";

import { useState } from "react";

type ShareButtonsProps = {
  title: string;
  url?: string;
};

export default function ShareButtons({ title, url }: ShareButtonsProps) {
  const [status, setStatus] = useState<string | null>(null);
  const shareUrl = url ?? (typeof window !== "undefined" ? window.location.href : "");

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({ title, url: shareUrl });
        setStatus("シェアしました");
        return;
      }
    } catch (error) {
      console.error(error);
    }
    try {
      await navigator.clipboard.writeText(shareUrl);
      setStatus("リンクをコピーしました");
    } catch (error) {
      console.error(error);
      setStatus("コピーに失敗しました");
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <button
        type="button"
        onClick={handleShare}
        className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-emerald-500 to-sky-500 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-emerald-200 transition hover:shadow-xl"
      >
        シェア / コピー
      </button>
      {status && <p className="text-xs text-gray-600">{status}</p>}
    </div>
  );
}
