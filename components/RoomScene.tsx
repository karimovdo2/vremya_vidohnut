'use client';

import { ChangeEvent } from 'react';
import { scenes } from '@/lib/content';
import { SceneId } from '@/lib/types';

type RoomSceneProps = {
  activeScene: SceneId;
  onChange: (scene: SceneId) => void;
  onExpand: () => void;
  onCustomImageChange: (value?: string) => void;
  customImageSrc?: string;
  isExpanded?: boolean;
};

export function RoomScene({
  activeScene,
  onChange,
  onExpand,
  onCustomImageChange,
  customImageSrc,
  isExpanded = false
}: RoomSceneProps) {
  const scene = scenes[activeScene];

  const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const result = typeof reader.result === 'string' ? reader.result : undefined;
      onCustomImageChange(result);
    };
    reader.readAsDataURL(file);
    event.target.value = '';
  };

  return (
    <section className="space-y-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.24em] text-slate-400">Комната</p>
          <h2 className="mt-1 text-2xl font-semibold text-slate-700">Окно для спокойной паузы</h2>
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={onExpand}
            className="rounded-full border border-white/70 bg-white/70 px-4 py-2 text-sm text-slate-600 shadow-sm backdrop-blur"
          >
            {isExpanded ? 'Свернуть' : 'Развернуть'}
          </button>
        </div>
      </div>

      <div className="card overflow-hidden p-3 md:p-4">
        <div
          className="relative aspect-[3/4] min-h-[420px] overflow-hidden rounded-[28px] border border-white/60"
          style={{
            backgroundImage: `url(\"${customImageSrc ?? scene.imagePath}\")`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundColor: '#dce5e3'
          }}
          aria-label={`Сцена: ${customImageSrc ? 'Пользовательская картинка' : scene.label}`}
        />
      </div>

      <div className="rounded-[24px] border border-white/70 bg-white/70 p-4">
        <p className="text-sm font-semibold text-slate-700">Своя картинка</p>
        <p className="mt-1 text-xs leading-5 text-slate-500">Можно загрузить личное фото для окна. Оно сохранится только локально в этом браузере.</p>
        <div className="mt-3 flex flex-wrap items-center gap-2">
          <label className="cursor-pointer rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-medium text-slate-700">
            Загрузить изображение
            <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
          </label>
          <span className={`rounded-full px-3 py-2 text-xs font-medium ${customImageSrc ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-600'}`}>
            {customImageSrc ? 'Используется ваша картинка' : 'Сейчас используется тема сцены'}
          </span>
          {customImageSrc && (
            <button
              type="button"
              onClick={() => onCustomImageChange(undefined)}
              className="rounded-full border border-rose-200 bg-rose-50 px-4 py-2 text-xs font-medium text-rose-700"
            >
              Удалить свою картинку
            </button>
          )}
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-3">
        {(Object.keys(scenes) as SceneId[]).map((sceneKey) => {
          const item = scenes[sceneKey];
          const active = activeScene === sceneKey;

          return (
            <button
              key={sceneKey}
              type="button"
              onClick={() => onChange(sceneKey)}
              className={`rounded-[24px] border p-3 text-left transition ${
                active
                  ? 'border-sky-500/60 bg-sky-600 text-white shadow-lg shadow-sky-200/60'
                  : 'border-slate-200 bg-white/75 text-slate-600'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xl">{item.accent}</span>
                <span className="text-xs uppercase tracking-[0.18em] opacity-80">Тема</span>
              </div>
              <div className="mt-4 text-base font-semibold">{item.label}</div>
              <div className={`mt-2 rounded-2xl p-3 text-xs ${active ? 'bg-white/15 text-white/90' : 'bg-slate-50 text-slate-500'}`}>
                {item.imagePath}
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
}
