import { TextField } from "@mui/material";
import Header from "./components/Header";
import PokemonCard from "./components/PokemonCard";
import fetchData from "./api/getPokemonAPI";
import * as React from "react";

function App() {
  const [pokedex, setPokedex] = React.useState([]);
  const [searchQuery, setSearchQuery] = React.useState("");

  const baseURL = import.meta.env.VITE_POKEMON_BASEURL;

  React.useEffect(() => {
    const fetchDataAsync = async () => {
      try {
        const data = await fetchData(baseURL);
        setPokedex(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchDataAsync();
  }, [baseURL]);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredPokedex = pokedex.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  console.log(pokedex);

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
          onChange={handleSearch}
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {searchQuery ? (
            filteredPokedex.length > 0 ? (
              filteredPokedex.map((obj) => (
                <PokemonCard
                  key={obj.id}
                  name={obj.name}
                  image={obj.image}
                />
              ))
            ) : (
              <p>No matching Pokemon found.</p>
            )
          ) : (
            pokedex.length > 0 &&
            pokedex.map((obj) => (
              <PokemonCard key={obj.id} name={obj.name} image={obj.image} />
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
