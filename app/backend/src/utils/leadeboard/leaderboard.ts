import Match from '../../database/models/Match.model';
import Team from '../../database/models/Team.model';
import ITeamLeaderboard from '../../interfaces/ITeamLeaderboard';
import teamHomeLeadeboard from './home.leaderboard';
import teamAwayLeadeboard from './away.leaderboard';

const typeTeam: ITeamLeaderboard = {
  name: '',
  totalPoints: 0,
  totalGames: 0,
  totalVictories: 0,
  totalDraws: 0,
  totalLosses: 0,
  goalsFavor: 0,
  goalsOwn: 0,
  goalsBalance: 0,
  efficiency: 0,
};

export function teamData(team: Team, matches: Match[], teamType: string): ITeamLeaderboard {
  const teamPropertyData = JSON.parse(JSON.stringify(typeTeam));
  teamPropertyData.name = team.teamName;

  matches.forEach((match) => {
    const { homeTeamId, awayTeamId } = match;

    if (teamType === 'homeTeam' && homeTeamId === team.id) {
      teamHomeLeadeboard(teamPropertyData, match);
    }

    if (teamType === 'awayTeam' && awayTeamId === team.id) {
      teamAwayLeadeboard(teamPropertyData, match);
    }
  });

  return teamPropertyData;
}

export function sortWithLeaderboardRules(leaderboard: ITeamLeaderboard[]) {
  const sortedLeadeboard = leaderboard.sort((a, b) => b.totalPoints - a.totalPoints
    || b.totalVictories - a.totalVictories
    || b.goalsBalance - a.goalsBalance
    || b.goalsFavor - a.goalsFavor);
  return sortedLeadeboard;
}
