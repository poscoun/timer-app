export function formatTime(seconds) {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  if (h > 0) {
    return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  }
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

const R = 110;
const CX = 130;
const CY = 130;
const CIRCUMFERENCE = 2 * Math.PI * R;

export default function TimerCircle({ timeLeft, totalSec, isRunning, categoryName }) {
  const progress = totalSec > 0 ? 1 - timeLeft / totalSec : 0;
  const strokeOffset = CIRCUMFERENCE * progress;

  const isWarning = totalSec > 0 && timeLeft / totalSec < 0.15 && timeLeft > 0;
  const isDone = timeLeft === 0 && totalSec > 0;

  const ringColor = isDone
    ? '#6b7280'
    : isWarning
    ? '#ef4444'
    : isRunning
    ? '#6366f1'
    : '#6366f1';

  return (
    <div className="flex flex-col items-center gap-3">
      <svg width="260" height="260" viewBox="0 0 260 260">
        {/* 배경 링 */}
        <circle
          cx={CX}
          cy={CY}
          r={R}
          fill="none"
          stroke="currentColor"
          strokeWidth="12"
          className="text-gray-200 dark:text-slate-700"
        />
        {/* 진행 링 */}
        <circle
          cx={CX}
          cy={CY}
          r={R}
          fill="none"
          stroke={ringColor}
          strokeWidth="12"
          strokeLinecap="round"
          strokeDasharray={CIRCUMFERENCE}
          strokeDashoffset={strokeOffset}
          transform={`rotate(-90 ${CX} ${CY})`}
          style={{ transition: isRunning ? 'stroke-dashoffset 0.9s linear' : 'none' }}
        />
        {/* 남은 시간 */}
        <text
          x={CX}
          y={CY - 8}
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize="36"
          fontWeight="700"
          fontFamily="monospace"
          className={
            isDone
              ? 'fill-gray-400 dark:fill-slate-500'
              : isWarning
              ? 'fill-red-500'
              : 'fill-slate-800 dark:fill-white'
          }
        >
          {formatTime(timeLeft)}
        </text>
        {/* 카테고리명 */}
        {categoryName && (
          <text
            x={CX}
            y={CY + 30}
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize="14"
            className="fill-slate-400 dark:fill-slate-500"
          >
            {categoryName}
          </text>
        )}
        {/* 완료 메시지 */}
        {isDone && (
          <text
            x={CX}
            y={CY + 50}
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize="13"
            className="fill-gray-400 dark:fill-slate-500"
          >
            완료!
          </text>
        )}
      </svg>
    </div>
  );
}
