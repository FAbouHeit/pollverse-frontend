{isVisible === 2 && (
    <motion.form
        key="passwordForm"
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '-100%' }}
        transition={{ duration: 0.5 }}
        onSubmit={handleSubmit}
        className={Styles.creatAccountForm}
      >
        <TextField
          id="outlined-basic"
          name="password"
          label="Password"
          variant="outlined"
          type="password"
          placeholder='Enter password'
          value={passwords.password}
          onChange={handlePasswordChange}
        />
        <TextField
          id="outlined-basic"
          name="confirmPassword"
          label="Confirm Password"
          variant="outlined"
          type="password"
          placeholder='Confirm password'
          value={passwords.confirmPassword}
          onChange={handlePasswordChange}
        />
      </motion.form>
    )}

























    import React, { useState } from 'react'
import Styles from './SignUp.module.css'
import Stars from '../../Components/SVG/Stars'
import { FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { motion, AnimatePresence } from 'framer-motion';
import Back from '../../Components/SVG/Back';

export default function SignUp() {

    const [isVisible, setIsVisible] = useState(1);

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        dateOfBirth: null,
        gender: ''
      });

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
    
      const handlePasswordChange = (e) => {
        const { name, value } = e.target;
        setPasswords(prevState => ({
          ...prevState,
          [name]: value
        }));
      };

      const handleContinue = (e) =>{
        e.preventDefault();
        setIsVisible((prevState)=> prevState+1);
      }

      const handleBackButton = () => {
        setIsVisible((prevState) => prevState - 1);
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

    return (
    <main className={Styles.createAccountMain}>
        <AnimatePresence>
        {isVisible === 1 && (
        <motion.article 
        className={Styles.createAccountContainer}
        key="div1"
        initial={{ x: '20%' }}
        animate={{ x: '0%' }}
        exit={{ x: '-300%' }}
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
                    />
                    <TextField 
                        id="outlined-basic" 
                        name="lastName" 
                        label="Last Name" 
                        variant="outlined" 
                        placeholder='Doe' 
                        value={formData.lastName}
                        onChange={handleInputChange}
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
                    />
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker 
                        value={formData.dateOfBirth} 
                        onChange={handleDateChange} 
                        renderInput={(params) => <TextField {...params} />} 
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
        </AnimatePresence>

        <AnimatePresence>
        {isVisible === 2 && (
        <motion.article 
        className={Styles.createPassword}
        key="div2"
        initial={{ x: '100%' }}
        animate={{ x: '0%' }}
        exit={{ x: '-300%' }}
        transition={{ duration: 1 }}
        >
            <div className={Styles.backButton} onClick={handleBackButton}><Back size={20}/></div>
            <section className={Styles.createAccountTopSection}>
                <Stars/>
                <h1>Create Password</h1>
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
                    />
                    <TextField 
                        id="outlined-basic" 
                        name="lastName" 
                        label="Last Name" 
                        variant="outlined" 
                        placeholder='Doe' 
                        value={formData.lastName}
                        onChange={handleInputChange}
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
                    />
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker 
                        value={formData.dateOfBirth} 
                        onChange={handleDateChange} 
                        renderInput={(params) => <TextField {...params} />} 
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
        </AnimatePresence>
    </main>
  )
}
