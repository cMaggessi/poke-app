async function fetchData(apiUrl) {
  const response = await fetch(apiUrl);
  const responseJSON = await response.json();

  const pokemonDetails = responseJSON.map(async (pokemon) => {
    const pokemonResponse = await fetch(pokemon.url);
    const pokemonData = await pokemonResponse.json();

    // console.log(pokemonData);

    const pokemonName = pokemonData.name;
    const pokemonImage = pokemonData.sprites.front_default;

    return { id: pokemonData.id, name: pokemonName, image: pokemonImage, abilities: pokemonData.abilities };
  });

  return Promise.all(pokemonDetails);
}

export default fetchData;
