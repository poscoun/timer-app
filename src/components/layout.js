import DarkModeToggle from './DarkModeToggle';

export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900 transition-colors">
      <header className="sticky top-0 z-10 bg-white dark:bg-slate-800 border-b border-gray-200 dark:border-slate-700 shadow-sm">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl">⏱</span>
            <h1 className="text-lg font-bold text-slate-800 dark:text-white tracking-tight">
              시간 누적 타이머
            </h1>
          </div>
          <DarkModeToggle />
        </div>
      </header>
      <main className="max-w-5xl mx-auto px-4 py-8">
        {children}
      </main>
    </div>
  );
}
