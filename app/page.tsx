'use client';

import { useMemo, useState } from 'react';
import { BreathingPractice } from '@/components/BreathingPractice';
import { FoggyWindow } from '@/components/FoggyWindow';
import { MoodJournal } from '@/components/MoodJournal';
import { NatureAudio } from '@/components/NatureAudio';
import { RoomScene } from '@/components/RoomScene';
import { scenes } from '@/lib/content';
import { AppTab, SceneId } from '@/lib/types';


const tabs: Array<{ id: AppTab; label: string; icon: string; description: string }> = [
  { id: 'room', label: 'Комната', icon: '⌂', description: 'Окно, тема комнаты и атмосферный фон.' },
  { id: 'breathing', label: 'Практики', icon: '✿', description: 'Дыхание 4 · 4 · 6 в спокойном темпе.' },
  { id: 'journal', label: 'Дневник', icon: '☰', description: 'Свободная запись, эмоции и голосовая заметка.' },
  { id: 'interactive', label: 'Интерактив', icon: '✦', description: 'Рисование на запотевшем стекле.' }
];

export default function Home() {
  const [scene, setScene] = useState<SceneId>('forest');
  const [activeTab, setActiveTab] = useState<AppTab>('room');
  const [isRoomExpanded, setIsRoomExpanded] = useState(false);

  const currentTab = useMemo(() => tabs.find((tab) => tab.id === activeTab) ?? tabs[0], [activeTab]);
  const sceneMeta = scenes[scene];

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,rgba(185,212,226,0.9),rgba(240,245,248,0.96)_30%,rgba(233,240,244,1)_100%)] px-3 py-4 pb-24 text-slate-700 sm:px-4 lg:px-6 lg:pb-4">
      <div className="mx-auto flex min-h-[calc(100vh-2rem)] w-full max-w-7xl flex-col gap-4 lg:flex-row">
        <aside className="hidden overflow-hidden rounded-[36px] border border-white/60 bg-[linear-gradient(180deg,rgba(255,255,255,0.66),rgba(229,238,243,0.72)),url('/backgrounds/forest.jpg')] bg-cover bg-center shadow-soft lg:block lg:min-h-[860px] lg:w-[290px]">
          <div className="flex h-full flex-col bg-[linear-gradient(180deg,rgba(255,255,255,0.74),rgba(214,229,236,0.54))] p-5 backdrop-blur-md">
            <div className="rounded-[28px] bg-white/40 p-4">
              <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Время выдохнуть</p>
              <h1 className="mt-3 text-3xl font-semibold text-slate-700">Спокойная комната</h1>
              <p className="mt-3 text-sm leading-6 text-slate-500">
                Минималистичное пространство для паузы: окно, звуки природы, дыхание, дневник и мягкий интерактив.
              </p>
            </div>

            <nav className="mt-5 grid gap-3">
              {tabs.map((tab) => {
                const active = activeTab === tab.id;

                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-3 rounded-[24px] px-4 py-4 text-left text-base transition ${
                      active
                        ? 'bg-sky-100/90 text-slate-700 shadow-md'
                        : 'bg-white/40 text-slate-500 hover:bg-white/60'
                    }`}
                  >
                    <span className="text-xl">{tab.icon}</span>
                    <div>
                      <div className="font-medium">{tab.label}</div>
                      <div className="text-xs text-slate-400">{tab.description}</div>
                    </div>
                  </button>
                );
              })}
            </nav>

            <div className="mt-auto rounded-[28px] bg-white/35 p-4">
              <p className="text-xs uppercase tracking-[0.24em] text-slate-400">Сейчас активно</p>
              <p className="mt-2 text-xl font-semibold text-slate-700">{sceneMeta.accent} {sceneMeta.label}</p>
              <p className="mt-2 text-sm leading-6 text-slate-500">{sceneMeta.ambience}</p>
            </div>
          </div>
        </aside>

        <section className="flex-1 rounded-[36px] border border-white/60 bg-white/72 p-4 shadow-soft backdrop-blur-md sm:p-6 lg:p-8">
          <header className="mb-6 space-y-4 lg:mb-8">
            <div className="rounded-[30px] border border-white/70 bg-[linear-gradient(135deg,rgba(255,255,255,0.92),rgba(228,236,242,0.72))] p-4 shadow-sm">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.28em] text-slate-400">{currentTab.label}</p>
                  <h2 className="mt-2 text-2xl font-semibold text-slate-700 sm:text-3xl">{currentTab.description}</h2>
                </div>
                <div className="flex flex-wrap gap-2 sm:max-w-xs sm:justify-end">
                  <span className="rounded-full bg-sky-100 px-3 py-1 text-xs font-medium text-sky-700">Тема: {sceneMeta.label}</span>
                  <span className="rounded-full bg-white px-3 py-1 text-xs font-medium text-slate-600">Звук: {sceneMeta.soundLabel}</span>
                </div>
              </div>
            </div>

            <nav className="grid grid-cols-2 gap-2 lg:hidden">
              {tabs.map((tab) => {
                const active = activeTab === tab.id;

                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveTab(tab.id)}
                    className={`rounded-[22px] px-4 py-3 text-sm font-medium transition ${
                      active ? 'bg-sky-600 text-white shadow-md' : 'bg-white/80 text-slate-600'
                    }`}
                  >
                    {tab.icon} {tab.label}
                  </button>
                );
              })}
            </nav>
          </header>

          <div className={activeTab === 'room' ? 'block' : 'hidden'}>
            <div className="space-y-6">
              <RoomScene
                activeScene={scene}
                onChange={setScene}
                onExpand={() => setIsRoomExpanded(true)}
                isExpanded={isRoomExpanded}
              />
              <NatureAudio activeScene={scene} />
            </div>
          </div>

          <div className={activeTab === 'breathing' ? 'block' : 'hidden'}>
            <BreathingPractice />
          </div>

          <div className={activeTab === 'journal' ? 'block' : 'hidden'}>
            <MoodJournal />
          </div>

          <div className={activeTab === 'interactive' ? 'block' : 'hidden'}>
            <FoggyWindow />
          </div>
        </section>
      </div>

      <nav className="fixed inset-x-3 bottom-3 z-40 grid grid-cols-4 gap-2 rounded-[28px] border border-white/70 bg-white/85 p-2 shadow-soft backdrop-blur-md lg:hidden">
        {tabs.map((tab) => {
          const active = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`rounded-[20px] px-2 py-3 text-center text-xs font-medium transition ${
                active ? 'bg-sky-600 text-white' : 'bg-transparent text-slate-500'
              }`}
            >
              <span className="block text-base">{tab.icon}</span>
              <span className="mt-1 block">{tab.label}</span>
            </button>
          );
        })}
      </nav>

      {isRoomExpanded && (
        <div className="fixed inset-0 z-50 bg-slate-900/45 p-3 backdrop-blur-sm sm:p-6">
          <div className="mx-auto flex h-full max-w-6xl flex-col rounded-[36px] border border-white/20 bg-white/12 p-4 backdrop-blur-xl sm:p-6">
            <div className="mb-4 flex justify-end">
              <button
                type="button"
                onClick={() => setIsRoomExpanded(false)}
                className="rounded-full border border-white/30 bg-white/20 px-4 py-2 text-sm text-white"
              >
                Закрыть
              </button>
            </div>
            <div className="flex-1 overflow-auto rounded-[30px] bg-white/75 p-4 sm:p-6">
              <RoomScene
                activeScene={scene}
                onChange={setScene}
                onExpand={() => setIsRoomExpanded(false)}
                isExpanded={true}
              />
              <div className="mt-6">
                <NatureAudio activeScene={scene} />
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
