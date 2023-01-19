import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { requestData } from '../services/requests';
import Loading from './Loading';
import { v4 as uuidv4 } from 'uuid';
import '../styles/components/leaderboardTable.css';

const LeaderboardTable = ({ currentFilter }) => {
  const [leaderboard, setLeaderboard] = useState([]);

  const getLeaderboard = (endpoint) => requestData(endpoint)
    .then((response) => setLeaderboard(response))
    .catch((error) => console.log(error));

  useEffect(() => {
    const apiLeaderboard = '/leaderboard';
    const apiLeaderboardHome = '/leaderboard/home';
    const apiLeaderboardAway = '/leaderboard/away';
    switch (currentFilter) {
    case 'Classificação Mandantes':
      getLeaderboard(apiLeaderboardHome);
      break;
    case 'Classificação Visitantes':
      getLeaderboard(apiLeaderboardAway);
      break;
    default:
      getLeaderboard(apiLeaderboard);
      break;
    }
  }, [currentFilter]);

  useEffect(() => {
    const endpoint = '/leaderboard';

    if (leaderboard.length === 0) {
      getLeaderboard(endpoint);
    }
  }, [leaderboard]);

  if (!leaderboard.length) {
    return (<Loading />);
  }

  return (
    <section className="score-board-table-section">
      <table className="score-board-table">
        <thead>
          <tr>
            <th data-testid="score_boarding__classification">Classificação</th>
            <th data-testid="score_boarding__team_name">Time</th>
            <th data-testid="score_boarding__total_points">P</th>
            <th data-testid="score_boarding__total_games">J</th>
            <th data-testid="score_boarding__total_victories">V</th>
            <th data-testid="score_boarding__total_draws">E</th>
            <th data-testid="score_boarding__total_looses">D</th>
            <th data-testid="score_boarding__goals_favor">GP</th>
            <th data-testid="score_boarding__goals_own">GC</th>
            <th data-testid="score_boarding__goals_balance">SG</th>
            <th data-testid="score_boarding__efficiency">%</th>
          </tr>
        </thead>
        <tbody>
          {
            leaderboard.map(({
              name,
              totalPoints,
              totalGames,
              totalVictories,
              totalDraws,
              totalLosses,
              goalsFavor,
              goalsOwn,
              goalsBalance,
              efficiency,
            },
            index) => (
              <tr key={ uuidv4() }>
                <td
                  className="score-board-classification"
                  data-testid={ `score_boarding__classification_${index + 1}` }
                >
                  {`${index + 1}`}
                </td>
                <td
                  className="score-board-team-name"
                  data-testid={ `score_boarding__team_name_${index + 1}` }
                >
                  {name}
                </td>
                <td
                  className="score-board-total-points"
                  data-testid={ `score_boarding__total_points_${index + 1}` }
                >
                  { totalPoints }
                </td>
                <td
                  className="score-board-total-games"
                  data-testid={ `score_boarding__total_games_${index + 1}` }
                >
                  { totalGames }
                </td>
                <td
                  className="score-board-total-victories"
                  data-testid={ `score_boarding__total_victories_${index + 1}` }
                >
                  { totalVictories }
                </td>
                <td
                  className="score-board-total-draws"
                  data-testid={ `score_boarding__total_draws_${index + 1}` }
                >
                  { totalDraws }
                </td>
                <td
                  className="score-board-total-looses"
                  data-testid={ `score_boarding__total_looses_${index + 1}` }
                >
                  { totalLosses }
                </td>
                <td
                  className="score-board-goals-favor"
                  data-testid={ `score_boarding__goals_favor_${index + 1}` }
                >
                  { goalsFavor }
                </td>
                <td
                  className="score-board-goals-own"
                  data-testid={ `score_boarding__goals_own_${index + 1}` }
                >
                  { goalsOwn }
                </td>
                <td
                  className="score-board-goals-balance"
                  data-testid={ `score_boarding__goals_balance_${index + 1}` }
                >
                  { goalsBalance }
                </td>
                <td
                  className="score-board-efficiency"
                  data-testid={ `score_boarding__efficiency_${index + 1}` }
                >
                  { efficiency }
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </section>
  );
};

LeaderboardTable.propTypes = {
  currentFilter: PropTypes.string.isRequired,
};
export default LeaderboardTable;
