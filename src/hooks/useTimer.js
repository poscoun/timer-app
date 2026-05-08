import { useState, useEffect, useRef } from 'react';

function playAlarm() {
  try {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    [0, 0.4, 0.8].forEach(offset => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.frequency.value = 880;
      osc.type = 'sine';
      gain.gain.setValueAtTime(0.5, ctx.currentTime + offset);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + offset + 0.3);
      osc.start(ctx.currentTime + offset);
      osc.stop(ctx.currentTime + offset + 0.3);
    });
  } catch (e) {}
}

export function useTimer(onComplete) {
  const [totalSec, setTotalSec] = useState(5 * 60);
  const [timeLeft, setTimeLeft] = useState(5 * 60);
  const [isRunning, setIsRunning] = useState(false);

  const totalSecRef = useRef(5 * 60);
  const onCompleteRef = useRef(onComplete);
  useEffect(() => { onCompleteRef.current = onComplete; });

  // 1초마다 감소
  useEffect(() => {
    if (!isRunning) return;
    const id = setInterval(() => {
      setTimeLeft(prev => Math.max(0, prev - 1));
    }, 1000);
    return () => clearInterval(id);
  }, [isRunning]);

  // 완료 감지
  useEffect(() => {
    if (timeLeft === 0 && isRunning) {
      setIsRunning(false);
      playAlarm();
      onCompleteRef.current?.(totalSecRef.current);
    }
  }, [timeLeft, isRunning]);

  function setDuration(sec) {
    totalSecRef.current = sec;
    setTotalSec(sec);
    setTimeLeft(sec);
    setIsRunning(false);
  }

  const start = () => timeLeft > 0 && setIsRunning(true);
  const pause = () => setIsRunning(false);
  const reset = () => {
    setIsRunning(false);
    setTimeLeft(totalSecRef.current);
  };

  const progress = totalSec > 0 ? 1 - timeLeft / totalSec : 0;

  return { timeLeft, totalSec, isRunning, progress, setDuration, start, pause, reset };
}
