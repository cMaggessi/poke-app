// PokemonCard.jsx
import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

const PokemonCard = ({  name, image, onClick, pokeColor }) => (
  <Card
  className=' flex flex-col justify-center items-center transition-all duration-700 ease-in-out hover:scale-110'
  onClick={onClick} sx={{ maxWidth: 189, cursor: 'pointer' }}>
    <CardMedia
      style={{backgroundColor:pokeColor}}
      component="img"
      image={image}
      alt={`Image of ${name}`}
    />
    <CardContent>
      <Typography gutterBottom variant="h5" component="div">
        {name}
      </Typography>
    </CardContent>
  </Card>
);

export default PokemonCard;
