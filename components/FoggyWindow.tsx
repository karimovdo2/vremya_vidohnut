'use client';

import { useEffect, useRef, useState } from 'react';

type FoggyWindowProps = {
  compact?: boolean;
};

export function FoggyWindow({ compact = false }: FoggyWindowProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const isDrawingRef = useRef(false);
  const [resetVersion, setResetVersion] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext('2d');
    if (!context) return;

    const setup = () => {
      const size = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;

      canvas.width = Math.floor(size.width * dpr);
      canvas.height = Math.floor(size.height * dpr);
      context.setTransform(dpr, 0, 0, dpr, 0, 0);

      context.clearRect(0, 0, size.width, size.height);
      context.fillStyle = 'rgba(233, 238, 244, 0.92)';
      context.fillRect(0, 0, size.width, size.height);

      for (let i = 0; i < 90; i += 1) {
        const x = Math.random() * size.width;
        const y = Math.random() * size.height;
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


      const radius = compact ? 32 : 52;
      const gradient = context.createRadialGradient(x, y, 10, x, y, radius);

      gradient.addColorStop(0, 'rgba(255,255,255,0.96)');
      gradient.addColorStop(1, 'rgba(255,255,255,0)');
      context.fillStyle = gradient;
      context.beginPath();
      context.arc(x, y, radius, 0, Math.PI * 2);
      context.fill();
      context.globalCompositeOperation = 'source-over';
    };

    const pointerToCanvas = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      return { x: event.clientX - rect.left, y: event.clientY - rect.top };


fix/current-working-state
    };

    const handlePointerDown = (event: PointerEvent) => {
      isDrawingRef.current = true;
      canvas.setPointerCapture(event.pointerId);
      const point = pointerToCanvas(event);
      erase(point.x, point.y);

    };

    const handlePointerMove = (event: PointerEvent) => {
      if (!isDrawingRef.current) return;
      const point = pointerToCanvas(event);
      erase(point.x, point.y);
    };

    const handlePointerUp = () => {
      isDrawingRef.current = false;
    };

    canvas.addEventListener('pointerdown', handlePointerDown);
    canvas.addEventListener('pointermove', handlePointerMove);
    canvas.addEventListener('pointerup', handlePointerUp);
    canvas.addEventListener('pointercancel', handlePointerUp);
    window.addEventListener('resize', setup);

    return () => {
      canvas.removeEventListener('pointerdown', handlePointerDown);
      canvas.removeEventListener('pointermove', handlePointerMove);
      canvas.removeEventListener('pointerup', handlePointerUp);
      canvas.removeEventListener('pointercancel', handlePointerUp);
      window.removeEventListener('resize', setup);
    };
  }, [compact, resetVersion, isExpanded]);

  const canvasHeight = compact ? 'h-72' : isExpanded ? 'h-[78vh] min-h-[520px]' : 'h-[62vh] min-h-[420px]';

  const renderCanvas = () => (
    <div className={`relative w-full overflow-hidden rounded-[30px] border border-white/60 ${canvasHeight}`}>
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(181,201,216,0.85),rgba(146,169,189,0.92))]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(255,255,255,0.35),transparent_48%)]" />
      <div className="absolute inset-0 flex items-center justify-center text-[120px] text-white/30">♡</div>
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" style={{ touchAction: 'none' }} />
    </div>
  );

  return (
    <section className="card space-y-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.24em] text-slate-400">Интерактив</p>
          <h2 className="mt-1 text-2xl font-semibold text-slate-700">Рисовать на стекле</h2>
        </div>
        <div className="rounded-2xl border border-white/60 bg-white/60 px-4 py-2 text-sm text-slate-500">
          Ведите пальцем или мышкой
        </div>
      </div>

      <div className="space-y-4">


        <button
          type="button"
          onClick={() => setResetVersion((value) => value + 1)}
          className="w-full rounded-[28px] border border-white/70 bg-[linear-gradient(180deg,rgba(255,255,255,0.82),rgba(224,231,238,0.72))] px-5 py-4 text-left shadow-sm backdrop-blur-md"
        >
          <span className="block text-lg font-medium text-slate-700">Запотевшее стекло</span>
          <span className="mt-1 block text-sm text-slate-500">Нажмите сюда, чтобы снова покрыть стекло конденсатом и начать заново.</span>
        </button>

        <div className={`relative w-full overflow-hidden rounded-[30px] border border-white/60 ${compact ? 'h-72' : 'h-[62vh] min-h-[420px]'}`}>
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(181,201,216,0.85),rgba(146,169,189,0.92))]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(255,255,255,0.35),transparent_48%)]" />
          <div className="absolute inset-0 flex items-center justify-center text-[120px] text-white/30">♡</div>
          <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" style={{ touchAction: 'none' }} />

        </div>

        {!isExpanded && renderCanvas()}

        <aside className="rounded-[30px] border border-white/60 bg-white/55 p-5">
          <p className="text-sm font-semibold text-slate-700">Мягкие подсказки</p>
          <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-500">
            <li>• Сначала просто рисуйте линии и не пытайтесь сделать что-то идеально.</li>
            <li>• Можно медленно выдыхать во время движения пальца по стеклу.</li>
            <li>• Если хочется начать заново — снова нажмите кнопку выше.</li>
          </ul>
        </aside>
      </div>

      {isExpanded && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 p-3 backdrop-blur-sm sm:p-6">
          <div className="mx-auto flex h-full w-full max-w-5xl flex-col rounded-[28px] border border-white/20 bg-white/10 p-4 backdrop-blur-xl sm:p-6">
            <div className="mb-4 flex items-center justify-between gap-2">
              <p className="text-sm font-medium text-white">Запотевшее стекло — полноэкранный режим</p>
              <button
                type="button"
                onClick={() => setIsExpanded(false)}
                className="rounded-full border border-white/40 bg-white/20 px-4 py-2 text-sm font-medium text-white"
              >
                Закрыть
              </button>
            </div>
            {renderCanvas()}
          </div>
        </div>
      )}
    </section>
  );
}
