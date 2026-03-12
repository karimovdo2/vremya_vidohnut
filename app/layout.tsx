import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Время выдохнуть',
  description: 'Минималистичное антистресс MVP-приложение для саморегуляции.'
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  );
}
