import React, { useContext, useEffect, useRef, useState } from 'react'
import Logo from '../../Components/SVG/Logo'
import { Link, NavLink, useMatch } from 'react-router-dom'
import {motion} from 'framer-motion'
import Styles from './Navbar.module.css'
import Create from '../../Components/SVG/NavBarIcons/Create'
import Home from '../../Components/SVG/NavBarIcons/Home'
import Discover from '../../Components/SVG/NavBarIcons/Discover'
import Premium from '../../Components/SVG/NavBarIcons/Premium'
import Notifications from '../../Components/SVG/NavBarIcons/Notifications'
import More from '../../Components/SVG/NavBarIcons/More'
import Profile from '../../Components/SVG/NavBarIcons/Profile'
import { AuthContext } from '../../Context/AuthContext'

export default function Navbar() {

  const { signOut } = useContext(AuthContext);


  const moreRef = useRef(null);
  const moreButtonRef = useRef(null);
  const profileRef = useRef(null);
  const profileButtonRef = useRef(null);
  const notificationsRef = useRef(null);
  const notificationsButtonRef = useRef(null);

  const [openMore, setOpenMore] = useState(false);
  const [openNotifications, setOpenNotifications] = useState(false);
  const [openProfile, setOpenProfile] = useState(false);
  const moreUlClassName = [ Styles.moreList, openMore ? Styles.listActive : ""].join(' ');
  const notificationsUlClassName = [ Styles.moreList, openNotifications ? Styles.listActive : ""].join(' ');
  const profileUlClassName = [ Styles.moreList, openProfile ? Styles.listActive : ""].join(' ');

  const handleClickOutside = (e) => {
    if (moreRef.current && !moreRef.current.contains(e.target) &&!moreButtonRef.current.contains(e.target)) {
      setOpenMore(false);
    }
    if (notificationsRef.current && !notificationsRef.current.contains(e.target) && !notificationsButtonRef.current.contains(e.target)) {
      setOpenNotifications(false);
    }
    if (profileRef.current && !profileRef.current.contains(e.target) && !profileButtonRef.current.contains(e.target)) {
      setOpenProfile(false);
    }
  };

  useEffect(()=>{
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  },[]);

  const handleSignOut = () =>{
    signOut();
  }
  
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
            <NavLink exact="true" to="/home"  className={({ isActive, isPending }) => isPending ? "pending" : isActive ? Styles.active : ""}>
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
          <li ref={notificationsButtonRef} className={Styles.moreButton} onClick={()=>setOpenNotifications(prev => !prev)} >
            <Notifications active={openNotifications}/>
            <motion.div animate={openNotifications ? {color:"#0f0cc6"}:""}>Notifications&#9660;</motion.div>
              <motion.ul ref={notificationsRef} className={notificationsUlClassName} animate={openNotifications ? {y:0, opacity:1} : {y:-10, opacity:0}}>
                <li>Settings</li>
                <li>About Poliverse</li>
                <li>Become a member</li>
              </motion.ul>
          </li>
          <li ref={profileButtonRef} className={Styles.moreButton} onClick={()=>setOpenProfile(prev => !prev)}>
            <Profile active={openProfile}/>
            <motion.div animate={openProfile ? {color:"#0f0cc6"}:""}>Profile&#9660;</motion.div>
            <motion.ul ref={profileRef} className={profileUlClassName} animate={openProfile ? {y:0, opacity:1} : {y:-10, opacity:0}}>
                <li>Profile</li>
                <li>My Activity</li>
                <li onClick={handleSignOut}>Sign Out</li>
              </motion.ul>
          </li>
          <li ref={moreButtonRef} className={Styles.moreButton} onClick={()=>setOpenMore(prev => !prev)}>
            <More active={openMore}/>
            <motion.div animate={openMore ? { borderRadius: "5px"}:""}>More&#9660;</motion.div>
              <motion.ul ref={moreRef} className={moreUlClassName} animate={openMore ? {y:0, opacity:1} : {y:-10, opacity:0}}>
                <li>Dark Mode</li>
                <li>About Poliverse</li>
                <li>Terms & Conditions</li>
                <li>Settings</li>
              </motion.ul>
          </li>
          
        </ul>
      </nav>
    </header>
  )
}