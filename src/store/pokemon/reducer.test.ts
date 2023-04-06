import pokemonReducer from './reducer';
import { configureStore, Store } from '@reduxjs/toolkit';
import { addPokemons } from './actions';

describe('pokemon reducer', () => {
  let store: Store;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        pokemon: pokemonReducer,
      },
    });
  });

  describe('addPokemons', () => {
    it('adds fetched pokemons', () => {
      store.dispatch(
        addPokemons([
          { name: 'Erlan', url: 'http://' },
          { name: 'Karagulov', url: 'http://' },
        ]),
      );
      const { allPokemons } = store.getState().pokemon;

      expect(allPokemons).toHaveLength(2);
      expect(allPokemons[0]).toEqual({ name: 'Erlan', url: 'http://' });
    });
  });
});
