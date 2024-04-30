import { TextField } from "@mui/material";
import Header from "./components/Header";
import PokemonCard from "./components/PokemonCard"

function App() {
  return (

<div>
      <Header />
      <div className="container mx-auto mt-4">
        <TextField
          id="search-pokemon"
          label="Search Pokemon..."
          variant="outlined"
          fullWidth
          placeholder="Search pokemon..."
          className="mb-4"
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          
          <PokemonCard name="Pikachu" image="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png" />
          <PokemonCard name="Pikachu" image="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png" />
          <PokemonCard name="Pikachu" image="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png" />
          <PokemonCard name="Pikachu" image="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png" />
          <PokemonCard name="Pikachu" image="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png" />
          <PokemonCard name="Pikachu" image="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png" />
          <PokemonCard name="Pikachu" image="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png" />
          <PokemonCard name="Pikachu" image="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png" />
          <PokemonCard name="Pikachu" image="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png" />
          <PokemonCard name="Pikachu" image="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png" />
          <PokemonCard name="Pikachu" image="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png" />
          <PokemonCard name="Pikachu" image="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png" />
          <PokemonCard name="Pikachu" image="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png" />
          <PokemonCard name="Pikachu" image="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png" />
          <PokemonCard name="Pikachu" image="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png" />
          <PokemonCard name="Pikachu" image="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png" />
          
          
        </div>
      </div>
    </div>

  );
}

export default App;
