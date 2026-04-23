// app/layout.tsx

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MathFlow",
  description: "理系のための公式・計算サイト",
};

// サイドバーに表示する分野リスト
const fields = [
  { id: "physics",   name: "力学・熱力学",   icon: "⚙️" },
  { id: "electro",   name: "電磁気学",       icon: "⚡" },
  { id: "wave",      name: "波動・光学",     icon: "🌊" },
  { id: "chemistry", name: "化学・有機化学", icon: "🧪" },
  { id: "math",      name: "数学",           icon: "📐" },
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-950 text-white`}
      >
        {/* 全体のレイアウト：サイドバー＋メインコンテンツを横並びにする */}
        <div className="flex min-h-screen">

          {/* サイドバー */}
          <aside className="w-56 bg-gray-900 border-r border-gray-800 flex flex-col p-4 gap-1">
            
            {/* ロゴ */}
            <Link href="/" className="text-xl font-bold text-white mb-6 block">
              MathFlow
            </Link>

            {/* 分野リスト */}
            {fields.map((field) => (
              <Link
                href={`/${field.id}`}
                key={field.id}
                className="flex items-center gap-2 px-3 py-2 rounded-lg text-gray-300 hover:bg-gray-800 hover:text-white transition text-sm"
              >
                <span>{field.icon}</span>
                <span>{field.name}</span>
              </Link>
            ))}

            {/* 区切り線 */}
            <div className="border-t border-gray-800 my-3" />

            {/* 証明・検索リンク */}
            <Link
              href="/proof"
              className="flex items-center gap-2 px-3 py-2 rounded-lg text-gray-300 hover:bg-gray-800 hover:text-white transition text-sm"
            >
              <span>📖</span>
              <span>証明</span>
            </Link>
            <Link
              href="/search"
              className="flex items-center gap-2 px-3 py-2 rounded-lg text-gray-300 hover:bg-gray-800 hover:text-white transition text-sm"
            >
              <span>🔍</span>
              <span>検索</span>
            </Link>

          </aside>

          {/* メインコンテンツ：childrenは各ページの中身が入る */}
          <main className="flex-1 overflow-y-auto">
            {children}
          </main>

        </div>
      </body>
    </html>
  );
}