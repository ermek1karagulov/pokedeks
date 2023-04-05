import React, { useEffect, useState } from "react";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import agent from "../../api";
import { useParams } from "react-router-dom";
import { IPokemonDetail } from "../../api/pokemon.interfaces";
import Box from "@mui/material/Box";

export default function PokemonDetails() {
  const params = useParams();
  const { getOnePokemonDetail } = agent.pokemon;
  const [pokemon, setPokemon] = useState<IPokemonDetail | null>(null);

  useEffect(() => {
    getOnePokemonDetail(params.id as string).then((res) =>
      setPokemon(res.data)
    );
  }, []);

  return (
    <div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: "13rem",
        }}
      >
        <Box
          sx={{ width: 270, height: 320, padding: 2 }}
          border="2px solid #24ba53"
          borderRadius="10px"
        >
          <CardMedia
            sx={{ height: 140 }}
            image={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${params.id}.png`}
            title="green iguana"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div" color="red">
              Name: {pokemon?.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Weight: {pokemon?.weight}
              <br />
              Height: {pokemon?.height}
              <br />
              Base_Experience: {pokemon?.base_experience}
            </Typography>
          </CardContent>
        </Box>
      </div>
    </div>
  );
}
