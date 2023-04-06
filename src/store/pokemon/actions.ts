import { createAction } from '@reduxjs/toolkit';
import { IPokemon } from '../../api/pokemon.interfaces';

export const addPokemons = createAction<IPokemon[]>('pokemonReducer/addPokemons');
