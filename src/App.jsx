import { useEffect, useRef, useState } from 'react';
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
    randomizedArr.push(...arr.splice(index, 1));
  };

  return randomizedArr;
};

const App = () => {
  const [pokemons, setPokemons] = useState([]);
  const [record, setRecord] = useState({ score: 0, bestScore: 0, selections: {} });
  const originalRef = useRef([]);

  const handleClick = (name) => {
    setRecord((prev => {
      if (prev.selections[name]) return { score: 0, bestScore: prev.bestScore, selections: {} };
      const score = ++prev.score;
      return { score, bestScore: Math.max(score, prev.bestScore), selections: { ...prev.selections, [name]: true } };
    }));
  };

  useEffect(() => {
    fetchCards(key, handleClick).then(pokemons => {
      const randomized = randomizeArr(pokemons);
      originalRef.current = randomized;
      setPokemons(randomized);
    });
  }, []);

  useEffect(() => {
    originalRef.current.length > 0 && setPokemons(randomizeArr([...originalRef.current]))
  }, [record.score]);

  return (
    <div id='main'>
      <div className='container'>
        <h1 id='game-name' className='header'>Pokemon Memory Game</h1>
        <div className='info-container'>
          <i id='info-icon' className='fa-solid fa-circle-info' />
          <div id='info-text'>
            Select each pokemon only once by clicking on a card until you've selected all the pokemons.
          </div>
        </div>
      </div>
      <div id="score-board">
        <h3 className='score'>
          Score: {record.score}
        </h3>
        <h3 className='score'>
          Best Score: {record.bestScore}
        </h3>
      </div>

      <div id='game-board'>
        {pokemons}
      </div>
    </div>
  );
};

export default App
