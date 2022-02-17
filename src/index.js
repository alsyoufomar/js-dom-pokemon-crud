const pokeForm = document.querySelector(".poke-form");
const pokeList = document.querySelector(".poke-list");

function addPokemon (pokemon) {
  const liEl = document.createElement("li");
  const imgEl = document.createElement("img");
  const h2El = document.createElement("h2");
  const container = document.createElement("div");
  const likeBtn = document.createElement("button")
  const delBtn = document.createElement("button")
  const likes = document.createElement("spin")

  likes.innerText = pokemon.likes
  likeBtn.classList.add("btn", "likeBtn")
  likeBtn.innerText = "like"
  delBtn.innerText = "Delete"
  delBtn.classList.add("btn", "delBbtn")
  container.classList.add("container")

  likeBtn.addEventListener("click", () => {
    fetch("http://localhost:3000/pokemons/" + pokemon.id, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        likes: (pokemon.likes + 1)
      })
    }).then(res => res.json())
    // .then(pokemon => addPokemon(pokemon));

  })

  delBtn.addEventListener("click", () => {
    fetch("http://localhost:3000/pokemons/" + pokemon.id, {
      method: "DELETE"
    })

  })

  container.append(likeBtn, likes, delBtn)
  liEl.classList.add("pokemon");
  imgEl.src = pokemon.image;

  h2El.innerText = pokemon.name;

  liEl.append(imgEl, h2El, container);
  pokeList.append(liEl);
}

function addPokemons (pokemons) {
  pokemons.forEach(pokemon => addPokemon(pokemon))
}

function listenToAddPokemonForm () {
  pokeForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const pokemon = {
      name: pokeForm.name.value,
      image: pokeForm.image.value,
      likes: 0
    };

    // CREATE
    fetch("http://localhost:3000/pokemons", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(pokemon)
    })
      .then(res => res.json())
      .then(pokemon => addPokemon(pokemon));
  });

  pokeForm.reset();
}

function init () {
  listenToAddPokemonForm();

  // READ
  fetch("http://localhost:3000/pokemons")
    .then(res => res.json())
    .then(pokemons => addPokemons(pokemons));
}

init();
