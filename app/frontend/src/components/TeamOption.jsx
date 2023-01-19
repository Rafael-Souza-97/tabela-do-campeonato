import React from 'react';
import PropTypes from 'prop-types';

const TeamOption = ({ teams, homeTeam, getTeam, testId }) => (
  <label htmlFor={ (homeTeam) ? 'home-team-scoreboard' : 'away-team-scoreboard' }>
    { (homeTeam) ? <p>Time Mandante</p> : <p>Time Visitante</p> }
    <select
      data-testid={ testId }
      onChange={ ({ target: { value } }) => {
        const homeOrAway = (homeTeam) ? 'homeTeam' : 'awayTeam';
        getTeam(value, homeOrAway);
      } }
    >
      {
        teams.map(({ teamName }, index) => (
          <option key={ index } value={ teamName }>{ teamName }</option>
        ))
      }
    </select>
  </label>
);

TeamOption.propTypes = {
  teams: PropTypes.arrayOf(PropTypes.object).isRequired,
  homeTeam: PropTypes.bool.isRequired,
  getTeam: PropTypes.func.isRequired,
  testId: PropTypes.string.isRequired,
};

export default TeamOption;
