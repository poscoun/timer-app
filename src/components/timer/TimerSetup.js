import { useState, useEffect } from 'react';

export default function TimerSetup({ totalSec, isRunning, categories, selectedCategoryId, onDurationChange, onCategoryChange }) {
  const [minutes, setMinutes] = useState(Math.floor(totalSec / 60));
  const [seconds, setSeconds] = useState(totalSec % 60);

  useEffect(() => {
    setMinutes(Math.floor(totalSec / 60));
    setSeconds(totalSec % 60);
  }, [totalSec]);

  function handleMinutesChange(e) {
    const val = Math.max(0, Math.min(99, Number(e.target.value) || 0));
    setMinutes(val);
    onDurationChange(val * 60 + seconds);
  }

  function handleSecondsChange(e) {
    const val = Math.max(0, Math.min(59, Number(e.target.value) || 0));
    setSeconds(val);
    onDurationChange(minutes * 60 + val);
  }

  const inputClass = `
    w-16 text-center text-xl font-bold
    bg-gray-100 dark:bg-slate-700
    text-slate-800 dark:text-white
    border border-gray-300 dark:border-slate-600
    rounded-lg px-2 py-2
    focus:outline-none focus:ring-2 focus:ring-indigo-400
    disabled:opacity-50 disabled:cursor-not-allowed
  `;

  return (
    <div className="flex flex-col items-center gap-4">
      {/* 시간 입력 */}
      <div className="flex items-center gap-2">
        <div className="flex flex-col items-center gap-1">
          <input
            type="number"
            value={minutes}
            onChange={handleMinutesChange}
            disabled={isRunning}
            min="0"
            max="99"
            className={inputClass}
          />
          <span className="text-xs text-gray-400 dark:text-slate-500">분</span>
        </div>
        <span className="text-2xl font-bold text-slate-400 dark:text-slate-500 mb-4">:</span>
        <div className="flex flex-col items-center gap-1">
          <input
            type="number"
            value={String(seconds).padStart(2, '0')}
            onChange={handleSecondsChange}
            disabled={isRunning}
            min="0"
            max="59"
            className={inputClass}
          />
          <span className="text-xs text-gray-400 dark:text-slate-500">초</span>
        </div>
      </div>

      {/* 카테고리 선택 */}
      {categories.length > 0 && (
        <div className="w-full max-w-xs">
          <label className="block text-sm text-gray-500 dark:text-slate-400 mb-1 text-center">
            카테고리
          </label>
          <div className="relative">
            <select
              value={selectedCategoryId}
              onChange={e => onCategoryChange(e.target.value)}
              disabled={isRunning}
              className="w-full appearance-none bg-gray-100 dark:bg-slate-700 text-slate-800 dark:text-white
                border border-gray-300 dark:border-slate-600 rounded-lg pl-3 pr-8 py-2
                focus:outline-none focus:ring-2 focus:ring-indigo-400
                disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {categories.map(c => (
                <option key={c.id} value={c.id}
                  className="bg-white dark:bg-slate-700 text-slate-800 dark:text-white">
                  {c.name}
                </option>
              ))}
            </select>
            {/* 커스텀 화살표 — 다크모드에서 네이티브 화살표가 안 보이는 문제 해결 */}
            <div className="pointer-events-none absolute inset-y-0 right-2 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
                className="w-4 h-4 text-gray-400 dark:text-slate-400">
                <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
