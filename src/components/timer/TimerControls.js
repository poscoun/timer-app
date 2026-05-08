export default function TimerControls({ isRunning, timeLeft, totalSec, onStart, onPause, onReset }) {
  const isDone = timeLeft === 0 && totalSec > 0;

  return (
    <div className="flex items-center gap-3">
      {/* 시작 / 일시정지 */}
      {!isDone && (
        <button
          type="button"
          onClick={isRunning ? onPause : onStart}
          disabled={totalSec === 0}
          className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white
            bg-indigo-500 hover:bg-indigo-600 active:scale-95
            disabled:opacity-40 disabled:cursor-not-allowed
            transition-all duration-150"
        >
          {isRunning ? (
            <>
              <PauseIcon />
              일시정지
            </>
          ) : (
            <>
              <PlayIcon />
              {timeLeft < totalSec ? '재개' : '시작'}
            </>
          )}
        </button>
      )}

      {/* 리셋 */}
      <button
        type="button"
        onClick={onReset}
        className="flex items-center gap-2 px-5 py-3 rounded-xl font-semibold
          bg-gray-200 hover:bg-gray-300 dark:bg-slate-700 dark:hover:bg-slate-600
          text-slate-700 dark:text-slate-200
          active:scale-95 transition-all duration-150"
      >
        <ResetIcon />
        초기화
      </button>
    </div>
  );
}

function PlayIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path fillRule="evenodd" d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z" clipRule="evenodd" />
    </svg>
  );
}

function PauseIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path fillRule="evenodd" d="M6.75 5.25a.75.75 0 01.75-.75H9a.75.75 0 01.75.75v13.5a.75.75 0 01-.75.75H7.5a.75.75 0 01-.75-.75V5.25zm7.5 0A.75.75 0 0115 4.5h1.5a.75.75 0 01.75.75v13.5a.75.75 0 01-.75.75H15a.75.75 0 01-.75-.75V5.25z" clipRule="evenodd" />
    </svg>
  );
}

function ResetIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-5 h-5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
    </svg>
  );
}
