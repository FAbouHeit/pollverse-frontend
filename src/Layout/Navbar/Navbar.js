import React from 'react'
import Logo from '../../Components/SVG/Logo'
import { Link, NavLink, useMatch } from 'react-router-dom'
import Styles from './Navbar.module.css'
import Create from '../../Components/SVG/NavBarIcons/Create'
import Home from '../../Components/SVG/NavBarIcons/Home'
import Discover from '../../Components/SVG/NavBarIcons/Discover'
import Premium from '../../Components/SVG/NavBarIcons/Premium'
import Notifications from '../../Components/SVG/NavBarIcons/Notifications'
import More from '../../Components/SVG/NavBarIcons/More'
import Profile from '../../Components/SVG/NavBarIcons/Profile'

export default function Navbar() {
  return (
    <header className={Styles.header}>
      <Link to="/home">
        <Logo/>
      </Link>
      <nav className={Styles.nav}> 
        <ul className={Styles.list}>
          <li>
            <NavLink to="/create" className={({ isActive, isPending }) => isPending ? "pending" : isActive ? Styles.active : ""}>
              <Create active={useMatch('/create') !== null}/>
              Create
            </NavLink>
          </li>
          <li>
            <NavLink exact to="/home"  className={({ isActive, isPending }) => isPending ? "pending" : isActive ? Styles.active : ""}>
              <Home active={useMatch('/home') !== null} />
              My Feed
            </NavLink>
          </li>
          <li>
            <NavLink to="/discover" className={({ isActive, isPending }) => isPending ? "pending" : isActive ? Styles.active : ""}>
              <Discover active={useMatch('/discover') !== null}/>
              Discover
            </NavLink>
          </li>
          <li>
            <NavLink to="/premium" className={({ isActive, isPending }) => isPending ? "pending" : isActive ? Styles.active : ""}>
              <Premium active={useMatch('/premium') !== null}/>
              Premium
            </NavLink>
          </li>
          <li>
            <Notifications/>
              Notifications
          </li>
          <li>
            <More/>
              More
          </li>
          <li>
            <Profile/>
              Profile
          </li>
        </ul>
      </nav>
    </header>
  )
}