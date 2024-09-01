import { useEffect, useState } from 'react';
import Card from './components/Card';

const limit = 15;
const key = `https://pokeapi.co/api/v2/pokemon?offset=0&limit=${limit}`;
const fetchData = async (api) => {
  return await fetch(api).then(response => response.json())
    .then(data => data);
};

const App = () => {
  const [pokemons, setPokemons] = useState([]);

  useEffect(() => {
    fetchData(key).then(data => data.results.map(pokemon =>
      fetchData(pokemon.url).then(obj =>
        setPokemons(prev => [...prev, <Card content={[pokemon.name, obj.sprites.front_default]} key={pokemon.name} />]))))
  }, []);

  return (
    <>{pokemons}</>
  );
};

export default App
