import React from 'react'
import BrokenPolls from '../../Components/SVG/BrokenPolls'
import Styles from './NotFound.module.css'

export default function NotFound() {
  return (
    <main className={Styles.notFoundMain}>
      <article  className={Styles.notFoundContainer}>
        <BrokenPolls/>
        <div className={Styles.notFoundSection}>
          <h1>Oops! Page not Found...</h1>
          <p>Double check where you're going!</p>
          <button>Home Page</button>
        </div>
      </article>
    </main>
  )
}
