'use client';

import { scenes } from '@/lib/content';
import { SceneId } from '@/lib/types';

type RoomSceneProps = {
  activeScene: SceneId;
  onChange: (scene: SceneId) => void;
  onExpand: () => void;
  isExpanded?: boolean;
};

export function RoomScene({ activeScene, onChange, onExpand, isExpanded = false }: RoomSceneProps) {
  const scene = scenes[activeScene];

  return (
    <section className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.24em] text-slate-400">Комната</p>
          <h2 className="mt-1 text-2xl font-semibold text-slate-700">Окно для спокойной паузы</h2>
        </div>
        <button
          type="button"
          onClick={onExpand}
          className="rounded-full border border-white/70 bg-white/70 px-4 py-2 text-sm text-slate-600 shadow-sm backdrop-blur"
        >
          {isExpanded ? 'Свернуть' : 'Развернуть'}
        </button>
      </div>

      <div className="card overflow-hidden p-3 md:p-4">
        <div
          className="relative min-h-[300px] overflow-hidden rounded-[28px] border border-white/60"
          style={{
            backgroundImage: `${scene.fallback}, url(${scene.imagePath})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          <div className="absolute inset-0 bg-white/28 backdrop-blur-[1.5px]" />
          <div className="absolute inset-y-0 left-[18%] w-5 bg-slate-700/15" />
          <div className="absolute inset-y-0 left-1/2 w-4 -translate-x-1/2 bg-slate-700/20" />
          <div className="absolute inset-y-0 right-[18%] w-5 bg-slate-700/15" />
          <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-slate-800/20 to-transparent" />
          <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-slate-800/20 to-transparent" />

          <div className="absolute inset-x-0 bottom-0 p-5">
            <div className="max-w-md rounded-[24px] border border-white/55 bg-white/50 p-4 backdrop-blur-md">
              <p className="text-xs uppercase tracking-[0.24em] text-slate-500">{scene.accent} {scene.label}</p>
              <p className="mt-2 text-sm leading-6 text-slate-700">{scene.ambience}</p>
              <p className="mt-3 text-xs text-slate-500">
                Фон хранится как ожидаемый путь в <code className="rounded bg-white/60 px-1">public/backgrounds</code>.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2">
        {(Object.keys(scenes) as SceneId[]).map((sceneKey) => {
          const item = scenes[sceneKey];
          const active = activeScene === sceneKey;

          return (
            <button
              key={sceneKey}
              type="button"
              onClick={() => onChange(sceneKey)}
              className={`rounded-2xl border px-3 py-3 text-sm font-medium transition ${
                active
                  ? 'border-sky-500/60 bg-sky-600 text-white shadow-lg shadow-sky-200/60'
                  : 'border-slate-200 bg-white/75 text-slate-600'
              }`}
            >
              <span className="block text-base">{item.accent}</span>
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>
    </section>
  );
}
