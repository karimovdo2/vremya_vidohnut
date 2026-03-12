'use client';

import { FormEvent, useEffect, useState } from 'react';
import { MoodEntry } from '@/lib/types';

const STORAGE_KEY = 'calm-journal';
const emotions = ['Спокойствие', 'Тревога', 'Усталость', 'Радость', 'Раздражение'];

export function MoodJournal() {
  const [score, setScore] = useState(5);
  const [emotion, setEmotion] = useState(emotions[0]);
  const [note, setNote] = useState('');
  const [entries, setEntries] = useState<MoodEntry[]>([]);

  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return;

    try {
      const parsed = JSON.parse(raw) as MoodEntry[];
      setEntries(parsed);
    } catch {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, []);

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    const item: MoodEntry = {
      id: crypto.randomUUID(),
      score,
      emotion,
      note: note.trim(),
      createdAt: new Date().toISOString()
    };

    const next = [item, ...entries].slice(0, 20);
    setEntries(next);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    setNote('');
  };

  return (
    <section className="card space-y-4">
      <h2 className="section-title">Дневник состояния</h2>
      <form className="space-y-3" onSubmit={onSubmit}>
        <label className="block text-sm text-slate-600">
          Состояние: <span className="font-semibold">{score}/10</span>
          <input
            type="range"
            min={1}
            max={10}
            value={score}
            onChange={(e) => setScore(Number(e.target.value))}
            className="mt-1 w-full"
          />
        </label>

        <label className="block text-sm text-slate-600">
          Эмоция
          <select
            value={emotion}
            onChange={(e) => setEmotion(e.target.value)}
            className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-2 py-2"
          >
            {emotions.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </label>

        <label className="block text-sm text-slate-600">
          Короткая заметка
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            rows={3}
            placeholder="Что сейчас происходит внутри?"
            className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-2"
          />
        </label>

        <button type="submit" className="w-full rounded-xl bg-slate-600 py-2 text-sm font-medium text-white">
          Сохранить
        </button>
      </form>

      <div className="space-y-2">
        <p className="text-sm font-medium text-slate-600">История</p>
        {entries.length === 0 && <p className="text-sm text-slate-400">Пока нет записей.</p>}
        <ul className="space-y-2">
          {entries.map((entry) => (
            <li key={entry.id} className="rounded-xl bg-white/70 p-3 text-sm text-slate-600">
              <p>
                <span className="font-medium">{entry.score}/10</span> · {entry.emotion}
              </p>
              {entry.note && <p className="mt-1">{entry.note}</p>}
              <p className="mt-1 text-xs text-slate-400">{new Date(entry.createdAt).toLocaleString('ru-RU')}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
