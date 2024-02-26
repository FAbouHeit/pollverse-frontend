import { Routes, Route, Navigate } from "react-router-dom";
import WelcomeOutlet from './WelcomeOutlet.js'
import Welcome from "../Pages/Welcome/Welcome.js";
import Unauthorized from "../Pages/Unauthorized/Unauthorized.js";
import NotFound from "../Pages/NotFound/NotFound.js";
import SignUp from "../Pages/SignUp/SignUp.js";
import SignIn from "../Pages/SignIn/SignIn.js";
import ForgotPassword from "../Pages/ForgotPassword/ForgotPassword.js";
import RecoveryLink from "../Pages/RecoveryLink/RecoveryLink.js";
import ActivationLink from "../Pages/ActivationLink/ActivationLink.js";
import HomeOutlet from "./HomeOutlet/HomeOutlet.js";
import Home from "../Pages/Home/Home.js";
import Discover from "../Pages/Discover/Discover.js";
import Premium from "../Pages/Premium/Premium.js";
import Notifications from "../Pages/Notifications/Notifications.js";
import Profile from "../Pages/Profile/Profile.js";
import Create from "../Pages/Create/Create.js";
import { useContext, useEffect } from "react";
import { AuthContext } from "../Context/AuthContext.js";

const PrivateRoute = ({ isAllowed, element }) => {
  const { user, loading, fetchUserData } = useContext(AuthContext);

  useEffect(() => {
    if (!user) {
      fetchUserData();
    }
  }, [user, fetchUserData]);

  if (loading) {
    return (
      <div>
        Loading...
      </div>
    );
  }

  if (user && !isAllowed) {
    return <Navigate to="/unauthorized" />;
  }

  return element;
};


const AppRouter = () => {
  const { user } = useContext(AuthContext);
  return (
    <Routes>
        <Route path="/" element={<WelcomeOutlet />}>
            <Route path="/" exact element={<Welcome />} />
            <Route path="/sign-in" element={<SignIn />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/activation-link" element={<ActivationLink />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/recovery-link" element={<RecoveryLink />} />
        </Route>

        <Route path="/" element={<HomeOutlet />}>  
            <Route path="/home" element = {
              <PrivateRoute
                element={<Home />}
                isAllowed={user && user.role === "user"}
              />
              } 
            />
            
            <Route path="/create" element = {
              <PrivateRoute
                element={<Create />}
                isAllowed={user && user.role === "user"}
              />
              } 
            />

            <Route path="/discover" element = {
              <PrivateRoute
                element={<Discover />}
                isAllowed={user && user.role === "user"}
              />
              } 
            />

            <Route path="/premium" element = {
              <PrivateRoute
                element={<Premium />}
                isAllowed={user && user.role === "user"}
              />
              } 
            />

            <Route path="/notifications" element = {
              <PrivateRoute
                element={<Notifications />}
                isAllowed={user && user.role === "user"}
              />
              } 
            />

            <Route path="/profile" element = {
              <PrivateRoute
                element={<Profile />}
                isAllowed={user && user.role === "user"}
              />
              } 
            />
        </Route>

      <Route path="/unauthorized" exact element={<Unauthorized />} />
      <Route path="/*"  element={<NotFound />} />
    </Routes>
  );
};

export default AppRouter;
