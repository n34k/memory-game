import "../styles/Board.css";
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Card from './Card';
import axios from 'axios';

function Board({ updateCurrScore, updateHighScore }) {
    const [pokemonList, setPokemonList] = useState([]);
    const [chosenList, setChosenList] = useState([]);

    useEffect(() => {
        fetchRandomPokemonNames();
    }, []);

    const fetchRandomPokemonNames = async () => {
        try {
            const promises = [];
            const maxPokemon = 809; 

            for (let i = 0; i < 16; i++) {
                const randomId = Math.floor(Math.random() * maxPokemon) + 1;
                promises.push(axios.get(`https://pokeapi.co/api/v2/pokemon/${randomId}`));
            }

            const responses = await Promise.all(promises);
            const newPokemonList = responses.map(response => response.data.name);
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
            console.log("You Lose");
            fetchRandomPokemonNames(); // Reset the game with new random Pokémon names
        } else {
            setChosenList([...chosenList, pokemon]);
            updateCurrScore(true);
            updateHighScore();
        }
        if (chosenList.length === 16) {
            console.log("You win");
        }

        setPokemonList(shuffleList());
    }

    return (
        <div className='board'>
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
