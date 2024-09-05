import { useEffect, useState } from 'react';
import Card from './components/Card';
import "./index.css";

const limit = 15;
const key = `https://pokeapi.co/api/v2/pokemon?offset=0&limit=${limit}`;
const fetchCards = async (api, onClick) => {
  const response = await fetch(api);
  const data = await response.json();
  const pokemonData = await Promise.all(data.results.map(async pokemon => {
    const url = await fetch(pokemon.url);
    const json = await url.json();

    return <Card
      content={[pokemon.name, json.sprites.front_default]}
      key={pokemon.name}
      onclick={onClick}
    />
  }))


  return pokemonData;
};

const randomizeArr = (arr) => {
  const randomizedArr = [];

  while (arr.length) {
    const index = Math.floor(Math.random() * arr.length);
    randomizedArr.push(...arr.splice(index));
  };

  return randomizedArr;
};

const App = () => {
  const [pokemons, setPokemons] = useState([]);
  const [record, setRecord] = useState({ score: 0, selections: {} });

  const handleClick = (name) => {
    setRecord((prev => {
      if (prev.selections[name]) return { score: 0, selections: {} };
      return { score: ++prev.score, selections: { ...prev.selections, [name]: true } };
    }));
  };

  useEffect(() => {
    fetchCards(key, handleClick).then(pokemons => setPokemons(randomizeArr(pokemons)));
  }, []);

  return (
    <div id='main'>
      {pokemons}
      Score: {record.score}
    </div>
  );
};

async () => {

  for (let i = 0; i < data.results.length; i++) {
    const pokemon = data.results[i];
    const response = await fetch(pokemon.url);
    const obj = await response.json()
    const img = await obj.sprites.front_default;

    arr.push(<Card content={[pokemon.name, img]} key={pokemon.name} onclick={onClick} />);
  };
}

async (api) => {
  const response = await fetch(api);
  const data = await response.json();
  const objArr = data.results.map(obj => fetch(obj.url));
  console.log(objArr)

};


export default App
