import '../styles/Scoreboard.css'
import PropTypes from 'prop-types';

function Scoreboard({currScore, highScore}) {

    return (
        <div className='scoreboard'>
            <h4>High Score: {highScore}</h4>
            <h4>Current Score: {currScore}</h4>
        </div>
    )
}

Scoreboard.propTypes = {
    currScore: PropTypes.number,
    highScore: PropTypes.number
}

export default Scoreboard;