'use client';

import { useRef, useState } from 'react';

const tracks = [
  { id: 'rain', label: 'Дождь', src: '/sounds/rain.wav' },
  { id: 'sea', label: 'Море', src: '/sounds/sea.wav' },
  { id: 'forest', label: 'Лес', src: '/sounds/forest.wav' }
] as const;

type TrackId = (typeof tracks)[number]['id'];

export function NatureAudio() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [selectedTrack, setSelectedTrack] = useState<TrackId>('rain');
  const [isPlaying, setIsPlaying] = useState(false);

  const currentSrc = tracks.find((track) => track.id === selectedTrack)?.src ?? tracks[0].src;

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

  const handleChangeTrack = async (trackId: TrackId) => {
    setSelectedTrack(trackId);
    if (!audioRef.current) return;

    audioRef.current.src = tracks.find((track) => track.id === trackId)?.src ?? tracks[0].src;
    audioRef.current.load();

    if (isPlaying) {
      try {
        await audioRef.current.play();
      } catch {
        setIsPlaying(false);
      }
    }
  };

  return (
    <section className="card space-y-3">
      <h2 className="section-title">Аудио природы</h2>
      <div className="grid grid-cols-3 gap-2">
        {tracks.map((track) => (
          <button
            key={track.id}
            type="button"
            onClick={() => handleChangeTrack(track.id)}
            className={`rounded-xl px-2 py-2 text-sm ${
              selectedTrack === track.id ? 'bg-slate-200 text-slate-700' : 'bg-slate-100 text-slate-500'
            }`}
          >
            {track.label}
          </button>
        ))}
      </div>
      <button
        type="button"
        onClick={togglePlayback}
        className="w-full rounded-2xl bg-slate-600 px-4 py-2 text-sm font-medium text-white"
      >
        {isPlaying ? 'Pause' : 'Play'}
      </button>
      <p className="text-xs text-slate-400">
        Пути к трекам готовы. Для локального запуска добавьте файлы rain.wav / sea.wav / forest.wav в
        public/sounds.
      </p>
      <audio
        key={currentSrc}
        ref={audioRef}
        src={currentSrc}
        loop
        onEnded={() => setIsPlaying(false)}
        onPause={() => setIsPlaying(false)}
      />
    </section>
  );
}
