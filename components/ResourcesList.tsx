'use client';

import { FormEvent, useEffect, useState } from 'react';

const STORAGE_KEY = 'calm-resources-v1';

const defaultResources = [
  'Посмотреть в окно, сделать 10 глубоких вдохов и выдохов, не думая ни о чём.',
  'Сделать несколько глотков чистой питьевой воды медленно.',
  'Выполнить небольшую доступную физическую активность на пару минут: поприседать, попрыгать, пройтись.',
  'Потрогать что-то приятное на ощупь и описать ощущения.',
  'Заняться любой ручной работой на 1–2 минуты: помыть посуду, пересортировать вещи.',
  'Сделать 1–2 минуты записи «что сейчас я чувствую» (2–3 коротких предложения).',
  'Подумать, что сейчас в зоне контроля: дыхание, поза, фраза, выбор действия.',
  'Найти рядом хотя бы один знак безопасности и проговорить: «Это есть, я в безопасности».',
  'Сделать паузу простого отказа: «Сейчас я не обязана/обязан всё контролировать».',
  'Послать короткое сообщение поддержки себе или близкому.'
];

export function ResourcesList() {
  const [resources, setResources] = useState<string[]>(defaultResources);
  const [draft, setDraft] = useState('');

  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return;

    try {
      const parsed = JSON.parse(raw) as string[];
      if (Array.isArray(parsed) && parsed.every((item) => typeof item === 'string')) {
        setResources(parsed);
      }
    } catch {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(resources));
  }, [resources]);

  const addResource = (event: FormEvent) => {
    event.preventDefault();
    const value = draft.trim();
    if (!value) return;

    setResources((previous) => [value, ...previous]);
    setDraft('');
  };

  const removeResource = (index: number) => {
    setResources((previous) => previous.filter((_, itemIndex) => itemIndex !== index));
  };

  const resetDefaults = () => {
    const confirmed = window.confirm('Вернуть список ресурсов по умолчанию?');
    if (!confirmed) return;
    setResources(defaultResources);
  };

  return (
    <section className="card space-y-5">
      <div>
        <p className="text-xs uppercase tracking-[0.24em] text-slate-400">Ресурсы</p>
        <h2 className="mt-1 text-2xl font-semibold text-slate-700">Список дел поддержки в стрессе</h2>
        <p className="mt-2 text-sm leading-6 text-slate-500">
          Список хранится локально на этом устройстве. Вы можете редактировать его под себя и быстро открывать в напряжённый момент.
        </p>
      </div>

      <form onSubmit={addResource} className="rounded-[24px] border border-white/70 bg-white/70 p-4">
        <label className="block text-sm text-slate-600">
          Добавить свой ресурс
          <textarea
            rows={3}
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
            placeholder="Например: 2 минуты посидеть с закрытыми глазами и положить ладонь на грудь."
            className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none"
          />
        </label>
        <div className="mt-3 flex flex-wrap gap-2">
          <button type="submit" className="rounded-full bg-sky-600 px-4 py-2 text-sm font-medium text-white">
            Добавить
          </button>
          <button
            type="button"
            onClick={resetDefaults}
            className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-600"
          >
            Вернуть по умолчанию
          </button>
        </div>
      </form>

      <ul className="space-y-3">
        {resources.map((item, index) => (
          <li key={`${item.slice(0, 20)}-${index}`} className="rounded-[24px] border border-white/70 bg-white/75 p-4">
            <div className="flex items-start gap-3">
              <span className="mt-0.5 rounded-full bg-sky-100 px-2 py-1 text-xs font-semibold text-sky-700">{index + 1}</span>
              <p className="flex-1 text-sm leading-6 text-slate-600">{item}</p>
              <button
                type="button"
                onClick={() => removeResource(index)}
                className="rounded-full border border-rose-200 bg-rose-50 px-3 py-1 text-xs font-medium text-rose-600"
              >
                Удалить
              </button>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
