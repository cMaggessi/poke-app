import { Pagination, TextField } from "@mui/material";
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

  //inside .env file:
  //VITE_POKEMON_BASEURL=your-backend-endpoint-goes-here

  const baseURL = import.meta.env.VITE_POKEMON_BASEURL;

  // function I added to capitalize the first letter of a string
  function upperFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  // useEffect fetching data on load
  React.useEffect(() => {
    const fetchDataAsync = async () => {
      try {
        const data = await fetchData(baseURL);

        // here i am calling the function that i made inside the set useState
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
  }, [baseURL]); // .env VITE dependency (please check set up .env)

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);

    //when user searches for a pokemon, it becomes the first page. consulted from stackoverflow
    setCurrentPage(0);
  };

  const filteredPokedex = pokedex.filter((pokemon) =>
    //lowercase for type safety.
    pokemon.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // page count logic, consulted from stackoverflow
  const pageCount = Math.floor(filteredPokedex.length / itemsPerPage);


  //function(event: React.ChangeEvent, page: number) => void
  const handlePageChange = (e,p ) => {
    setCurrentPage(p);
  };

  // we get the first and last index of the array and then finally we slice it to display the current items of the current page.

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
      </div>
    </div>
  );
}

export default App;
