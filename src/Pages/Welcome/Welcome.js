import React from 'react'
import ParticlesContainer from '../../Components/Particles/ParticlesContainer'
import Styles from './Welcome.module.css'
import Logo from '../../Components/SVG/Logo'
import { useNavigate } from "react-router-dom";

export default function Welcome() {
  const navigate = useNavigate();

  const handleCreateAccount = () =>{
    navigate('/sign-up')
  }
  return (
    <main>
        <ParticlesContainer />
        <section className={Styles.signinCard }>
            <h1>Sign Up Now And Create Your First Community Poll.</h1>
            <p><Logo size={210}/> is free!</p>            
            <button className={Styles.createAccount} onClick={handleCreateAccount}>Create Account</button>
        </section>
    </main>
  )
}
