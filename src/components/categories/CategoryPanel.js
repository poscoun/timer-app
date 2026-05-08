import { useState } from 'react';

function formatDuration(totalSeconds) {
  if (totalSeconds === 0) return '0초';
  const h = Math.floor(totalSeconds / 3600);
  const m = Math.floor((totalSeconds % 3600) / 60);
  const s = totalSeconds % 60;
  const parts = [];
  if (h > 0) parts.push(`${h}시간`);
  if (m > 0) parts.push(`${m}분`);
  if (s > 0) parts.push(`${s}초`);
  return parts.join(' ');
}

export default function CategoryPanel({ categories, onAdd, onDelete, onReset }) {
  const [newName, setNewName] = useState('');

  function handleAdd(e) {
    e.preventDefault();
    if (!newName.trim()) return;
    onAdd(newName);
    setNewName('');
  }

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-gray-200 dark:border-slate-700 p-6 h-full">
      <h2 className="text-base font-bold text-slate-800 dark:text-white mb-4">
        카테고리별 누적 시간
      </h2>

      {/* 카테고리 목록 */}
      <div className="flex flex-col gap-2 mb-6">
        {categories.length === 0 && (
          <p className="text-sm text-gray-400 dark:text-slate-500 text-center py-4">
            카테고리를 추가해주세요
          </p>
        )}
        {categories.map(cat => (
          <div
            key={cat.id}
            className="flex items-center justify-between gap-2 px-4 py-3 rounded-xl
              bg-gray-50 dark:bg-slate-700/50
              border border-gray-100 dark:border-slate-600/50"
          >
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-slate-800 dark:text-white truncate">{cat.name}</p>
              <p className="text-sm text-indigo-500 dark:text-indigo-400 font-mono">
                {formatDuration(cat.totalSeconds)}
              </p>
            </div>
            <div className="flex items-center gap-1 shrink-0">
              {cat.totalSeconds > 0 && (
                <button
                  type="button"
                  onClick={() => onReset(cat.id)}
                  title="누적 시간 초기화"
                  className="p-1.5 rounded-lg text-gray-400 hover:text-amber-500 hover:bg-amber-50
                    dark:hover:bg-amber-900/30 transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
                  </svg>
                </button>
              )}
              <button
                type="button"
                onClick={() => onDelete(cat.id)}
                title="카테고리 삭제"
                className="p-1.5 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50
                  dark:hover:bg-red-900/30 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* 카테고리 추가 폼 */}
      <form onSubmit={handleAdd} className="flex gap-2">
        <input
          type="text"
          value={newName}
          onChange={e => setNewName(e.target.value)}
          placeholder="새 카테고리 이름"
          maxLength={20}
          className="flex-1 bg-gray-100 dark:bg-slate-700 text-slate-800 dark:text-white
            border border-gray-200 dark:border-slate-600 rounded-lg px-3 py-2 text-sm
            placeholder-gray-400 dark:placeholder-slate-500
            focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />
        <button
          type="submit"
          disabled={!newName.trim()}
          className="px-4 py-2 rounded-lg bg-indigo-500 hover:bg-indigo-600 text-white text-sm font-semibold
            disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        >
          추가
        </button>
      </form>
    </div>
  );
}
