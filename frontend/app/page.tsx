// app/page.tsx

// Next.jsのLinkコンポーネント（ページ遷移に使う）
import Link from "next/link";

// 分野データの型定義（TypeScriptで型を決めておく）
// 型定義：変数にどんなデータが入るかを事前に決めるもの
type Field = {
  id: string;      // URLに使う英語名（例："physics"）
  name: string;    // 表示する日本語名（例："力学"）
  icon: string;    // 絵文字アイコン
  count: number;   // 公式の数
  color: string;
};

// 分野データの一覧
const fields: Field[] = [
  { id: "physics",       name: "力学・熱力学",   icon: "⚙️",  count: 0 , color: "from-blue-900 to-blue-800 border-blue-700"},
  { id: "electro",       name: "電磁気学",       icon: "⚡",  count: 0 , color: "from-yellow-900 to-yellow-800 border-yellow-700"},
  { id: "wave",          name: "波動・光学",     icon: "🌊",  count: 0 , color: "from-cyan-900 to-cyan-800 border-cyan-700"},
  { id: "chemistry",     name: "化学・有機化学", icon: "🧪",  count: 0 , color:"from-green-900 to-green-800 border-green-700"},
  { id: "math",          name: "数学",           icon: "📐",  count: 0 , color:"from-purple-900 to-purple-800 border-purple-700"},
];

// トップページのコンポーネント
// コンポーネント：画面のパーツをひとまとめにしたもの
export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col items-center p-8 py-16">
      
      {/* サイトタイトル */}
      <div className="text-center mb-16">
          <h1 className="text-5xl font-bold tracking-tight mb-3">
            MathFlow
          </h1>
          <p className="text-lg text-gray-400">
            理系のための公式・計算サイト
          </p>
      </div>  

      {/* 分野カードの一覧 */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
        {fields.map((field,index) => {
          const isLast = index === fields.length - 1;
          const isOdd =fields.length % 3!== 0;

          return(
            <Link
              href={`/${field.id}`}
              key={field.id}
              //最後のカードが余る場合は中央列に配置
              className={isLast && isOdd ? "col-start-2" : ""}
            >
              <div className={`
                bg-grandient-tobar ${field.color}
                border rounded-2xl p-6 text-center
                hover:scale-105 hover:brightness-110
                transition-all duration-200 cursor-pointer
              `}>
                <div className="text-5xl mb-4">{field.icon}</div>
                <div className="text-lg font-semibold">{field.name}</div>
                <div className="text-sm text-gray-400 mt-2">
                  公式{field.count}件
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </main>
  );
}