import React from 'react'
import Styles from './ActivationLink.module.css'
import { AnimatePresence, motion } from 'framer-motion'
import Email from '../../Components/SVG/Email';
import { Link } from 'react-router-dom';

export default function ActivationLink({email}) {

const isValidEmail = (email)=> {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

return (
<main className={Styles.activationMain}>
    <AnimatePresence>   
        <motion.article
            className={Styles.activationContainer}
            key="activationpage"
            initial={{ x: '50%'}}
            animate={{ x: 0 }}
            transition={{ duration: 0.7 }}
        >
                        
            <section className={Styles.activationTopSection}>
                <Email/>
                <h1>Check your Email!</h1>
                <span>-&nbsp;{email || "testingemail@gmail.com"}&nbsp;-</span>
                <p>Check you inbox for an email with the activation link. If you can’t find it, check the spam folder before trying again!</p>
            </section>
            <section
            key="signInForm"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ duration: 0.5 }}
            className={Styles.activationSection}
            >
              <h2>Thank you for signin up to Poliverse!</h2>
                <article className={Styles.activationParagraphs}>
                  <p>We respect your privacy. All details provided to us including you name, email, 
                    and age are <strong>not</strong> shared with any third-party. We value privacy just as much as you do, 
                    and believe it’s an integral part of modern society.</p>
                  <p>While waiting for that email, feel free to check out out terms and conditions </p>
                </article>
            </section>
            <Link>
              <button className={Styles.activationButton}>Sign In</button>
            </Link>
        </motion.article>
            
    </AnimatePresence>
</main>
)

}
