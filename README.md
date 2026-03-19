# Время выдохнуть — MVP

Минималистичное веб-приложение на **Next.js + React + TypeScript + Tailwind CSS** для мягкой саморегуляции и снижения стресса.

## Что внутри обновлённого MVP
- Комната в стиле мягкого интерфейса с крупным окном, белёсым стеклом и переключением тем
- Вкладки вместо одновременного вывода всех блоков: `Комната`, `Практики`, `Дневник`, `Интерактив`
- Автоматическая привязка звука природы к выбранной теме комнаты
- Разворачивание окна на весь экран
- Дыхательная практика 4-4-6 на отдельной вкладке
- Расширенный дневник состояния с вопросами, мультивыбором эмоций и силой каждой эмоции
- Голосовая заметка через браузерный `MediaRecorder`
- Отдельный полноэкранный интерактив с запотевшим стеклом

## Локальный запуск
```bash
npm install
npm run dev
```
Открыть: `http://localhost:3000`

## Простая структура роутинга
Для первого релиза остаётся один маршрут:
- `/` — единый shell приложения с вкладками

При необходимости позже можно вынести вкладки в отдельные маршруты:
- `/room`
- `/breathing`
- `/journal`
- `/interactive`

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
  content.ts
  types.ts
public/backgrounds/
  PLACEHOLDERS.md  # ожидаемые forest.jpg / rain-window.jpg / sea.jpg
public/sounds/
  PLACEHOLDERS.md  # ожидаемые forest.wav / rain.wav / sea.wav
```

## Подготовка своих ассетов
В репозитории не хранятся реальные бинарные изображения и аудио.

Для локальной проверки добавьте свои файлы:
- `public/backgrounds/forest.jpg`
- `public/backgrounds/rain-window.jpg`
- `public/backgrounds/sea.jpg`
- `public/sounds/forest.wav`
- `public/sounds/rain.wav`
- `public/sounds/sea.wav`
