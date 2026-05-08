import { useState, useEffect } from 'react';

const STORAGE_KEY = 'timer-app-categories';

const DEFAULT_CATEGORIES = [
  { id: '1', name: '공부', totalSeconds: 0 },
  { id: '2', name: '운동', totalSeconds: 0 },
  { id: '3', name: '업무', totalSeconds: 0 },
];

export function useCategories() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    setCategories(saved ? JSON.parse(saved) : DEFAULT_CATEGORIES);
  }, []);

  useEffect(() => {
    if (categories.length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(categories));
    }
  }, [categories]);

  function addCategory(name) {
    const trimmed = name.trim();
    if (!trimmed) return;
    setCategories(prev => [
      ...prev,
      { id: Date.now().toString(), name: trimmed, totalSeconds: 0 },
    ]);
  }

  function deleteCategory(id) {
    setCategories(prev => prev.filter(c => c.id !== id));
  }

  function addTime(categoryId, seconds) {
    setCategories(prev =>
      prev.map(c =>
        c.id === categoryId ? { ...c, totalSeconds: c.totalSeconds + seconds } : c
      )
    );
  }

  function resetCategory(id) {
    setCategories(prev =>
      prev.map(c => (c.id === id ? { ...c, totalSeconds: 0 } : c))
    );
  }

  return { categories, addCategory, deleteCategory, addTime, resetCategory };
}
