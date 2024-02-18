import { Outlet } from "react-router-dom";
import WelcomeHeader from "../Layout/WelcomeHeader/WelcomeHeader";

const WelcomeOutlet = () => {
    return (
        <>
            <WelcomeHeader/>
            <Outlet/>
        </>
      );
}

export default WelcomeOutlet