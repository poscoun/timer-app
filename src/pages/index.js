import { useState, useCallback } from 'react';
import Layout from '@/components/layout';
import TimerCircle from '@/components/timer/TimerCircle';
import TimerSetup from '@/components/timer/TimerSetup';
import TimerControls from '@/components/timer/TimerControls';
import CategoryPanel from '@/components/categories/CategoryPanel';
import { useTimer } from '@/hooks/useTimer';
import { useCategories } from '@/hooks/useCategories';

export default function Home() {
  const { categories, addCategory, deleteCategory, addTime, resetCategory } = useCategories();
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);

  const selectedCategory = categories.find(c => c.id === (selectedCategoryId ?? categories[0]?.id));
  const activeCategoryId = selectedCategoryId ?? categories[0]?.id;

  const handleComplete = useCallback((seconds) => {
    if (activeCategoryId) {
      addTime(activeCategoryId, seconds);
    }
  }, [activeCategoryId, addTime]);

  const { timeLeft, totalSec, isRunning, progress, setDuration, start, pause, reset } = useTimer(handleComplete);

  function handleCategoryChange(id) {
    setSelectedCategoryId(id);
    // 카테고리 변경 시 타이머 초기화
    reset();
  }

  return (
    <Layout>
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">

        {/* 타이머 섹션 */}
        <div className="lg:col-span-3 bg-white dark:bg-slate-800 rounded-2xl shadow-sm
          border border-gray-200 dark:border-slate-700 p-6 flex flex-col items-center gap-6">

          <TimerCircle
            timeLeft={timeLeft}
            totalSec={totalSec}
            isRunning={isRunning}
            categoryName={selectedCategory?.name}
          />

          <TimerSetup
            totalSec={totalSec}
            isRunning={isRunning}
            categories={categories}
            selectedCategoryId={activeCategoryId}
            onDurationChange={setDuration}
            onCategoryChange={handleCategoryChange}
          />

          <TimerControls
            isRunning={isRunning}
            timeLeft={timeLeft}
            totalSec={totalSec}
            onStart={start}
            onPause={pause}
            onReset={reset}
          />
        </div>

        {/* 카테고리 섹션 */}
        <div className="lg:col-span-2">
          <CategoryPanel
            categories={categories}
            onAdd={addCategory}
            onDelete={deleteCategory}
            onReset={resetCategory}
          />
        </div>

      </div>
    </Layout>
  );
}
