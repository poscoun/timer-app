import { useState, useCallback } from 'react';
import Head from 'next/head';
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
      <Head>
        <title>시간 누적 타이머 | 카테고리별 시간 관리 앱</title>
        <meta name="description" content="카테고리별로 시간을 누적 측정하는 타이머 앱. 공부, 운동, 업무 등 활동별 시간을 효율적으로 관리하세요." />
        <meta name="keywords" content="타이머, 시간 관리, 공부 타이머, 누적 타이머, 카테고리 타이머" />
        <link rel="canonical" href="https://timer-app-nine-lime.vercel.app/" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://timer-app-nine-lime.vercel.app/" />
        <meta property="og:title" content="시간 누적 타이머 | 카테고리별 시간 관리 앱" />
        <meta property="og:description" content="카테고리별로 시간을 누적 측정하는 타이머 앱. 공부, 운동, 업무 등 활동별 시간을 효율적으로 관리하세요." />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="시간 누적 타이머" />
        <meta name="twitter:description" content="카테고리별로 시간을 누적 측정하는 타이머 앱." />
      </Head>
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
