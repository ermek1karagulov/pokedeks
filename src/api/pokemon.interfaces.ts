export interface IPokemon {
  name: string;
  url: string;
}

export interface IPokemonType extends IPokemon {}

export interface IFetchPokemonsResponse {
  count: number;
  next: string;
  previous: string;
  results: IPokemon[];
}

export interface IFetchPokemonTypesResponse extends IFetchPokemonsResponse {
  results: IPokemonType[];
}

export interface IPokemonDetail {
  name: string;
  id: number;
  base_experience: number;
  height: number;
  weight: number;
  abilities: {
    name: string;
  }[];
  types: {
    type: {
      name: string;
      url: string;
    };
  };
}
