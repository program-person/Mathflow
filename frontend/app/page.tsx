"use client";
import React, { useState } from 'react';
import styles from "./page.module.css";
interface CalculationResult {
  type: string;
  variable?: string;
  solutions?: string[];
  result?: string;
  expression?: string;
}

export default function APP() {
  const [formula, setFormula] = useState('');
  const [result, setResult] = useState<CalculationResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [err, setError] = useState('');

  const handleCalculate = async () => {
    if (!formula) return;
    setLoading(true);
    setError('');
    setResult(null);

    try {
      const response = await fetch("http://localhost:8000/solve", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ formula }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || "計算に失敗しました");
      }
      const data = await response.json();
      setResult(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    // 全体を1つのdivで囲む
    <div className={styles.main}>
      <div className={styles.sub}>
        
        {/* 入力セクション */}
        <div className={styles.input}>
          <label htmlFor="formula" className={styles.input_label}>
            数式を入力してください(例: 2x + 3 = 7)
          </label>
          <div className="flex gap-2">
            <input
              id="formula"
              type="text"
              value={formula}
              onChange={(e) => setFormula(e.target.value)}
              placeholder="x^2 - 4"
              className={styles.input_section}
              onKeyDown={(e) => e.key === "Enter" && handleCalculate()}
            />
            <button
              onClick={handleCalculate}
              disabled={loading}
              className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-300 text-white font-bold rounded-xl transition-all shadow-lg active:scale-95"
            >
              {loading ? "計算中..." : "計算"}
            </button>
          </div>
        </div>

        {/* エラー表示 */}
        {err && (
          <div className="bg-red-50 text-red-600 p-4 rounded-xl border border-red-100 animate-pulse">
            {err}
          </div>
        )}

        {/* 結果表示 */}
        {result && (
          <div className="bg-white rounded-2xl shadow-xl p-8 border-t-4 border-indigo-500">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
              計算結果
            </h2>

            <div className="space-y-6">
              {result.type === "equation" ? (
                <>
                  <div className="p-4 bg-slate-50 rounded-lg">
                    <p className="text-sm text-slate-500 mb-1">対象の変数:</p>
                    <p className="text-2xl font-mono font-bold text-slate-700">{result.variable}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-500 mb-3">解(Solution):</p>
                    <div className="flex flex-wrap gap-3">
                      {result.solutions?.map((sol, i) => (
                        <div key={i} className="px-6 py-4 bg-indigo-50 rounded-2xl border border-indigo-100">
                          <span className="text-indigo-400 mr-2">{result.variable} = </span>
                          <span className="text-2xl font-mono font-black text-indigo-700">{sol}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              ) : (
                <div className="p-4 bg-slate-50 rounded-lg">
                  <p className="text-sm text-slate-500 mb-1">計算値:</p>
                  <p className="text-3xl font-mono font-bold text-slate-700">{result.result}</p>
                </div>
              )}
              
              <div className="pt-6 border-t border-slate-100">
                <p className="text-xs text-slate-400 italic">
                  *Sympyエンジンでの演算: {result.expression}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}