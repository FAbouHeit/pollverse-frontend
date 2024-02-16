import React from 'react'
import Logo from '../../Components/SVG/Logo'
import Styles from './WelcomeHeader.module.css'

export default function WelcomeHeader() {
  return (
    <header className={Styles.welcomeHeader}>
        <Logo/>
        <nav className={Styles.welcomeNav}>
            <button className={Styles.welcomeSignIn}>Sign In</button>
            <button className={Styles.welcomeSignUp}>Sign Up</button>
        </nav>
    </header>
  )
}
