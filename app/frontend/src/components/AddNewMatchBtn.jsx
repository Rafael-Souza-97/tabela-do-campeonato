import React from 'react';
import { Link } from 'react-router-dom';

const AddNewMatchBtn = () => (
  <div>
    <Link
      className="add-new-game-button"
      data-testid="header__add_match_btn"
      to="/matches/settings"
    >
      + Adicionar nova partida
    </Link>
  </div>
);

export default AddNewMatchBtn;
