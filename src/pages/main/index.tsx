import React, { useEffect, useMemo, useState } from 'react';
import { useAllPokemons } from '../../store/pokemon/hooks';
import PokemonCard from '../../components/PokemonCard';
import agent from '../../api';
import { addPokemons } from '../../store/pokemon/actions';
import { useDispatch } from 'react-redux';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { Button, TextField, Typography } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useNavigate } from 'react-router-dom';
import { IPokemonType } from '../../api/pokemon.interfaces';

const Main = () => {
  const { getAllPokemons, searchPokemon, getPokemonTypes, sortPokemonByType } = agent.pokemon;
  const allPokemons = useAllPokemons();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [pokemonTypes, setPokemonTypes] = useState<IPokemonType[] | []>([]);
  const [search, setSearch] = useState('');
  const [type, setType] = useState('');
  const [error, setError] = useState('');
  const [perPage, setPerPage] = useState(10);
  const [pagination, setPagination] = useState({
    next: '',
    previous: '',
  });

  const fetchPokemons = async (url?: string) => {
    try {
      const res = await getAllPokemons(perPage, url);
      dispatch(addPokemons(res.data.results));
      setPagination({
        next: res.data.next,
        previous: res.data.previous,
      });
    } catch (e) {
      console.error(e);
    }
  };

  const fetchPokemonTypes = async () => {
    try {
      const res = await getPokemonTypes();
      setPokemonTypes(res.data.results);
    } catch (e) {
      console.error(e);
    }
  };

  useMemo(async () => {
    if (!type) return;
    try {
      const res = await sortPokemonByType(perPage, type);
      const pokes = res.data.pokemon.map((poke) => {
        const { pokemon } = poke;
        return pokemon;
      });
      dispatch(addPokemons(pokes));
    } catch (e) {
      console.error(e);
    }
  }, [type]);

  const handleSearchPokemon = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!search) {
      setError('Enter a pokemon name');
      return;
    }
    try {
      const res = await searchPokemon(perPage, search);
      if (res) {
        navigate(`/pokemon/${res.data.id}`);
      }
    } catch (e) {
      setError(search + ' not found');
    }
  };

  useEffect(() => {
    fetchPokemons();
  }, [perPage]);

  useEffect(() => {
    fetchPokemonTypes();
  }, []);

  return (
    <div className='boxSX'>
      <Box sx={{ width: '100%' }} padding='2rem'>
        <Box sx={{ width: '100%' }} display='flex' justifyContent='center'>
          <Box maxWidth='70rem' padding={10} display='flex' flexDirection='column' gap='2rem'>
            <Box display='flex' justifyContent='space-between' gap='1rem'>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <form onSubmit={handleSearchPokemon}>
                  <TextField
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    id='outlined-basic'
                    label='Search by name'
                    variant='outlined'
                  />
                  <Button type='submit' style={{ height: '100%' }} variant='contained'>
                    Search
                  </Button>
                </form>
                {error && (
                  <Typography gutterBottom variant='h5' component='div' color='red'>
                    {error}
                  </Typography>
                )}
              </div>
              <div>
                <FormControl>
                  <InputLabel id='demo-simple-select-label'>Type</InputLabel>
                  <Select
                    style={{ width: '5rem' }}
                    labelId='demo-simple-select-label'
                    id='demo-simple-select'
                    value={type}
                    label='Age'
                    onChange={(e) => setType(String(e.target.value))}
                  >
                    {pokemonTypes.map((type) => (
                      <MenuItem value={type.name} key={type.url}>
                        {type.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <FormControl>
                  <InputLabel id='demo-simple-select-label'>Limit</InputLabel>
                  <Select
                    labelId='demo-simple-select-label'
                    id='demo-simple-select'
                    value={perPage}
                    label='Age'
                    onChange={(e) => setPerPage(Number(e.target.value))}
                  >
                    <MenuItem value={10}>10</MenuItem>
                    <MenuItem value={20}>20</MenuItem>
                    <MenuItem value={50}>50</MenuItem>
                  </Select>
                </FormControl>
              </div>
            </Box>
            <Grid container spacing={{ xs: 2 }} columns={{ xs: 1, sm: 2, md: 2, lg: 3, xl: 3 }}>
              {allPokemons.map((pokemon, i) => (
                <Grid item xs={1} sm={1} md={1} key={i}>
                  <PokemonCard {...pokemon} key={pokemon.url} />
                </Grid>
              ))}
            </Grid>
          </Box>
        </Box>
        {pagination.previous && (
          <Button onClick={() => fetchPokemons(pagination.previous)} variant='contained'>
            Previous
          </Button>
        )}
        {pagination.next && (
          <Button onClick={() => fetchPokemons(pagination.next)} variant='contained'>
            Next
          </Button>
        )}
      </Box>
    </div>
  );
};

export default Main;
