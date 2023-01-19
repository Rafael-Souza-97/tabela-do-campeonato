import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { requestData } from '../services/requests';
import Loading from './Loading';
import { check, editIcon } from '../images';

const GamesTable = ({ currentFilter, isAdm }) => {
  const [games, setGames] = useState([]);

  const navigate = useNavigate();

  const getGames = (endpoint) => requestData(endpoint)
    .then((response) => setGames(response))
    .catch((error) => console.log(error));

  useEffect(() => {
    const endpoint = '/matches';

    switch (currentFilter) {
    case 'Em andamento':
      getGames(`${endpoint}?inProgress=true`);
      break;
    case 'Finalizado':
      getGames(`${endpoint}?inProgress=false`);
      break;
    default:
      getGames(endpoint);
      break;
    }
  }, [currentFilter]);

  useEffect(() => {
    const endpoint = '/matches';

    if (!games.length) {
      getGames(endpoint);
    }
  }, [games]);

  if (!games.length) {
    return (<Loading />);
  }

  return (
    <table className="games-table">
      <thead>
        <tr>
          <th className="games-table-thead-home-team">Time Mandante</th>
          <th className="games-table-thead-goals">Gols</th>
          <th className="games-table-thead-versus">{ ' ' }</th>
          <th className="games-table-thead-goals">Gols</th>
          <th className="games-table-thead-away-team">Time Visitante</th>
          <th className="games-table-thead-empty-space">{ ' ' }</th>
          <th className="games-table-thead-status">Status</th>
        </tr>
      </thead>
      <tbody>
        {
          games
            .sort((a, b) => b.inProgress - a.inProgress)
            .map(({
              id,
              homeTeam,
              homeTeamGoals,
              awayTeam,
              awayTeamGoals,
              inProgress,
            }) => (
              <tr key={ id }>
                <td
                  className="games-table-tbody-home-team"
                  data-testid={ `matches__home_team_${id}` }
                >
                  { homeTeam.teamName }
                </td>
                <td
                  className="games-table-tbody-home-team-goals"
                  data-testid={ `matches__home_team_goals_${id}` }
                >
                  { homeTeamGoals }
                </td>
                <td className="games-table-tbody-versus">X</td>
                <td
                  className="games-table-tbody-away-team-goals"
                  data-testid={ `matches__away_team_goals_${id}` }
                >
                  { awayTeamGoals }
                </td>
                <td
                  className="games-table-tbody-away-team"
                  data-testid={ `matches__away_team_${id}` }
                >
                  { awayTeam.teamName }
                </td>
                <td className="games-table-tbody-empty-space">{ ' ' }</td>
                <td className="games-table-tbody-status">
                  <div>
                    {
                      (inProgress)
                        ? (
                          <p
                            className="game-status in-progress"
                            data-testid={ `matches__match_status_${id}` }
                          >
                            Em andamento
                          </p>
                        )
                        : (
                          <p
                            className="game-status finished-game"
                            data-testid={ `matches__match_status_${id}` }
                          >
                            Finalizado
                          </p>
                        )
                    }
                  </div>
                  {
                    (isAdm)
                      ? (
                        <button
                          type="button"
                          data-testid={ `matches__match_status_btn_${id}` }
                          disabled={ !inProgress }
                          onClick={ () => {
                            navigate(
                              '/matches/settings',
                              { state: {
                                id,
                                homeTeam,
                                homeTeamGoals,
                                awayTeam,
                                awayTeamGoals,
                                inProgress,
                              } },
                            );
                            localStorage.setItem('game', 'editar');
                          } }
                        >
                          {
                            (inProgress)
                              ? <img src={ editIcon } alt="Jogo em andamento" />
                              : <img src={ check } alt="Jogo finalizado" />
                          }
                        </button>
                      )
                      : null
                  }
                </td>
              </tr>
            ))
        }
      </tbody>
    </table>
  );
};

GamesTable.propTypes = {
  currentFilter: PropTypes.string.isRequired,
  isAdm: PropTypes.bool.isRequired,
};

export default GamesTable;
