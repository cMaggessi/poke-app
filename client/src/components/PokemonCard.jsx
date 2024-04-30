import { Card, CardContent, Typography } from "@mui/material";

const PokemonCard = ({id, name, image }) => {
  
  return (
    <Card>
      <CardContent>
        <Typography className="text-center" variant="h5" component="div">
          {name}({id})
        </Typography>
        <img
          src={image}
          alt={name}
          className="m-auto"
          style={{ width: "12rem", height: "12rem" }}
        />
      </CardContent>
    </Card>
  );
};

export default PokemonCard;
