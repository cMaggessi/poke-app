import { Card, CardContent, Typography } from "@mui/material";

const PokemonCard = ({ name, image }) => {
    return (
      <Card>
        <CardContent>
          <Typography variant="h5" component="div">{name}</Typography>
          <img src={image} alt={name} className="mx-auto" style={{ width: '100px', height: '100px' }} />
        </CardContent>
      </Card>
    );
  };

  export default PokemonCard;