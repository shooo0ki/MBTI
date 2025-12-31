import type { Metadata } from "next";
import "../styles/globals.css";

export const metadata: Metadata = {
  title: "恋愛倫理スタイル診断（16タイプ）",
  description:
    "23問の5段階診断で恋愛における価値観を4軸スコアと16タイプで表示する無料診断です。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className="antialiased bg-white text-gray-900">{children}</body>
    </html>
  );
}
