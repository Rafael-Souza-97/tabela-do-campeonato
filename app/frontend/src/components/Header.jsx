import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { negativeLogo, exitToAppImg } from '../images';
import '../styles/components/header.css';

const Header = ({
  page,
  FirstNavigationLink,
  SecondNavegationLink,
  logged,
  setLogin,
}) => {
  const navigate = useNavigate();

  const logoff = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    setLogin(false);
    navigate('/leaderboard');
  };

  return (
    <header className="common-header">
      <div className="image-content">
        <img src={ negativeLogo } alt="Trybe Futebol Clube Negative Logo" />
      </div>
      <h1 data-testid="header__title">{ page }</h1>
      <div className="buttons-content">
        <FirstNavigationLink />
        {
          (logged)
            ? (
              <button type="button" onClick={ () => logoff() }>
                Sair
                <img src={ exitToAppImg } alt="Sair do aplicativo" />
              </button>
            )
            : <SecondNavegationLink />
        }
      </div>
    </header>
  );
};

Header.propTypes = {
  page: PropTypes.string.isRequired,
  FirstNavigationLink: PropTypes.elementType.isRequired,
  SecondNavegationLink: PropTypes.elementType,
  logged: PropTypes.bool,
  setLogin: PropTypes.func,
};

Header.defaultProps = {
  SecondNavegationLink: null,
  logged: undefined,
  setLogin: undefined,
};

export default Header;
