import React, { useState } from 'react';
import PropTypes from 'prop-types';

import TeamOption from './TeamOption';
import Scoreboard from './Scoreboard';

const EditGame = ({
  homeTeam,
  awayTeam,
  homeTeamGoals,
  awayTeamGoals,
  idMatch,
  updateMatch,
  finishMatch,
  getTeam,
}) => {
  const [currentHomeTeamGoals, setHomeTeamGoals] = useState(homeTeamGoals);
  const [currentAwayTeamGoals, setAwayTeamGoals] = useState(awayTeamGoals);
  return (
    <section className="match-settings-section">
      <form className="match-settings-form">
        <div className="match-settings-form-options">
          <TeamOption
            testId="insertion_matches__select_home_team"
            teams={ homeTeam }
            homeTeam
            getTeam={ getTeam }
          />
          <Scoreboard
            testId="insertion_matches__select_quantity_goals_home_team"
            homeTeam
            score={ currentHomeTeamGoals }
            setScore={ setHomeTeamGoals }
            qtyGoal={ homeTeamGoals }
          />
          <div className="match-settings-form-versus">
            <span />
            <span>X</span>
          </div>
          <Scoreboard
            testId="insertion_matches__select_quantity_goals_away_team"
            homeTeam={ false }
            score={ currentAwayTeamGoals }
            setScore={ setAwayTeamGoals }
            qtyGoal={ awayTeamGoals }
          />
          <TeamOption
            testId="insertion_matches__select_away_team"
            teams={ awayTeam }
            homeTeam={ false }
            getTeam={ getTeam }
          />
        </div>
        <div className="match-settings-form-buttons">
          <button
            data-testid="insertion_matches__edit_match_btn"
            onClick={ () => updateMatch(idMatch,
              {
                homeTeamGoals: currentHomeTeamGoals,
                awayTeamGoals: currentAwayTeamGoals,
              }) }
            type="button"
          >
            Editar

          </button>
          <button
            data-testid="insertion_matches__finish_match_btn"
            onClick={ () => finishMatch(idMatch) }
            type="button"
          >
            Finalizar

          </button>
        </div>
      </form>
    </section>
  );
};

EditGame.propTypes = ({
  homeTeam: PropTypes.any,
  awayTeam: PropTypes.any,
  homeTeamGoals: PropTypes.any,
  awayTeamGoals: PropTypes.any,
  idMatch: PropTypes.any,
  getTeam: PropTypes.any,
  finishMatc: PropTypes.any,
  updateMatch: PropTypes.any,
}).isRequired;

export default EditGame;
