import React, { useState } from 'react'
import Styles from './SignUp.module.css'
import Stars from '../../Components/SVG/Stars'
import { FormControl, IconButton, InputAdornment, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { motion, AnimatePresence } from 'framer-motion';
import Back from '../../Components/SVG/Back';
import Lock from '../../Components/SVG/Lock';
import Eye from '../../Components/SVG/Eye';
import NoEye from '../../Components/SVG/NoEye';
import Captcha from '../../Components/SVG/Captcha';


export default function SignUp() {

    const [isVisible, setIsVisible] = useState(1);
    const [direction, setDirection] = useState(1); // 1 for forward, -1 for backward
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        dateOfBirth: null,
        gender: ''
    });

    const [errorFirstName, setErrorFirstName] = useState(false);
    const [errorLastName, setErrorLastName] = useState(false);
    const [errorEmail, setErrorEmail] = useState(false);
    const [errorDateOfBirth, setErrorDateOfBirth] = useState(false);
    const [errorGender, setErrorGender] = useState(false);
    const [errorPassword, setErrorPassword] = useState(false);

    const [passwords, setPasswords] = useState({
        password: '',
        confirmPassword: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleDateChange = (date) => {
        setFormData(prevState => ({
            ...prevState,
            dateOfBirth: date
        }));
    };

    const handleGenderChange = (e) => {
        setFormData(prevState => ({
            ...prevState,
            gender: e.target.value
        }));
    };

    const isValidPassword = (password) => {
        const hasNumber = /\d/.test(password);
        const hasCapitalLetter = /[A-Z]/.test(password);
        const hasCharacter = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password);
        const isLongEnough = password.length >= 6;
        return hasNumber && hasCapitalLetter && hasCharacter && isLongEnough;
    };

    const isValidEmail = (email)=> {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    function isOver13YearsOld(selectedDate) {
        const currentDate = new Date();
        const selectedDateTime = new Date(selectedDate).getTime();
        const thirteenYearsAgo = new Date(currentDate.getFullYear() - 13, currentDate.getMonth(), currentDate.getDate()).getTime();
        return selectedDateTime <= thirteenYearsAgo;
    }

    const handleContinue = (e) => {
        e.preventDefault();

        setErrorFirstName(false);
        setErrorLastName(false);
        setErrorEmail(false);
        setErrorDateOfBirth(false);
        setErrorGender(false);
        setErrorPassword(false);

        if(isVisible ===1){
            if(
                formData.firstName === "" 
                || formData.lastName === ""
                || formData.email === ""
                || !formData.dateOfBirth
                || formData.gender === ""
                ){
                    if(formData.firstName === "") setErrorFirstName(true)
                    if(formData.lastName === "") setErrorLastName(true)
                    if(formData.email === "" || !isValidEmail(formData.email)) setErrorEmail(true)
                    if(formData.dateOfBirth === null) setErrorDateOfBirth(true)
                    if(formData.gender === "") setErrorGender(true)
                
            } else {
                if(!isValidEmail(formData.email)){
                    setErrorEmail(true)
                } else if(!isOver13YearsOld(formData.dateOfBirth)) {
                    setErrorDateOfBirth(true)
                } else {
                    setPassword("");
                    setConfirmPassword("");
                    setIsVisible((prevState) => prevState + 1);
                    setDirection((prevState)=> prevState+1); // Forward animation
                    console.log(formData)
                }
            }
        } else if(isVisible===2){
            if(password==="" || confirmPassword==="" || !isValidPassword(password)){
                setErrorPassword(true);
            } else if (password !== confirmPassword){
                console.log("pass, conf", password, confirmPassword)
                setErrorPassword(true);
            } else {
                setIsVisible((prevState) => prevState + 1);
                setDirection((prevState)=> prevState+1); // Forward animation
            }

        } else {
                setIsVisible((prevState) => prevState + 1);
                setDirection((prevState)=> prevState+1); // Forward animation
        }
    }

    const handleBackButton = () => {
        setIsVisible((prevState) => prevState - 1);
        setDirection((prevState) => prevState - 1); // Backward animation
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        // Perform password validation here
        if (passwords.password !== passwords.confirmPassword) {
            alert("Passwords do not match!");
            return;
        }
        // Continue with form submission if passwords match
        console.log("Form Data:", formData);
        console.log("Passwords:", passwords);
        // Add your form submission logic here
    };

    const generateCaptcha = () => {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let captcha = '';
        for (let i = 0; i < 6; i++) {
          captcha += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        return captcha;
      };

    const [captcha, setCaptcha] = useState(generateCaptcha());
    const [userInput, setUserInput] = useState('');
    const [isCaptchaValid, setIsCaptchaValid] = useState(1);
  
    const handleChange = (event) => {
      setUserInput(event.target.value);
      setIsCaptchaValid(1);
    };
  
    const handleCaptchaSubmit = (event) => {
      event.preventDefault();
      if (userInput.toLowerCase() === captcha.toLowerCase()) {
        setIsCaptchaValid(2);
      } else {
        setIsCaptchaValid(3);
        setCaptcha(generateCaptcha());
        setUserInput('');
      }
    };



    return (
        <main className={Styles.createAccountMain}>
            <AnimatePresence custom={direction}>
                {isVisible === 1 && (
                    <motion.article
                        className={Styles.createAccountContainer}
                        key="div1"
                        initial={{ x: direction === 1 ? '50%' : '-300%' }}
                        animate={{ x: 0 }}
                        exit={{ x: direction === 1 ? '-300%' : '50%' }}
                        transition={{ duration: 0.7 }}
                    >
                        
                        <section className={Styles.createAccountTopSection}>
                <Stars/>
                <h1>Create Account</h1>
                <p>Join now the community and take part in votes. By signing up you are agreeing to the <span>terms and conditions.</span></p>
            </section>
                <form
                key="signUpForm"
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '-100%' }}
                transition={{ duration: 0.5 }}
                onSubmit={handleSubmit}
                className={Styles.creatAccountForm}
                >
                    <TextField 
                        id="outlined-basic" 
                        name="firstName" 
                        label="First Name" 
                        variant="outlined" 
                        placeholder='John'
                        value={formData.firstName}
                        onChange={handleInputChange}
                        error= { errorFirstName ? true : false}
                    />
                    <TextField 
                        id="outlined-basic" 
                        name="lastName" 
                        label="Last Name" 
                        variant="outlined" 
                        placeholder='Doe' 
                        value={formData.lastName}
                        onChange={handleInputChange}
                        error= { errorLastName ? true : false}
                    />
                    <TextField 
                        id="outlined-basic" 
                        sx={{marginBottom:"20px"}}
                        name="email" 
                        label="Email" 
                        variant="outlined" 
                        placeholder='johndoe@gmail.com' 
                        value={formData.email}
                        onChange={handleInputChange}
                        error= { errorEmail ? true : false}
                    />
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker 
                        value={formData.dateOfBirth} 
                        onChange={handleDateChange} 
                        renderInput={(params) => <TextField {...params} />} 
                        error= { errorDateOfBirth ? true : false}
                        />
                    </LocalizationProvider>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Gender</InputLabel>
                        <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        name="gender"
                        value={formData.gender}
                        onChange={handleGenderChange}
                        error= { errorGender ? true : false}
                        >
                        <MenuItem value="male">Male</MenuItem>
                        <MenuItem value="female">Female</MenuItem>
                        <MenuItem value="unspecified">Prefer Not to Say</MenuItem>
                        </Select>
                    </FormControl>
                </form>
            <button onClick={handleContinue}>Continue</button>
                    </motion.article>
                )}

                {isVisible === 2 && (
                    <motion.article
                        className={Styles.createPassword}
                        key="div2"
                        initial={{ x: direction === 2 ? '100%' : '-300%' }}
                        animate={{ x: 0 }}
                        exit={{ x: direction === 2 ? '-300%' : '100%' }}
                        transition={{ duration: 0.7 }}
                    >
                    <div className={Styles.backButton} onClick={handleBackButton}><Back size={20}/></div>
                    <section className={Styles.createAccountTopSection}>
                        <Lock/>
                        <h1>Create Password</h1>
                        <p>Create a strong and unique password now to safeguard your personal information.</p>
                        <p>Passwords should include the following</p>
                        <ul className={Styles.passwordInfo}>
                            <li>At least one uppercase letter</li>
                            <li>At least one lowercase letter</li>
                            <li>At least one number</li>
                            <li>A character</li>
                            <li>At least 6 characters in length</li>
                        </ul>
                    </section>
                        <form
                        key="signUpForm"
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '-100%' }}
                        transition={{ duration: 0.5 }}
                        onSubmit={handleSubmit}
                        className={Styles.creatAccountForm}
                        >
                            <TextField
                            error = {errorPassword ? true : false}
                            type={showPassword ? 'text' : 'password'}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            label="Password"
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
                            <TextField
                            id="outlined-basic"
                            name="confirmPassword"
                            label="Confirm Password"
                            variant="outlined"
                            type="password"
                            placeholder='Confirm password'
                            value={confirmPassword}
                            error = {errorPassword ? true : false}
                            onChange={(e)=>setConfirmPassword(e.target.value)}
                            />
                        </form>
                    <button onClick={handleContinue}>Continue</button>                    
            </motion.article>
                )}


            {isVisible === 3 && (
                    <motion.article
                        className={Styles.createPassword}
                        key="div3"
                        initial={{ x: direction === 3 ? '100%' : '-300%' }}
                        animate={{ x: 0 }}
                        exit={{ x: direction === 3 ? '-300%' : '100%' }}
                        transition={{ duration: 0.7 }}
                    >
                    <div className={Styles.backButton} onClick={handleBackButton}><Back size={20}/></div>
                    <section className={Styles.createAccountTopSection}>
                        <Captcha/>
                        <h1>Last step</h1>
                        <p>Please type the characters you see.</p>
                    </section>
                        
                    <div className={Styles.captchaContainer}>
                    <form className={Styles.captchaForm} onSubmit={handleCaptchaSubmit}>
                        <img height={50} src={`https://dummyimage.com/120x30/000/fff&text=${captcha}`} alt="Captcha" />
                        <TextField 
                        error = {isCaptchaValid === 3 ? true : false}
                        id="outlined-basic" 
                        name="firstName" 
                        variant="outlined" 
                        placeholder='Enter the characters here'
                        onChange={handleChange}
                         />
                    </form>
                    {/* {isCaptchaValid===2 && <p>Captcha is valid!</p>} */}
                    {isCaptchaValid===3 && <p>Captcha is invalid. Please try again.</p>}
                    </div>


                    <button onClick={handleCaptchaSubmit}>Create</button>                    
            </motion.article>
                )}

            </AnimatePresence>
        </main>
    )
}
