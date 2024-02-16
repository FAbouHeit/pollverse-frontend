import { Outlet } from "react-router-dom";
import WelcomeHeader from "../Layout/WelcomeHeader/WelcomeHeader";
// import Navbar from "../Layouts/Navbar/Navbar";
// import Footer from "../Layouts/Footer/Footer";


const Layout = () => {
    return (
        <>
            <WelcomeHeader/>
            <Outlet/>
        </>
      );
}

export default Layout