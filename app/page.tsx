'use client';

import { useState } from 'react';
import { BreathingPractice } from '@/components/BreathingPractice';
import { FoggyWindow } from '@/components/FoggyWindow';
import { MoodJournal } from '@/components/MoodJournal';
import { NatureAudio } from '@/components/NatureAudio';
import { RoomScene } from '@/components/RoomScene';
import { AppTab, SceneId } from '@/lib/types';

const tabs: Array<{ id: AppTab; label: string; icon: string }> = [
  { id: 'room', label: 'Комната', icon: '⌂' },
  { id: 'breathing', label: 'Практики', icon: '✿' },
  { id: 'journal', label: 'Дневник', icon: '☰' },
  { id: 'interactive', label: 'Интерактив', icon: '✦' }
];

export default function Home() {
  const [scene, setScene] = useState<SceneId>('forest');
  const [activeTab, setActiveTab] = useState<AppTab>('room');
  const [isRoomExpanded, setIsRoomExpanded] = useState(false);

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,rgba(185,212,226,0.9),rgba(240,245,248,0.96)_30%,rgba(233,240,244,1)_100%)] px-3 py-4 text-slate-700 sm:px-4 lg:px-6">
      <div className="mx-auto flex min-h-[calc(100vh-2rem)] w-full max-w-7xl flex-col gap-4 lg:flex-row">
        <aside className="overflow-hidden rounded-[36px] border border-white/60 bg-[linear-gradient(180deg,rgba(255,255,255,0.66),rgba(229,238,243,0.72)),url('/backgrounds/forest.jpg')] bg-cover bg-center shadow-soft lg:min-h-[860px] lg:w-[290px]">
          <div className="h-full bg-[linear-gradient(180deg,rgba(255,255,255,0.74),rgba(214,229,236,0.54))] p-4 backdrop-blur-md sm:p-5">
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
                    <span className="font-medium">{tab.label}</span>
                  </button>
                );
              })}
            </nav>

            <div className="mt-6 hidden rounded-[28px] bg-white/35 p-4 lg:block">
              <p className="text-sm leading-6 text-slate-500">
                Подсказка: положите свои фоновые изображения в <code className="rounded bg-white/60 px-1">public/backgrounds</code>,
                а звуки — в <code className="rounded bg-white/60 px-1">public/sounds</code>.
              </p>
            </div>
          </div>
        </aside>

        <section className="flex-1 rounded-[36px] border border-white/60 bg-white/72 p-4 shadow-soft backdrop-blur-md sm:p-6 lg:p-8">
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
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
