export type SceneId = 'forest' | 'rain' | 'sea';

export type AppTab = 'room' | 'breathing' | 'journal' | 'interactive';

export type EmotionRating = {
  name: string;
  intensity: number;
};

export type MoodEntry = {
  id: string;
  score: number;
  moodSummary: string;
  bodyFeeling: string;
  breathingState: string;
  worryText: string;
  note: string;
  emotions: EmotionRating[];
  voiceNote?: string;
  createdAt: string;
};
