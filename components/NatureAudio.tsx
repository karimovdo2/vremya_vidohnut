'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { scenes } from '@/lib/content';
import { SceneId } from '@/lib/types';

type NatureAudioProps = {
  activeScene: SceneId;
};

export function NatureAudio({ activeScene }: NatureAudioProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [selectedTrack, setSelectedTrack] = useState<SceneId>(activeScene);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);

  useEffect(() => {
    setSelectedTrack(activeScene);
  }, [activeScene]);

  useEffect(() => {
    if (!audioRef.current) return;

    audioRef.current.volume = volume;
  }, [volume]);

  useEffect(() => {
    if (!audioRef.current) return;

    audioRef.current.src = scenes[selectedTrack].soundPath;
    audioRef.current.load();

    if (!isPlaying) return;

    void audioRef.current.play().catch(() => {
      setIsPlaying(false);
    });
  }, [selectedTrack, isPlaying]);

  const audioMode = useMemo(() => {
    return selectedTrack === activeScene ? 'Авто-режим активен' : 'Выбран ручной режим';
  }, [activeScene, selectedTrack]);

  const togglePlayback = async () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
      return;
    }

    try {
      await audioRef.current.play();
      setIsPlaying(true);
    } catch {
      setIsPlaying(false);
    }
  };

  return (
    <section className="card space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.24em] text-slate-400">Звуки природы</p>
          <h3 className="mt-1 text-xl font-semibold text-slate-700">Фон подстраивается под выбранную тему</h3>
          <p className="mt-2 text-sm leading-6 text-slate-500">Если вы меняете сцену комнаты, рекомендуемый звук переключается автоматически.</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <span className="rounded-full bg-sky-100 px-3 py-1 text-xs font-medium text-sky-700">{audioMode}</span>
          <span className="rounded-full bg-white px-3 py-1 text-xs font-medium text-slate-600">Сейчас: {scenes[selectedTrack].soundLabel}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
        {(Object.keys(scenes) as SceneId[]).map((sceneId) => {
          const active = selectedTrack === sceneId;

          return (
            <button
              key={sceneId}
              type="button"
              onClick={() => setSelectedTrack(sceneId)}
              className={`rounded-[22px] border px-4 py-4 text-sm transition ${
                active ? 'border-sky-500/50 bg-sky-600 text-white' : 'border-slate-200 bg-white/80 text-slate-600'
              }`}
            >
              <div className="text-base font-semibold">{scenes[sceneId].soundLabel}</div>
              <div className={`mt-1 text-xs ${active ? 'text-white/80' : 'text-slate-400'}`}>{scenes[sceneId].soundPath}</div>
            </button>
          );
        })}
      </div>

      <div className="rounded-[28px] border border-white/60 bg-white/50 p-4">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={togglePlayback}
            className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-700 text-lg text-white shadow-md"
            aria-label={isPlaying ? 'Пауза' : 'Воспроизвести'}
          >
            {isPlaying ? '❚❚' : '▶'}
          </button>
          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={volume}
            onChange={(event) => setVolume(Number(event.target.value))}
            className="h-2 w-full accent-sky-600"
            aria-label="Громкость"
          />
          <span className="text-xl text-slate-500">🔊</span>
        </div>
        <div className="mt-4 grid gap-2 text-xs leading-5 text-slate-500 sm:grid-cols-2">
          <div className="rounded-2xl bg-white/60 p-3">
            Для локальной проверки положите файлы <code className="rounded bg-slate-100 px-1">forest.wav</code>,{' '}
            <code className="rounded bg-slate-100 px-1">rain.wav</code> и <code className="rounded bg-slate-100 px-1">sea.wav</code> в{' '}
            <code className="rounded bg-slate-100 px-1">public/sounds</code>.
          </div>
          <div className="rounded-2xl bg-white/60 p-3">
            Если браузер блокирует autoplay, достаточно один раз нажать кнопку воспроизведения вручную.
          </div>
        </div>
      </div>

      <audio
        ref={audioRef}
        src={scenes[selectedTrack].soundPath}
        loop
        onPause={() => setIsPlaying(false)}
        onEnded={() => setIsPlaying(false)}
      />
    </section>
  );
}
