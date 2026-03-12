'use client';

import { useEffect, useRef } from 'react';

export function FoggyWindow() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext('2d');
    if (!context) return;

    const setup = () => {
      const size = canvas.getBoundingClientRect();
      canvas.width = size.width;
      canvas.height = size.height;
      context.fillStyle = 'rgba(230, 236, 245, 0.92)';
      context.fillRect(0, 0, canvas.width, canvas.height);
    };

    setup();

    const erase = (x: number, y: number) => {
      context.globalCompositeOperation = 'destination-out';
      const gradient = context.createRadialGradient(x, y, 8, x, y, 34);
      gradient.addColorStop(0, 'rgba(255,255,255,0.8)');
      gradient.addColorStop(1, 'rgba(255,255,255,0)');
      context.fillStyle = gradient;
      context.beginPath();
      context.arc(x, y, 34, 0, Math.PI * 2);
      context.fill();
      context.globalCompositeOperation = 'source-over';
    };

    const pointerMove = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      erase(event.clientX - rect.left, event.clientY - rect.top);
    };

    canvas.addEventListener('pointermove', pointerMove);
    window.addEventListener('resize', setup);

    return () => {
      canvas.removeEventListener('pointermove', pointerMove);
      window.removeEventListener('resize', setup);
    };
  }, []);

  return (
    <section className="card space-y-3">
      <h2 className="section-title">Успокаивающий интерактив</h2>
      <p className="text-sm text-slate-500">Проведите пальцем по окну и мягко «сотрите» запотевание.</p>
      <div className="relative h-40 overflow-hidden rounded-2xl bg-gradient-to-b from-slate-300 via-sky-200 to-cyan-100">
        <div className="absolute inset-0 flex items-center justify-center text-4xl">🌫️</div>
        <canvas ref={canvasRef} className="absolute inset-0 h-full w-full touch-none" />
      </div>
    </section>
  );
}
