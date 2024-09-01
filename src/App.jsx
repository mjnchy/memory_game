import { useEffect, useState } from 'react';
import Card from './components/Card';
import "./index.css";

const limit = 15;
const key = `https://pokeapi.co/api/v2/pokemon?offset=0&limit=${limit}`;
const fetchData = async (api) => {
  return await fetch(api).then(response => response.json())
    .then(data => data);
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
    fetchData(key).then(data => data.results.map(pokemon =>
      fetchData(pokemon.url).then(obj =>
        setPokemons(prev => [...prev,
        <Card content={[pokemon.name, obj.sprites.front_default]}
          onclick={handleClick}
          key={pokemon.name}
        />]))))
  }, []);

  return (
    <div id='main'>
      {pokemons}
      Score: {record.score}
    </div>
  );
};

export default App
