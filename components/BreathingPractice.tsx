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
      setRemaining((previous) => {
        if (previous > 1) return previous - 1;

        const nextStep = (stepIndex + 1) % steps.length;
        setStepIndex(nextStep);
        return steps[nextStep].duration;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isRunning, stepIndex]);

  const stage = steps[stepIndex];
  const phaseClass = useMemo(() => {
    if (stage.label === 'Вдох') return 'scale-105 shadow-[0_0_0_16px_rgba(163,204,224,0.15)]';
    if (stage.label === 'Выдох') return 'scale-90 shadow-[0_0_0_10px_rgba(163,204,224,0.12)]';
    return 'scale-100 shadow-[0_0_0_14px_rgba(163,204,224,0.14)]';
  }, [stage.label]);

  const start = () => {
    setStepIndex(0);
    setRemaining(steps[0].duration);
    setIsRunning(true);
  };

  const stop = () => setIsRunning(false);

  const reset = () => {
    setIsRunning(false);
    setStepIndex(0);
    setRemaining(steps[0].duration);
  };

  return (
    <section className="card space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.24em] text-slate-400">Практика</p>
          <h2 className="mt-1 text-2xl font-semibold text-slate-700">Дыхание 4 · 4 · 6</h2>
        </div>
        <div className="rounded-full bg-sky-100 px-4 py-2 text-xs font-medium text-sky-700">
          Рекомендация: 3–5 минут спокойного цикла
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_280px]">
        <div className="rounded-[32px] border border-white/60 bg-gradient-to-b from-white via-sky-50/80 to-white p-5">
          <div className="mx-auto flex h-64 w-64 items-center justify-center rounded-full border-[6px] border-sky-300/70 bg-[radial-gradient(circle_at_center,rgba(223,237,246,0.92),rgba(184,212,230,0.65))] transition-transform duration-700 ease-in-out md:h-72 md:w-72">
            <div
              className={`flex h-52 w-52 flex-col items-center justify-center rounded-full border-2 border-white/80 bg-white/40 text-center backdrop-blur-md transition-transform duration-700 ${phaseClass}`}
            >
              <span className="text-4xl font-light text-slate-700">{stage.label}</span>
              <span className="mt-3 text-sm text-slate-500">{steps.map((item) => item.duration).join(' | ')}</span>
              <span className="mt-2 text-2xl font-medium text-slate-600">{remaining}</span>
            </div>
          </div>
        </div>

        <div className="rounded-[32px] border border-white/60 bg-white/50 p-5">
          <p className="text-sm font-semibold text-slate-700">Ход практики</p>
          <div className="mt-4 space-y-3">
            {steps.map((item, index) => {
              const active = index === stepIndex;

              return (
                <div
                  key={item.label}
                  className={`rounded-[22px] border px-4 py-3 text-sm ${
                    active ? 'border-sky-500/50 bg-sky-600 text-white' : 'border-slate-200 bg-white/80 text-slate-600'
                  }`}
                >
                  <div className="font-semibold">{item.label}</div>
                  <div className={`mt-1 text-xs ${active ? 'text-white/80' : 'text-slate-400'}`}>{item.duration} секунд</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3 text-sm">
        <button type="button" onClick={start} className="rounded-2xl bg-teal-500 px-4 py-3 font-medium text-white shadow-md">
          Старт
        </button>
        <button type="button" onClick={stop} className="rounded-2xl border border-slate-200 bg-white px-4 py-3 font-medium text-slate-600">
          Стоп
        </button>
        <button type="button" onClick={reset} className="rounded-2xl border border-slate-200 bg-white px-4 py-3 font-medium text-slate-600">
          Сброс
        </button>
      </div>
    </section>
  );
}
