import "../styles/Board.css";
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Card from './Card';
import axios from 'axios';

function Board({ updateCurrScore, updateHighScore }) {
    const [pokemonList, setPokemonList] = useState([]);
    const [chosenList, setChosenList] = useState([]);
    const [gameOver, setGameOver] = useState(false);
    const [win, setWin] = useState(false);

    useEffect(() => {
        fetchRandomPokemonNames();
    }, []);

    const fetchRandomPokemonNames = async () => {
        try {
            const promises = [];
            const maxPokemon = 809;
            const selectedIds = new Set();
    
            for (let i = 0; i < 16; i++) {
                let randomId;
    
                // Generate a unique random ID
                do {
                    randomId = Math.floor(Math.random() * maxPokemon) + 1;
                } while (selectedIds.has(randomId));
    
                selectedIds.add(randomId);
                promises.push(axios.get(`https://pokeapi.co/api/v2/pokemon/${randomId}`));
            }
    
            const responses = await Promise.all(promises);
            const newPokemonList = responses.map(response => response.data.name);
            setGameOver(false);
            setPokemonList(newPokemonList);
        } catch (error) {
            console.error("Error fetching Pokémon names:", error);
        }
    };
    

    const inArray = (pokemon) => {
        return chosenList.includes(pokemon);
    }

    const shuffleList = () => {
        let shuffledList = pokemonList.slice(); // Create a copy of the array
        for (let i = shuffledList.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffledList[i], shuffledList[j]] = [shuffledList[j], shuffledList[i]]; // Swap elements
        }
        return shuffledList;
    }

    const onClick = (pokemon) => {
        if (inArray(pokemon)) {
            setChosenList([]);
            updateCurrScore(false);
            setWin(false);
            setGameOver(true);
        } 
        else {
            setChosenList([...chosenList, pokemon]);
            updateCurrScore(true);
            updateHighScore();
        }
        if (chosenList.length === 15) {
            setChosenList([]);
            updateCurrScore(false);
            setWin(true);
            setGameOver(true);
        }

        setPokemonList(shuffleList());
    }

    return (
        <div className='board'>
            {gameOver ? <div className="endScreen"> 
                            <div className="modal">
                                {!win ?
                                <div className="modalTop">
                                    <img className="sprite" src="src/assets/magikarp.gif" alt="magikarp"/>
                                    <h1>Game Over</h1>
                                    <img className="sprite" src="src/assets/magikarp.gif" alt="magikarp"/>
                                </div> :
                                <div className="modalTop">
                                    <img className="sprite" src="src/assets/victini.gif" alt="victini"/>
                                    <h1>You Win!</h1>
                                    <img className="sprite" src="src/assets/celebi.gif" alt="celebi"/>
                                </div>}
                                <button onClick={fetchRandomPokemonNames}>New Game</button>
                            </div>
                        </div> : ''}
            {pokemonList.map((pokemon, index) => (
                <Card key={index} pokemonName={pokemon} onClick={() => onClick(pokemon)} />
            ))}
        </div>
    );
}

Board.propTypes = {
    updateCurrScore: PropTypes.func.isRequired,
    updateHighScore: PropTypes.func.isRequired,
}

export default Board;
