const pokemonName = document.querySelector('.pokemonName');
const pokemonNumber = document.querySelector('.pokemonNumber');
const pokemonImage = document.querySelector('.pokemonImage');

const form = document.querySelector('.form');
const input = document.querySelector('.inputSearch');
const buttonPrev = document.querySelector('.btnPrev');
const buttonNext = document.querySelector('.btnNext');


const pokemonSpecies = document.querySelector('.species')
const  pokemonHeight = document.querySelector('.height');
const  pokemonWeight = document.querySelector('.weight')
const  pokemonAbilities = document.querySelector('.abilities')

let pokemonTypes = document.querySelector('#types')
let searchPokemon = 1;

const fetchPokemon = async (pokemon) => {
  const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

  if (APIResponse.status === 200) {
    const data = await APIResponse.json();
    return data;
  }
}

const renderPokemon = async (pokemon) => {

  pokemonName.innerHTML = 'Loading...';
  pokemonNumber.innerHTML = '';

  const data = await fetchPokemon(pokemon);
  if (data) {
    pokemonImage.style.display = 'block';
    pokemonName.innerHTML = data.name;
    pokemonNumber.innerHTML = data.id;
    pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
    input.value = '';
    searchPokemon = data.id;

    pokemonTypes.innerHTML = `<span>Types:</span> ${data.types.map((types) => types.type.name).join(' ')}`
   
    pokemonSpecies.innerHTML = `<span>Species:</span> ${data.species.name}`;
    pokemonHeight.innerHTML =  `<span>Height:</span> ${data.height}m`
    pokemonWeight.innerHTML = `<span>Weight:</span> ${data.weight}kg`
    
    pokemonAbilities.innerHTML = `<span>Abilities:</span> ${data.abilities.map((abilities) => abilities.ability.name).join(' <br> ')}`;
    
  } else {
    pokemonImage.style.display = 'none';
    pokemonName.innerHTML = 'Não Encontrado';
    pokemonNumber.innerHTML = '';
  }
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  renderPokemon(input.value.toLowerCase());
});

buttonPrev.addEventListener('click', () => {
  if (searchPokemon > 1) {
    searchPokemon -= 1;
    renderPokemon(searchPokemon);
  }
});

buttonNext.addEventListener('click', () => {
  searchPokemon += 1;
  renderPokemon(searchPokemon);
});

renderPokemon(searchPokemon);