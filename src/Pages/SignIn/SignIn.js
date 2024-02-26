import { AnimatePresence, motion } from 'framer-motion'
import React, { useContext, useState } from 'react'
import Styles from './SignIn.module.css'
import { IconButton, InputAdornment, TextField } from '@mui/material'
import NoEye from '../../Components/SVG/NoEye'
import Eye from '../../Components/SVG/Eye'
import ShootingStar from '../../Components/SVG/ShootingStar'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import axiosInstance from '../../Utils/AxiosInstance'
import { AuthContext } from '../../Context/AuthContext'

export default function SignIn() {
  const { fetchUserData } = useContext(AuthContext);


    const [formData, setFormData] = useState({
        email: "",
        password: ""
    })

    const [showPassword, setShowPassword] = useState(false);
    const [errorEmail, setErrorEmail] = useState(false);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const isValidEmail = (email)=> {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    const handleSubmit = async () =>{
        setErrorEmail(false);
        if(!isValidEmail(formData.email)){
            setErrorEmail(true);
        } else {
            console.log("sign in data: ", formData.email, formData.password);
            console.log( `${process.env.REACT_APP_BACKEND_ENDPOINT}user/sign-in`);
            try{
                setError(false);
                setLoading(true);
                await axiosInstance.post("user/sign-in", {email: formData.email, password: formData.password});
                await fetchUserData();
            } catch (error){
                console.log("error");
                setError(true);
    
            } finally {
                setLoading(false);
                navigate('/home');
              }
        }
    }
  return (
    <main className={Styles.signInMain}>
        <AnimatePresence>
                    
            <motion.article
                className={Styles.signInContainer}
                key="div1"
                initial={{ x: '50%'}}
                animate={{ x: 0 }}
                transition={{ duration: 0.7 }}
            >
                            
                <section className={Styles.signInTopSection}>
                    <ShootingStar/>
                    <h1>Welcome Back!</h1>
                    <p>Sign in to your account and unlock a universe of polls. Don't miss out on exclusive content, personalized experiences, and more.</p>
                </section>
                <form
                key="signInForm"
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '-100%' }}
                transition={{ duration: 0.5 }}
                onSubmit={handleSubmit}
                className={Styles.signInForm}
                >
                    <TextField 
                        id="outlined-basic" 
                        name="email" 
                        label="Email" 
                        variant="outlined" 
                        placeholder='johndoe@gmail.com'
                        value={formData.email}
                        onChange={handleInputChange}
                        error= {errorEmail}
                    />
                    <TextField
                        type={showPassword ? 'text' : 'password'}
                        value={formData.password}
                        onChange={handleInputChange}
                        label="Password"
                        name="password"
                        InputProps={{
                            endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                onClick={()=>setShowPassword(!showPassword)}
                                onMouseDown={(e) => e.preventDefault()} // Prevents focus moving out of the input
                                edge="end"
                                >
                                {showPassword ? <NoEye size={30}/> : <Eye size={30}/>}
                                </IconButton>
                            </InputAdornment>
                            ),
                        }}
                    />
                    <section className={Styles.signInLinks}>
                        <Link to={"/sign-up"}>Create Account</Link>
                        <Link to={"/forgot-password"}>Forgot Password</Link>
                    </section>
                </form>
                <button onClick={handleSubmit}>Sign In</button>
            </motion.article>
                
        </AnimatePresence>
    </main>
  )
}
