'use client';

import { useEffect, useMemo, useState } from 'react';

const steps = [
  { label: 'Вдох', duration: 4 },
  { label: 'Задержка', duration: 4 },
  { label: 'Выдох', duration: 6 }
] as const;

export function BreathingPractice() {
  const [isRunning, setIsRunning] = useState(false);
  const [stepIndex, setStepIndex] = useState(0);
  const [remaining, setRemaining] = useState(steps[0].duration);

  useEffect(() => {
    if (!isRunning) return;

    const timer = setInterval(() => {
      setRemaining((prev) => {
        if (prev > 1) return prev - 1;

        setStepIndex((currentStep) => {
          const nextStep = (currentStep + 1) % steps.length;
          setRemaining(steps[nextStep].duration);
          return nextStep;
        });

        return 0;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isRunning]);

  const stage = steps[stepIndex];
  const scale = useMemo(() => {
    if (stage.label === 'Вдох') return 'scale-110';
    if (stage.label === 'Выдох') return 'scale-90';
    return 'scale-100';
  }, [stage.label]);

  const start = () => {
    setStepIndex(0);
    setRemaining(steps[0].duration);
    setIsRunning(true);
  };

  const stop = () => {
    setIsRunning(false);
  };

  const repeat = () => {
    setStepIndex(0);
    setRemaining(steps[0].duration);
  };

  return (
    <section className="card space-y-3">
      <h2 className="section-title">Дыхательная практика</h2>
      <div className="flex flex-col items-center gap-3 rounded-3xl bg-white/60 p-4">
        <div
          className={`flex h-28 w-28 items-center justify-center rounded-full bg-cyan-100 text-center text-sm font-medium text-slate-700 transition-transform duration-700 ${scale}`}
        >
          {stage.label}
        </div>
        <p className="text-sm text-slate-500">{remaining > 0 ? `${remaining} сек` : 'Переключение...'}</p>
      </div>
      <div className="grid grid-cols-3 gap-2 text-sm">
        <button type="button" onClick={start} className="rounded-xl bg-slate-600 px-3 py-2 text-white">
          Старт
        </button>
        <button type="button" onClick={stop} className="rounded-xl bg-slate-300 px-3 py-2 text-slate-700">
          Стоп
        </button>
        <button type="button" onClick={repeat} className="rounded-xl bg-slate-200 px-3 py-2 text-slate-700">
          Повтор
        </button>
      </div>
    </section>
  );
}
