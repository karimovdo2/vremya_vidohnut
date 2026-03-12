# Время выдохнуть — MVP

Минималистичное веб-приложение на **Next.js + React + TypeScript + Tailwind CSS** для мягкой саморегуляции и снижения стресса.

## Что внутри MVP
- Экран «Комната» с 3 фонами (лес, дождливое окно, море)
- Аудио природы (3 трека, play/pause)
- Дыхательная практика (4-4-6, кнопки старт/стоп/повтор)
- Дневник состояния (оценка 1–10, эмоция, заметка, localStorage)
- Один интерактив: «стереть запотевшее окно» (canvas)

## Локальный запуск
```bash
npm install
npm run dev
```
Открыть: `http://localhost:3000`

## Простая структура роутинга
Для первого релиза используется 1 маршрут:
- `/` — единый экран с секциями

При росте проекта можно вынести в:
- `/room`
- `/breathing`
- `/journal`

## Структура проекта
```text
app/
  layout.tsx
  page.tsx
  globals.css
components/
  RoomScene.tsx
  NatureAudio.tsx
  BreathingPractice.tsx
  MoodJournal.tsx
  FoggyWindow.tsx
lib/
  types.ts
public/sounds/
  PLACEHOLDERS.md  # пути к ожидаемым rain.wav/sea.wav/forest.wav
```


> В репозитории не хранятся бинарные аудио-файлы. Для локальной проверки добавьте свои `.wav`
> в `public/sounds` с именами `rain.wav`, `sea.wav`, `forest.wav`.
