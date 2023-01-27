module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert(
      'teams',
      [
        {
          team_name: 'Athletico PR',
        },
        {
          team_name: 'Bahia',
        },
        {
          team_name: 'Botafogo',
        },
        {
          team_name: 'Palmeiras',
        },
        {
          team_name: 'Cruzeiro',
        },
        {
          team_name: 'Atlético MG',
        },
        {
          team_name: 'Santos',
        },
        {
          team_name: 'Grêmio',
        },
        {
          team_name: 'Internacional',
        },
        {
          team_name: 'RB Bragantino',
        },
        {
          team_name: 'Cuiaba',
        },
        {
          team_name: 'São Paulo',
        },
        {
          team_name: 'Fluminense',
        },
        {
          team_name: 'Flamengo',
        },
        {
          team_name: 'Vasco',
        },
        {
          team_name: 'Corinthians',
        },
        {
          team_name: 'Fortaleza',
        },
        {
          team_name: 'Goiás',
        },
        {
          team_name: 'América MG',
        },
        {
          team_name: 'Coritiba',
        },
      ],
      {},
    );
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('teams', null, {});
  },
};
