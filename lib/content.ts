import { SceneId } from '@/lib/types';

export const scenes: Record<
  SceneId,
  {
    label: string;
    accent: string;
    ambience: string;
    soundLabel: string;
    background: string;
    imagePath: string;
    fallback: string;
    soundPath: string;
  }
> = {
  forest: {
    label: 'Лес',
    accent: '🌲',
    ambience: 'Пасмурный хвойный лес, мягкий рассеянный свет и ощущение свежести после дождя.',
    soundLabel: 'Лес',
    background: '/backgrounds/forest.jpg',
    imagePath: '/backgrounds/forest.jpg',
    fallback: 'linear-gradient(180deg, rgba(224,232,228,0.82), rgba(196,210,202,0.72))',
    soundPath: '/sounds/forest.wav',
  },
  rain: {
    label: 'Дождь',
    accent: '🌧️',
    ambience: 'Тихий дождь за окном, приглушённый свет и спокойный ритм капель.',
    soundLabel: 'Дождь',
    background: '/backgrounds/rain.jpg',
    imagePath: '/backgrounds/rain.jpg',
    fallback: 'linear-gradient(180deg, rgba(214,221,228,0.84), rgba(187,198,208,0.76))',
    soundPath: '/sounds/rain.wav',
  },
  sea: {
    label: 'Море',
    accent: '🌊',
    ambience: 'Светлый морской воздух, ровный горизонт и мягкий шум волн.',
    soundLabel: 'Море',
    background: '/backgrounds/sea.jpg',
    imagePath: '/backgrounds/sea.jpg',
    fallback: 'linear-gradient(180deg, rgba(221,232,238,0.84), rgba(191,210,220,0.76))',
    soundPath: '/sounds/sea.wav',
  },
};

export const emotionGroups = [
  {
    title: 'Спокойствие и ресурс',
    items: ['спокойно', 'умиротворённо', 'устойчиво', 'в безопасности', 'собранно'],
  },
  {
    title: 'Усталость и перегрузка',
    items: ['устало', 'истощённо', 'вяло', 'сонно', 'перегружено'],
  },
  {
    title: 'Тревога и напряжение',
    items: ['тревожно', 'напряжённо', 'беспокойно', 'раздражённо', 'настороженно'],
  },
  {
    title: 'Светлые эмоции',
    items: ['радостно', 'легко', 'воодушевлённо', 'уютно', 'тепло'],
  },
];