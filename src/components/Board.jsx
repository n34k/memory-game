import "../styles/Board.css"
import { useState } from 'react';
import PropTypes from 'prop-types';
import Card from './Card';

function Board({updateCurrScore, updateHighScore}) {
    const [pokemonList, setPokemonList] = useState([
        'gliscor', 'jolteon', 'mawile', 'gyarados', 'charizard', 'metagross', 'gengar', 'lucario',
        'dragonite', 'salamence', 'groudon', 'greninja', 'tyranitar', 'blaziken', 'zapdos', 'mewtwo'
    ]);

    const [chosenList, setChosenList] = useState([]);

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
        } else {
            setChosenList([...chosenList, pokemon]);
            updateCurrScore(true);
            updateHighScore();
        }
        if (chosenList.length == 16) {
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
    pokemonList: PropTypes.arrayOf(PropTypes.string),
    updateCurrScore: PropTypes.func.isRequired,
    updateHighScore: PropTypes.func.isRequired,
}

export default Board;
