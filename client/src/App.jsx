import { Pagination, TextField, Modal, Box, Typography } from "@mui/material";
import Header from "./components/Header";
import PokemonCard from "./components/PokemonCard";
import fetchData from "./api/getPokemonAPI";
import * as React from "react";
import { PokemonModal } from "./components/PokemonModal";
import typeColors from "./util/typeColors";

function App() {
  const [pokedex, setPokedex] = React.useState([]);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [currentPage, setCurrentPage] = React.useState(0);
  const [itemsPerPage] = React.useState(9);
  const [selectedPokemon, setSelectedPokemon] = React.useState(null);
  const [openModal, setOpenModal] = React.useState(false);

  //MAKE SURE TO SET UP YOUR .ENV FILE!!
  //VITE_POKEMON_BASEURL=your-backend-endpoint-goes-here
  const baseURL = import.meta.env.VITE_POKEMON_BASEURL;

  function upperFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  React.useEffect(() => {
    const fetchDataAsync = async () => {
      try {
        const data = await fetchData(baseURL);
        const formattedData = data.map((pokemon) => ({
          ...pokemon,
          name: upperFirstLetter(pokemon.name),
        }));
        setPokedex(formattedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchDataAsync();
  }, [baseURL]);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(0);
  };

  const filteredPokedex = pokedex.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handlePageChange = (e, p) => {
    setCurrentPage(p);
  };
  const pageCount = Math.ceil(filteredPokedex.length / itemsPerPage);

  const indexOfLastItem = (currentPage + 1) * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredPokedex.slice(indexOfFirstItem, indexOfLastItem);

  const handlePokemonClick = (pokemon) => {
    setSelectedPokemon(pokemon);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

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
        {pageCount > 1 && (
          <div className="flex justify-center my-5 mx-auto">
            <Pagination
              onChange={handlePageChange}
              className="bg-sky-300 rounded-xl p-2 border text-center"
              count={pageCount}
            />
          </div>
        )}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 ">
          {searchQuery ? (
            currentItems.length > 0 ? (
              currentItems.map((obj) => (
                <PokemonCard
                  pokeColor={typeColors[obj.type]}
                  key={obj.id}
                  id={obj.id}
                  name={obj.name}
                  image={obj.image}
                  onClick={() => handlePokemonClick(obj)}
                />
              ))
            ) : (
              <p>No matching Pokemon found.</p>
            )
          ) : (
            pokedex.length > 0 &&
            currentItems.map((obj) => (
              <PokemonCard
                pokeColor={typeColors[obj.type]}
                key={obj.id}
                id={obj.id}
                name={obj.name}
                image={obj.image}
                onClick={() => handlePokemonClick(obj)}
              />
            ))
          )}
        </div>
      </div>
      <PokemonModal
        open={openModal}
        pokemon={selectedPokemon}
        handleClose={handleCloseModal}
      />
    </div>
  );
}

export default App;
