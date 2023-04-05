import axios, { AxiosResponse } from "axios";
import {
  IFetchPokemonsResponse,
  IPokemon,
  IPokemonDetail,
} from "./pokemon.interfaces";

export const API_URL = "https://pokeapi.co/api/v2";

axios.defaults.baseURL = `${API_URL}`;

const responseBody = <T,>(response: AxiosResponse<T>) => response.data;

export const requests = {
  get: <T,>(url: string) => axios.get<T>(url).then(responseBody),
  post: <T,>(url: string, body: any, config?: any) =>
    axios.post<T>(url, body, config).then(responseBody),
  put: <T,>(url: string, body: any) =>
    axios.put<T>(url, body).then(responseBody),
  delete: <T,>(url: string) => axios.delete<T>(url).then(responseBody),
};

const pokemon = {
  getAllPokemons: () =>
    requests.get<IFetchPokemonsResponse>(`/pokemon?limit=200&offset=0`),
  getOnePokemonDetail: (id: string | number) =>
    requests.get<IPokemonDetail>(`pokemon/${id}`),
};

const agent = {
  pokemon,
};

export default agent;
