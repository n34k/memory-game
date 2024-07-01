import { useState, useEffect } from 'react';
import '../styles/Card.css'
import PropTypes from 'prop-types'
import axios from 'axios';


function Card({pokemonName, onClick}) {
    const [pokemonData, setPokemonData] = useState(null);

    const handleClick = () => {
        onClick();
    }

    const capitalize = (pokemonName) => {
        let pName = pokemonName;
        return pName.charAt(0).toUpperCase() + pName.slice(1);
    }

    useEffect(() => {
        const fetchPokemon = async () => {
            try {
                const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
                setPokemonData(response.data)
            } catch (error) {
                console.error('Error fetching data:', error)
            }
        };

        fetchPokemon();
    }, [pokemonName])

    return (
        <div className="card" onClick={handleClick}> 
            <p>{capitalize(pokemonName)}</p>
            <img src={pokemonData && pokemonData.sprites.front_default} alt={pokemonName} />
        </div>
    )
}

Card.propTypes = {
    onClick: PropTypes.func.isRequired,
    pokemonName: PropTypes.string
}

export default Card
