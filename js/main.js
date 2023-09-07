const PokemonName = document.querySelector('.pokemon__name')
const PokemonOrder = document.querySelector('.pokemon__number')
const PokemonSprites = document.querySelector('.pokemon__image')

const inputSearch = document.querySelector('.input__search')
const form = document.querySelector(".form")

const btnPrev = document.querySelector('.btn-prev')
const btnNext = document.querySelector('.btn-next')

let searchPokemon = 1

// Fecth Pokemon
const fecthPokemon = async (pokemon) => {
    // Promise
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
    // data.status == 200
    if(APIResponse.status === 200) {
      // Json
      const data = await APIResponse.json();
      return data;
    }      
}

// Render Pokemon 
const renderPokemon = async (pokemon) => {

    PokemonName.innerHTML = `Loading...`
    PokemonOrder.innerHTML = `` 

    const data = await fecthPokemon(pokemon)

    if(data) {
      PokemonName.innerHTML = data.name
      PokemonOrder.innerHTML = data.id
      PokemonSprites.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
      
      inputSearch.value = '';
      searchPokemon = data.id 
    } else {
      PokemonName.innerHTML = `not fould :(`
      PokemonOrder.innerHTML = ``
      PokemonSprites.style.display = `none`
    }
}

// Event form
form.addEventListener('submit', (event) => {
  event.preventDefault()
  renderPokemon(inputSearch.value.toLowerCase())
})

// Event buttons next & prev
btnPrev.addEventListener(`click`, (event) => {
  if(searchPokemon > 1) {
    searchPokemon -= 1 
    renderPokemon(searchPokemon)
  }
}) 
btnNext.addEventListener(`click`, (event) => {
 searchPokemon += 1
 renderPokemon(searchPokemon)
})


// Render First Pokemon
renderPokemon(searchPokemon) 