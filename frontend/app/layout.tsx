import type {Metadata} from "next";
import "./globals.css";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Mathflow",
  description: "理系のための公式・計算サイト"
};

//サイドバーに表示する分野リスト
const fields = [
  {id: "pysics", name:"力学・熱力学", icon:"⚙️"},
  {id: "electro", name:"電磁気学", icon:"⚡"},
  {id: "wave", name:"波動・光学", icon:"🌊"},
  {id: "chemistry", name:"化学・有機化学", icon:"🧪"},
  {id:"math", name:"数学", icon:"📐"}
]

export default function Rootlayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className= 'antialias bg-gray-950 text-white'>
        <div className="flex min-h-screen">
          <aside className="w-56 bg-gray-900 border-r border-gray-800 flex flex-col p-4 gap-1">
            <Link href="/" className="text-xl font-bold text-white mb-6 block">
              MathFlow
            </Link>
            {fields.map((field) => (
              <Link
                href={"/${field.id}"}
                key={field.id}
                className="flex items-center gap-2 px-3 py-2 rounded-lg text-gray-300 hover:bg-gray-800hover:text-white transition text-sm"
                >
                  <span>{field.icon}</span>
                  <span>{field.name}</span>
              </Link>
            ))}
            <div className="border-t border-gray-800 my-3" />

            <Link
              href="/proof"
              className="flex items-center gap-2 px-3 py-2 rounded-lg text-gray-300 hover;bg-gray-800 hover:text-white transition text-sm"
            >
              <span>📖</span>
              <span>証明</span>
            </Link>
            <Link
              href="/search"
              className="flex items-center gap-2 px-3 py-2 rounded-lg text-gray-300 hover:text-white trasition text-sm"
              >
                <span>🔍</span>
                <span>検索</span>
              </Link>
            </aside>
            <main className="flex-1 overflow-y-auto">
              {children}
            </main>
        </div>
      </body>
    </html>
  );
}