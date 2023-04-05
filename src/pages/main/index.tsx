import React, { useEffect } from "react";
import { useAllPokemons } from "../../store/pokemon/hooks";
import PokemonCard from "../../components/PokemonCard";
import agent from "../../api";
import { fetchAllPokemons } from "../../store/pokemon/actions";
import { useDispatch } from "react-redux";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";

const Main = () => {
  const { getAllPokemons } = agent.pokemon;
  const allPokemons = useAllPokemons();
  const dispatch = useDispatch();

  useEffect(() => {
    getAllPokemons().then((res) => dispatch(fetchAllPokemons(res.results)));
  }, []);

  return (
    <Box sx={{ width: "100%" }} display="flex" justifyContent="center">
      <Box maxWidth="70rem" padding={10}>
        <Grid
          container
          spacing={{ xs: 2 }}
          columns={{ xs: 1, sm: 2, md: 2, lg: 3, xl: 3 }}
        >
          {allPokemons.map((pokemon, i) => (
            <Grid item xs={1} sm={1} md={1} key={i}>
              <PokemonCard name={pokemon.name} id={i + 1} key={i} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default Main;
