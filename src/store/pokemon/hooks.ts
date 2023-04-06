import { useAppSelector } from '..';

export const useAllPokemons = () => useAppSelector((state) => state.pokemon.allPokemons);
