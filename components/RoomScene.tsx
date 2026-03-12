'use client';

import { SceneId } from '@/lib/types';

const scenes: Record<SceneId, { label: string; background: string; accent: string }> = {
  forest: {
    label: 'Лес',
    background: 'from-emerald-200 via-green-100 to-lime-50',
    accent: '🌲'
  },
  rain: {
    label: 'Дождливое окно',
    background: 'from-slate-300 via-sky-200 to-blue-100',
    accent: '🌧️'
  },
  sea: {
    label: 'Море',
    background: 'from-cyan-200 via-blue-100 to-indigo-50',
    accent: '🌊'
  }
};

type RoomSceneProps = {
  activeScene: SceneId;
  onChange: (scene: SceneId) => void;
};

export function RoomScene({ activeScene, onChange }: RoomSceneProps) {
  return (
    <section className="space-y-3">
      <h2 className="section-title">Комната</h2>
      <div className={`card min-h-44 bg-gradient-to-br ${scenes[activeScene].background}`}>
        <p className="text-sm text-slate-600">Сейчас:</p>
        <p className="mt-2 text-2xl font-medium text-slate-700">
          {scenes[activeScene].accent} {scenes[activeScene].label}
        </p>
        <p className="mt-2 max-w-xs text-sm text-slate-600">
          Тихое пространство для паузы: дышите ровно, переключайте фон и оставайтесь в моменте.
        </p>
      </div>
      <div className="grid grid-cols-3 gap-2">
        {(Object.keys(scenes) as SceneId[]).map((scene) => (
          <button
            key={scene}
            type="button"
            onClick={() => onChange(scene)}
            className={`rounded-2xl border px-3 py-2 text-sm transition ${
              activeScene === scene
                ? 'border-slate-400 bg-white text-slate-700'
                : 'border-white/50 bg-white/50 text-slate-500'
            }`}
          >
            {scenes[scene].accent} {scenes[scene].label}
          </button>
        ))}
      </div>
    </section>
  );
}
