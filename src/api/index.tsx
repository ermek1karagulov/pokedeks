import axios from 'axios';
import {
  IFetchPokemonTypesResponse,
  IFetchPokemonsResponse,
  IPokemon,
  IPokemonDetail,
} from './pokemon.interfaces';

export const API_URL = 'https://pokeapi.co/api/v2';

axios.defaults.baseURL = `${API_URL}`;

const pokemon = {
  getAllPokemons: (perPage: number, url?: string) =>
    axios.get<IFetchPokemonsResponse>(url || `/pokemon`, {
      params: {
        limit: perPage,
      },
    }),
  searchPokemon: (perPage: number, name: string) =>
    axios.get<IPokemonDetail>(`/pokemon/${name}`, {
      params: {
        limit: perPage,
      },
    }),
  getOnePokemonDetail: (id: string | number) => axios.get<IPokemonDetail>(`/pokemon/${id}`),
  getPokemonTypes: () => axios.get<IFetchPokemonTypesResponse>(`/type`),
  sortPokemonByType: (perPage: number, type?: string) =>
    axios.get<{ pokemon: { pokemon: IPokemon }[] }>(`/type/${type}`, {
      params: {
        limit: perPage,
      },
    }),
};

const agent = {
  pokemon,
};

export default agent;
