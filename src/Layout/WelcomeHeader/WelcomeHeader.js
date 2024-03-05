import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import Logo from '../../Components/SVG/Logo'
import Styles from './WelcomeHeader.module.css'

export default function WelcomeHeader() {
  const navigate = useNavigate();
  const location = useLocation();
  const isSignInPage = location.pathname === '/sign-in';
  const isWelcome = location.pathname === '/';

  const navigateToSignIn = () => {
    navigate('/sign-in');
  };

  const navigateToSignUp = () => {
    navigate('/sign-up');
  };

  return (
    <header className={Styles.welcomeHeader}>
        <Logo/>
        <nav className={Styles.welcomeNav}>
            {isWelcome ? (
              <>
                <button onClick={navigateToSignIn} className={Styles.welcomeSignIn}>Sign In</button>
                <button onClick={navigateToSignUp} className={Styles.welcomeSignUp}>Sign Up</button>
              </>
              ) : isSignInPage ? (
                <button onClick={navigateToSignUp} className={Styles.welcomeSignUp}>Sign Up</button>
              )
              :
              <button onClick={navigateToSignIn} className={Styles.welcomeSignIn}>Sign In</button>
            }
        </nav>
    </header>
  )
}
