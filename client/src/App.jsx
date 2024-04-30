import { TextField } from "@mui/material";
import Header from "./components/Header";
import PokemonCard from "./components/PokemonCard";
import fetchData from "./api/getPokemonAPI";
import * as React from "react";
import ReactPaginate from "react-paginate";

function App() {
  const [pokedex, setPokedex] = React.useState([]);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [currentPage, setCurrentPage] = React.useState(0);
  const [itemsPerPage] = React.useState(9);

  const baseURL = import.meta.env.VITE_POKEMON_BASEURL;


  // useEffect fetching data on load / useEffect pegando dados ao carregar
  React.useEffect(() => {
    const fetchDataAsync = async () => {
      try {
        const data = await fetchData(baseURL);
       
        const formattedData = data.map((pokemon) => ({
          ...pokemon,
          name: upperFirstLetter(pokemon.name)
        }));
        setPokedex(formattedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchDataAsync();
  }, [baseURL]); // .env VITE dependency (please check set up .env)

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(0);
  };

  const filteredPokedex = pokedex.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const pageCount = Math.ceil(filteredPokedex.length / itemsPerPage);

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  const indexOfLastItem = (currentPage + 1) * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredPokedex.slice(indexOfFirstItem, indexOfLastItem);

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
            currentItems.length > 0 ? (
              currentItems.map((obj) => (
                <PokemonCard
                  key={obj.id}
                  id={obj.id}
                  name={obj.name}
                  image={obj.image}
                />
              ))
            ) : (
              <p>No matching Pokemon found.</p>
            )
          ) : (
            pokedex.length > 0 &&
            currentItems.map((obj) => (
              <PokemonCard
                key={obj.id}
                id={obj.id}
                name={obj.name}
                image={obj.image}
              />
            ))
          )}
        </div>
        {pageCount > 1 && (
          <ReactPaginate
            previousLabel={"← Previous"}
            nextLabel={"Next →"}
            breakLabel={"..."}
            breakClassName={"break-me"}
            pageCount={pageCount}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={handlePageChange}
            containerClassName={"pagination"}
            activeClassName={"active"}
          />
        )}
      </div>
    </div>
  );
}

// Function to capitalize the first letter of a string
function upperFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export default App;
