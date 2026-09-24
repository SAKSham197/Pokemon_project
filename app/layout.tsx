import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Pokédex — Pokémon Explorer',
  description: 'Explore Pokémon, their abilities, stats, and moves.'
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
