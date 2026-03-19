'use client';

import { useEffect, useRef, useState } from 'react';

type FoggyWindowProps = {
  compact?: boolean;
};

export function FoggyWindow({ compact = false }: FoggyWindowProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [resetVersion, setResetVersion] = useState(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext('2d');
    if (!context) return;

    const setup = () => {
      const size = canvas.getBoundingClientRect();
      canvas.width = size.width;
      canvas.height = size.height;
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.fillStyle = 'rgba(233, 238, 244, 0.92)';
      context.fillRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < 90; i += 1) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const radius = Math.random() * 3 + 1;
        context.fillStyle = 'rgba(255,255,255,0.35)';
        context.beginPath();
        context.arc(x, y, radius, 0, Math.PI * 2);
        context.fill();
      }
    };

    setup();

    const erase = (x: number, y: number) => {
      context.globalCompositeOperation = 'destination-out';
      const gradient = context.createRadialGradient(x, y, 10, x, y, compact ? 32 : 54);
      gradient.addColorStop(0, 'rgba(255,255,255,0.95)');
      gradient.addColorStop(1, 'rgba(255,255,255,0)');
      context.fillStyle = gradient;
      context.beginPath();
      context.arc(x, y, compact ? 32 : 54, 0, Math.PI * 2);
      context.fill();
      context.globalCompositeOperation = 'source-over';
    };

    const handlePointer = (event: PointerEvent) => {
      if ((event.buttons & 1) !== 1 && event.pointerType === 'mouse') return;
      const rect = canvas.getBoundingClientRect();
      erase(event.clientX - rect.left, event.clientY - rect.top);
    };

    canvas.addEventListener('pointermove', handlePointer);
    canvas.addEventListener('pointerdown', handlePointer);
    window.addEventListener('resize', setup);

    return () => {
      canvas.removeEventListener('pointermove', handlePointer);
      canvas.removeEventListener('pointerdown', handlePointer);
      window.removeEventListener('resize', setup);
    };
  }, [compact, resetVersion]);

  return (
    <section className="card space-y-5">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.24em] text-slate-400">Интерактив</p>
          <h2 className="mt-1 text-2xl font-semibold text-slate-700">Рисовать на стекле</h2>
        </div>
        <div className="rounded-2xl border border-white/60 bg-white/60 px-4 py-2 text-sm text-slate-500">
          Ведите пальцем или мышкой
        </div>
      </div>

      <button
        type="button"
        onClick={() => setResetVersion((value) => value + 1)}
        className="rounded-[28px] border border-white/70 bg-[linear-gradient(180deg,rgba(255,255,255,0.82),rgba(224,231,238,0.72))] px-5 py-4 text-left shadow-sm backdrop-blur-md"
      >
        <span className="block text-lg font-medium text-slate-700">Запотевшее стекло</span>
        <span className="mt-1 block text-sm text-slate-500">Если хотите начать заново, нажмите сюда и конденсат появится снова.</span>
      </button>

      <div className={`relative overflow-hidden rounded-[30px] border border-white/60 ${compact ? 'h-72' : 'h-[72vh] min-h-[520px]'}`}>
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(181,201,216,0.85),rgba(146,169,189,0.92))]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(255,255,255,0.35),transparent_48%)]" />
        <div className="absolute inset-0 flex items-center justify-center text-[120px] text-white/30">♡</div>
        <canvas ref={canvasRef} className="absolute inset-0 h-full w-full touch-none" />
      </div>
    </section>
  );
}
