import { createAction } from "@reduxjs/toolkit";
import { IPokemon } from "../../api/pokemon.interfaces";

export const fetchAllPokemons = createAction<IPokemon[]>(
  "pokemonReducer/fetchAllPokemons"
);
