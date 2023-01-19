import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import Header from '../components/Header';
import LeaderboardBtn from '../components/LeaderboardBtn';
import MatchesBtn from '../components/MatchesBtn';
import { requestLogin, setToken, requestData } from '../services/requests';
import { positiveLogo } from '../images';
import '../styles/pages/login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogged, setIsLogged] = useState(false);
  const [failedTryLogin, setFailedTryLogin] = useState(false);

  const login = async (event) => {
    event.preventDefault();

    try {
      const { token } = await requestLogin('/login', { email, password });

      setToken(token);

      const { role } = await requestData('/login/validate', { email, password });

      localStorage.setItem('token',  token);
      localStorage.setItem('role',  role);

      setIsLogged(true);
    } catch (error) {
      setFailedTryLogin(true);
      setIsLogged(false);
    }
  };

  useEffect(() => {
    setFailedTryLogin(false);
  }, [email, password]);

  if (isLogged) return <Navigate to="/matches" />;

  return (
    <>
      <Header
        page="LOGIN"
        FirstNavigationLink={ LeaderboardBtn }
        SecondNavegationLink={ MatchesBtn }
      />
      <section className="user-login-area">
        <img src={ positiveLogo } alt="Trybe Futebol Clube Negative Logo" />
        <form>
          <h1>Área do usuário</h1>
          <label htmlFor="email-input">
            <input
              className="login__login_input"
              type="text"
              value={ email }
              onChange={ ({ target: { value } }) => setEmail(value) }
              data-testid="login__login_input"
              placeholder="Login"
            />
          </label>
          <label htmlFor="password-input">
            <input
              type="password"
              value={ password }
              onChange={ ({ target: { value } }) => setPassword(value) }
              data-testid="login__password_input"
              placeholder="Senha"
            />
          </label>
          {
            (failedTryLogin)
              ? (
                <p data-testid="login__input_invalid_login_alert">
                  {
                    `O endereço de e-mail ou a senha não estão corretos.
                    Por favor, tente novamente.`
                  }
                </p>
              )
              : null
          }
          <button
            data-testid="login__login_btn"
            type="submit"
            onClick={ (event) => login(event) }
          >
            Entrar
          </button>
        </form>
      </section>
    </>
  );
};

export default Login;
