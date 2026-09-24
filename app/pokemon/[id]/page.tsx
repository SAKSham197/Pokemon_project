'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

type Pokemon = {
  name: string;
  sprites: { front_default: string };
  types: { type: { name: string } }[];
  abilities: { ability: { name: string } }[];
  stats: { base_stat: number; stat: { name: string } }[];
  moves: { move: { name: string } }[];
};

export default function PokemonPage({ params }: { params: { id: string } }) {
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);

  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${params.id}`)
      .then((response) => response.json())
      .then((data) => setPokemon(data));
  }, [params.id]);

  if (!pokemon) {
    return <main className="detail-shell"><p>Loading Pokémon…</p></main>;
  }

  return (
    <main className="detail-shell">
      <Link className="back-link" href="/">← Back to all Pokémon</Link>
      <h1 className="pokemon-title">{pokemon.name}</h1>
      <img className="pokemon-detail-image" src={pokemon.sprites.front_default} alt={pokemon.name} />
      <h2>Types</h2>
      <p>{pokemon.types.map((item) => item.type.name).join(', ')}</p>
      <h2>Abilities</h2>
      <p>{pokemon.abilities.map((item) => item.ability.name).join(', ')}</p>
      <h2>Stats</h2>
      <ul>{pokemon.stats.map((item) => <li key={item.stat.name}>{item.stat.name}: {item.base_stat}</li>)}</ul>
      <h2>Moves</h2>
      <p>{pokemon.moves.slice(0, 10).map((item) => item.move.name).join(', ')}</p>
    </main>
  );
}
