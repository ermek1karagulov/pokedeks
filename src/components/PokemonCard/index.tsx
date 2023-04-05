import React from "react";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";

interface IProps {
  id: number;
  name: string;
}

const PokemonCard = ({ name, id }: IProps) => {
  return (
    <Link style={{ textDecoration: "none" }} to={`/pokemon/${id}`}>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        border="2px solid #24ba53"
        borderRadius="10px"
      >
        <img
          width="150px"
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`}
          alt="pokemon"
        />
        <Typography gutterBottom variant="h5" component="div" color="red">
          {name}
        </Typography>
      </Box>
    </Link>
  );
};

export default PokemonCard;
