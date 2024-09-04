import { useEffect, useState } from 'react';
import Card from './components/Card';
import "./index.css";

const limit = 15;
const key = `https://pokeapi.co/api/v2/pokemon?offset=0&limit=${limit}`;
const fetchData = async (api) => {
  const arr = [];
  const response = await fetch(api);
  const data = await response.json();

  for (let i = 0; i < data.results.length; i++) {
    const pokemon = data.results[i];
    const response = await fetch(pokemon.url);
    const obj = await response.json()
    const img = await obj.sprites.front_default;

    arr.push({ name: pokemon.name, img });
  };

  return arr;
};

const App = () => {
  const [pokemons, setPokemons] = useState([]);
  const [record, setRecord] = useState({ score: 0, selections: {} });
  const arr = [];

  const handleClick = (name) => {
    setRecord((prev => {
      if (prev.selections[name]) return { score: 0, selections: {} };
      return { score: ++prev.score, selections: { ...prev.selections, [name]: true } };
    }));
  };

  useEffect(() => {
    fetchData(key).then(pokemons => {
      while (pokemons.length) {
        const index = Math.floor(Math.random() * pokemons.length);
        arr.push(<Card
          content={[pokemons[index].name, pokemons[index].img]}
          key={pokemons[index].name}
          onclick={handleClick}
        />);
        pokemons.splice(index, 1);
      }

      setPokemons(arr);
    })
  }, []);

  return (
    <div id='main'>
      {pokemons}
      Score: {record.score}
    </div>
  );
};


export default App
