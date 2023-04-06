import { createReducer } from '@reduxjs/toolkit';
import { IPokemon } from '../../api/pokemon.interfaces';
import { addPokemons } from './actions';

export interface IPokemonState {
  allPokemons: [] | IPokemon[];
}

const initialState: IPokemonState = {
  allPokemons: [],
};

export default createReducer(initialState, (builder) => {
  builder.addCase(addPokemons, (state, { payload }) => {
    return {
      ...state,
      allPokemons: payload,
    };
  });
});
