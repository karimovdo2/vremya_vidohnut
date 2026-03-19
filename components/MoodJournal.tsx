'use client';

import { FormEvent, useEffect, useMemo, useRef, useState } from 'react';
import { emotionGroups } from '@/lib/content';
import { EmotionRating, MoodEntry } from '@/lib/types';

const STORAGE_KEY = 'calm-journal-v2';

export function MoodJournal() {
  const [score, setScore] = useState(5);
  const [moodSummary, setMoodSummary] = useState('');
  const [bodyFeeling, setBodyFeeling] = useState('');
  const [breathingState, setBreathingState] = useState('');
  const [worryText, setWorryText] = useState('');
  const [note, setNote] = useState('');
  const [entries, setEntries] = useState<MoodEntry[]>([]);
  const [selectedEmotions, setSelectedEmotions] = useState<Record<string, number>>({});
  const [isRecording, setIsRecording] = useState(false);
  const [voiceNote, setVoiceNote] = useState<string>();
  const [recorderSupported, setRecorderSupported] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const chunksRef = useRef<Blob[]>([]);

  useEffect(() => {
    setRecorderSupported(typeof window !== 'undefined' && 'MediaRecorder' in window && 'navigator' in window);

    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return;

    try {
      const parsed = JSON.parse(raw) as MoodEntry[];
      setEntries(parsed);
    } catch {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, []);

  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  const selectedEmotionList = useMemo<EmotionRating[]>(() => {
    return Object.entries(selectedEmotions).map(([name, intensity]) => ({ name, intensity }));
  }, [selectedEmotions]);

  const toggleEmotion = (emotion: string) => {
    setSelectedEmotions((previous) => {
      if (previous[emotion]) {
        const next = { ...previous };
        delete next[emotion];
        return next;
      }

      return { ...previous, [emotion]: 3 };
    });
  };

  const updateEmotionIntensity = (emotion: string, intensity: number) => {
    setSelectedEmotions((previous) => ({ ...previous, [emotion]: intensity }));
  };

  const startRecording = async () => {
    if (!recorderSupported) return;

    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    streamRef.current = stream;
    chunksRef.current = [];

    const mediaRecorder = new MediaRecorder(stream);
    mediaRecorderRef.current = mediaRecorder;

    mediaRecorder.ondataavailable = (event) => {
      if (event.data.size > 0) {
        chunksRef.current.push(event.data);
      }
    };

    mediaRecorder.onstop = () => {
      const blob = new Blob(chunksRef.current, { type: 'audio/webm' });
      const reader = new FileReader();
      reader.onloadend = () => {
        setVoiceNote(typeof reader.result === 'string' ? reader.result : undefined);
      };
      reader.readAsDataURL(blob);

      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
        streamRef.current = null;
      }
    };

    mediaRecorder.start();
    setIsRecording(true);
  };

  const stopRecording = () => {
    mediaRecorderRef.current?.stop();
    setIsRecording(false);
  };

  const resetForm = () => {
    setScore(5);
    setMoodSummary('');
    setBodyFeeling('');
    setBreathingState('');
    setWorryText('');
    setNote('');
    setSelectedEmotions({});
    setVoiceNote(undefined);
  };

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    const item: MoodEntry = {
      id: crypto.randomUUID(),
      score,
      moodSummary: moodSummary.trim(),
      bodyFeeling: bodyFeeling.trim(),
      breathingState: breathingState.trim(),
      worryText: worryText.trim(),
      note: note.trim(),
      emotions: selectedEmotionList,
      voiceNote,
      createdAt: new Date().toISOString()
    };

    const next = [item, ...entries].slice(0, 12);
    setEntries(next);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    resetForm();
  };

  return (
    <section className="card space-y-6">
      <div>
        <p className="text-xs uppercase tracking-[0.24em] text-slate-400">Дневник состояния</p>
        <h2 className="mt-1 text-2xl font-semibold text-slate-700">Лист для свободной выгрузки мыслей</h2>
        <p className="mt-2 text-sm leading-6 text-slate-500">
          Автоматически фиксируется дата. Можно писать без ограничения по объёму и при желании добавить голосовую заметку.
        </p>
      </div>

      <form onSubmit={onSubmit} className="space-y-6 rounded-[32px] border border-[#ddd8cc] bg-[#f2eee6] p-5 text-slate-800 shadow-inner">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-sm font-semibold">Дата записи</p>
            <p className="text-sm text-slate-500">{new Date().toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
          </div>
          <div className="rounded-2xl border border-[#d9d3c5] bg-white/60 px-4 py-3 text-sm">
            Ваше состояние: <span className="font-semibold">{score}/10</span>
          </div>
        </div>

        <label className="block text-sm leading-6">
          Уровень состояния
          <input
            type="range"
            min={1}
            max={10}
            value={score}
            onChange={(event) => setScore(Number(event.target.value))}
            className="mt-2 h-2 w-full accent-sky-600"
          />
        </label>

        <div className="grid gap-4 md:grid-cols-2">
          <label className="block text-sm leading-6">
            Что вы чувствуете?
            <textarea
              value={moodSummary}
              onChange={(event) => setMoodSummary(event.target.value)}
              rows={4}
              placeholder="Опишите текущее эмоциональное состояние."
              className="mt-2 w-full rounded-2xl border border-[#d7d1c4] bg-white/75 px-4 py-3 outline-none ring-0"
            />
          </label>
          <label className="block text-sm leading-6">
            Какое сейчас настроение?
            <textarea
              value={note}
              onChange={(event) => setNote(event.target.value)}
              rows={4}
              placeholder="Можно писать свободно и столько, сколько хочется."
              className="mt-2 w-full rounded-2xl border border-[#d7d1c4] bg-white/75 px-4 py-3 outline-none ring-0"
            />
          </label>
          <label className="block text-sm leading-6">
            Что чувствуете в теле?
            <textarea
              value={bodyFeeling}
              onChange={(event) => setBodyFeeling(event.target.value)}
              rows={4}
              placeholder="Напряжение, тяжесть, лёгкость, тепло, дрожь…"
              className="mt-2 w-full rounded-2xl border border-[#d7d1c4] bg-white/75 px-4 py-3 outline-none ring-0"
            />
          </label>
          <label className="block text-sm leading-6">
            Какое сейчас дыхание?
            <textarea
              value={breathingState}
              onChange={(event) => setBreathingState(event.target.value)}
              rows={4}
              placeholder="Частое, поверхностное, рваное, спокойное, глубокое…"
              className="mt-2 w-full rounded-2xl border border-[#d7d1c4] bg-white/75 px-4 py-3 outline-none ring-0"
            />
          </label>
        </div>

        <label className="block text-sm leading-6">
          Что вас беспокоит?
          <textarea
            value={worryText}
            onChange={(event) => setWorryText(event.target.value)}
            rows={5}
            placeholder='Выпишите всё, что тревожит и отвлекает. Позвольте себе "вылить" всё эмоциональное, что накопилось.'
            className="mt-2 w-full rounded-2xl border border-[#d7d1c4] bg-white/75 px-4 py-3 outline-none ring-0"
          />
        </label>

        <div className="space-y-4 rounded-[28px] border border-[#d8d0bf] bg-white/45 p-4">
          <div>
            <h3 className="text-base font-semibold text-slate-700">Выберите несколько эмоций и силу каждой</h3>
            <p className="mt-1 text-sm text-slate-500">По умолчанию при выборе эмоция получает силу 3/5. Затем её можно изменить ползунком.</p>
          </div>

          <div className="space-y-5">
            {emotionGroups.map((group) => (
              <div key={group.title} className="space-y-3">
                <p className="text-sm font-semibold text-slate-600">{group.title}</p>
                <div className="space-y-2">
                  {group.items.map((emotion) => {
                    const isSelected = Boolean(selectedEmotions[emotion]);
                    const intensity = selectedEmotions[emotion] ?? 3;

                    return (
                      <div key={emotion} className="rounded-2xl border border-[#dad3c7] bg-white/60 px-3 py-3">
                        <div className="flex items-center gap-3">
                          <button
                            type="button"
                            onClick={() => toggleEmotion(emotion)}
                            className={`rounded-full px-3 py-1 text-xs font-medium ${
                              isSelected ? 'bg-sky-600 text-white' : 'bg-slate-200 text-slate-600'
                            }`}
                          >
                            {isSelected ? 'Выбрано' : 'Выбрать'}
                          </button>
                          <span className="text-sm text-slate-700">{emotion}</span>
                        </div>
                        {isSelected && (
                          <label className="mt-3 block text-xs text-slate-500">
                            Сила: {intensity}/5
                            <input
                              type="range"
                              min={1}
                              max={5}
                              value={intensity}
                              onChange={(event) => updateEmotionIntensity(emotion, Number(event.target.value))}
                              className="mt-2 h-2 w-full accent-amber-500"
                            />
                          </label>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[28px] border border-[#d8d0bf] bg-white/45 p-4">
          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={isRecording ? stopRecording : startRecording}
              disabled={!recorderSupported}
              className="rounded-2xl bg-slate-700 px-4 py-3 text-sm font-medium text-white disabled:cursor-not-allowed disabled:bg-slate-300"
            >
              {isRecording ? 'Остановить запись' : 'Записать голосом'}
            </button>
            <p className="text-sm text-slate-500">
              {recorderSupported
                ? 'Голосовая заметка хранится локально вместе с записью.'
                : 'Браузер не поддерживает запись голоса в текущей среде.'}
            </p>
          </div>
          {voiceNote && <audio controls src={voiceNote} className="mt-4 w-full" />}
        </div>

        <button type="submit" className="w-full rounded-2xl bg-sky-700 py-3 text-base font-medium text-white shadow-lg shadow-sky-200/60">
          Сохранить запись
        </button>
      </form>

      <div className="space-y-3">
        <h3 className="text-lg font-semibold text-slate-700">История</h3>
        {entries.length === 0 && <p className="text-sm text-slate-400">Пока нет сохранённых записей.</p>}
        <ul className="space-y-4">
          {entries.map((entry) => (
            <li key={entry.id} className="rounded-[28px] border border-white/70 bg-white/70 p-4 shadow-soft">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <p className="text-sm font-semibold text-slate-700">{new Date(entry.createdAt).toLocaleString('ru-RU')}</p>
                <span className="rounded-full bg-sky-100 px-3 py-1 text-xs font-medium text-sky-700">Состояние {entry.score}/10</span>
              </div>
              <div className="mt-3 space-y-2 text-sm leading-6 text-slate-600">
                {entry.moodSummary && <p><span className="font-medium text-slate-700">Чувства:</span> {entry.moodSummary}</p>}
                {entry.note && <p><span className="font-medium text-slate-700">Настроение:</span> {entry.note}</p>}
                {entry.bodyFeeling && <p><span className="font-medium text-slate-700">Тело:</span> {entry.bodyFeeling}</p>}
                {entry.breathingState && <p><span className="font-medium text-slate-700">Дыхание:</span> {entry.breathingState}</p>}
                {entry.worryText && <p><span className="font-medium text-slate-700">Беспокоит:</span> {entry.worryText}</p>}
              </div>
              {entry.emotions.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {entry.emotions.map((emotion) => (
                    <span key={`${entry.id}-${emotion.name}`} className="rounded-full bg-amber-100 px-3 py-1 text-xs text-amber-800">
                      {emotion.name} · {emotion.intensity}/5
                    </span>
                  ))}
                </div>
              )}
              {entry.voiceNote && <audio controls src={entry.voiceNote} className="mt-4 w-full" />}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
