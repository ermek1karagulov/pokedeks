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
    <div className="boxSX">
      <Box sx={{ width: "100%" }}>
        <Grid
          container
          spacing={{ xs: 1 }}
          columns={{ xs: 1, sm: 2, md: 3, lg: 4, xl: 5 }}
        >
          {allPokemons.map((pokemon, i) => (
            <Grid item xs={1} sm={1} md={1} key={i}>
              <PokemonCard {...pokemon} id={i + 1} key={i} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </div>
  );
};

export default Main;
