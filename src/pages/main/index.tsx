import React, { useEffect, useState } from "react";
import { useAllPokemons } from "../../store/pokemon/hooks";
import PokemonCard from "../../components/PokemonCard";
import agent from "../../api";
import { addPokemons } from "../../store/pokemon/actions";
import { useDispatch } from "react-redux";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { Button } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const Main = () => {
  const { getAllPokemons } = agent.pokemon;
  const allPokemons = useAllPokemons();
  const dispatch = useDispatch();

  const [perPage, setPerPage] = useState(10);
  const [pagination, setPagination] = useState({
    next: "",
    previous: "",
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

  useEffect(() => {
    fetchPokemons();
  }, [perPage]);

  console.log(allPokemons);

  return (
    <div className="boxSX">
      <Box sx={{ width: "100%" }}>
        <Box sx={{ minWidth: 120 }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">perPage</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={perPage}
              label="Age"
              onChange={(e) => setPerPage(Number(e.target.value))}
            >
              <MenuItem value={10}>10</MenuItem>
              <MenuItem value={20}>20</MenuItem>
              <MenuItem value={50}>50</MenuItem>
            </Select>
          </FormControl>
        </Box>
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
      {pagination.previous && (
        <Button
          onClick={() => fetchPokemons(pagination.previous)}
          variant="contained"
        >
          Previous
        </Button>
      )}
      {pagination.next && (
        <Button
          onClick={() => fetchPokemons(pagination.next)}
          variant="contained"
        >
          Next
        </Button>
      )}
    </div>
  );
};

export default Main;
