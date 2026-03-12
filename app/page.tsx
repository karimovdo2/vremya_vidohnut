'use client';

import { useState } from 'react';
import { BreathingPractice } from '@/components/BreathingPractice';
import { FoggyWindow } from '@/components/FoggyWindow';
import { MoodJournal } from '@/components/MoodJournal';
import { NatureAudio } from '@/components/NatureAudio';
import { RoomScene } from '@/components/RoomScene';
import { SceneId } from '@/lib/types';

export default function Home() {
  const [scene, setScene] = useState<SceneId>('forest');

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-md flex-col gap-4 px-4 py-6">
      <header className="space-y-1">
        <h1 className="text-2xl font-semibold text-slate-700">Время выдохнуть</h1>
        <p className="text-sm text-slate-500">Минималистичная пауза для саморегуляции и спокойствия.</p>
      </header>

      <RoomScene activeScene={scene} onChange={setScene} />
      <NatureAudio />
      <BreathingPractice />
      <FoggyWindow />
      <MoodJournal />
    </main>
  );
}
