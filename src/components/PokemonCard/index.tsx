import React from 'react';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';

interface IProps {
  url: string;
  name: string;
}

const PokemonCard = ({ name, url }: IProps) => {
  const clearStr = url.at(-1) === '/' ? url.slice(0, -1) : url;
  const id = clearStr.split('/').pop();

  return (
    <Link style={{ textDecoration: 'none' }} to={`/pokemon/${id}`}>
      <Box
        display='flex'
        flexDirection='column'
        alignItems='center'
        border='2px solid #047e2b'
        borderRadius='10px'
      >
        <img
          width='150px'
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`}
          alt='pokemon'
        />
        <Typography gutterBottom variant='h5' component='div' color='#047e2b'>
          {name}
        </Typography>
      </Box>
    </Link>
  );
};

export default PokemonCard;
