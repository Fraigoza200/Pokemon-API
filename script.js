const pokedex = document.getElementById('pokedex')
console.log(pokedex)

const fetchPokemon = () => {
  const promises = [];
  for (let i = 1; i < 151; i++) {
    const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
    promises.push(fetch(url).then((res) =>  res.json()));
  }
  Promise.all(promises).then((results) => {
    const pokemon = results.map((data) => ({
      name: data.name,
      id: data.id,
      image: data.sprites['front_default'],
      type: data.types.map((type) => type.type.name).join(', '),
    }));
    showPokemon(pokemon)
  });
};
const showPokemon = (pokemon) => {
  const pokemonString = pokemon.map(pokeChar => `
    <li class="card"> 
      <img class="card-img" src=${pokeChar.image} alt="" />
      <h2 class="card-heading">${pokeChar.id}. ${pokeChar.name}</h2>
      <p class="card-subheading">Type: ${pokeChar.type}</p>
    </li>
  `).join('')
  pokedex.innerHTML = pokemonString
}
fetchPokemon();
