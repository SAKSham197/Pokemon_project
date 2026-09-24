'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

type Pokemon = { name: string; url: string };

export default function HomePage() {
  const [pokemon, setPokemon] = useState<Pokemon[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://pokeapi.co/api/v2/pokemon?limit=151')
      .then((response) => response.json())
      .then((data) => setPokemon(data.results))
      .catch(() => setPokemon([]))
      .finally(() => setLoading(false));
  }, []);

  const results = pokemon.filter((item) =>
    item.name.includes(search.toLowerCase())
  );

  return (
    <main className="page-shell">
      <header className="topbar">
        <Link className="brand" href="/">Pokédex</Link>
      </header>
      <section className="collection">
        <p className="eyebrow">POKÉMON EXPLORER</p>
        <h1>Explore Pokémon</h1>
        <p>Search the original 151 Pokémon and select one to see more.</p>
        <label className="search">
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search by name"
            aria-label="Search Pokémon"
          />
        </label>
        {loading ? (
          <p className="message">Loading Pokémon…</p>
        ) : (
          <div className="pokemon-grid">
            {results.map((item) => {
              const id = item.url.split('/').filter(Boolean).pop();
              return (
                <Link className="pokemon-card" href={`/pokemon/${id}`} key={id}>
                  <img
                    src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`}
                    alt={item.name}
                  />
                  <span className="card-name">{item.name}</span>
                </Link>
              );
            })}
            {!results.length && <p>No Pokémon found.</p>}
          </div>
        )}
      </section>
    </main>
  );
}
