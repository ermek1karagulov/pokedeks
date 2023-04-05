export interface IPokemon {
  name: string;
  url: string;
}

export interface IFetchPokemonsResponse {
  count: number;
  next: string;
  results: IPokemon[];
}

export interface IPokemonDetail {
  name: string;
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
