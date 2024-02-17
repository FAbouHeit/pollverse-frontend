import { AnimatePresence, motion } from 'framer-motion'
import React, { useState } from 'react'
import Styles from './ForgotPassword.module.css'
import { TextField } from '@mui/material'
import Password from '../../Components/SVG/Password'

export default function ForgotPassword() {

    const [email, setEmail] = useState("");
    const [errorEmail, setErrorEmail] = useState(false);

    const isValidEmail = (email)=> {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    const handleSubmit = () =>{
        setErrorEmail(false);
        if(!isValidEmail(email)){
            setErrorEmail(true);
        } else {
            console.log("formdata: ", email);
        }
    }
  return (
    <main className={Styles.forgotPasswordMain}>
        <AnimatePresence>
            <motion.article
                className={Styles.forgotPasswordContainer}
                key="div1"
                initial={{ x: '50%'}}
                animate={{ x: 0 }}
                transition={{ duration: 0.7 }}
            >
                            
                <section className={Styles.forgotPasswordTopSection}>
                    <Password/>
                    <h1>Recover Your Account</h1>
                    <p>Enter your email then check your inbox for a reset password link. Double check the spam in case it ended up there! if the issue persists contact us after trying again.</p>
                </section>
                <form
                key="forgotPasswordForm"
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                transition={{ duration: 0.5 }}
                onSubmit={handleSubmit}
                className={Styles.forgotPasswordForm}
                >
                    <p>Enter the email for the account you’re trying to recover: </p>
                    <TextField 
                        id="outlined-basic" 
                        name="email" 
                        label="Email" 
                        variant="outlined" 
                        placeholder='your email'
                        value={email}
                        onChange={(e)=>setEmail(e.target.value)}
                        error= {errorEmail}
                    />
                    
                </form>
                <button onClick={handleSubmit}>Recover Account</button>
            </motion.article>
                
        </AnimatePresence>
    </main>
  )
}
