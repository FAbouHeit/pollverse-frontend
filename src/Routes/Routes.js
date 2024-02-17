import { Routes, Route } from "react-router-dom";
import WelcomeOutlet from './WelcomeOutlet.js'
import Welcome from "../Pages/Welcome/Welcome.js";
import Unauthorized from "../Pages/Unauthorized/Unauthorized.js";
import NotFound from "../Pages/NotFound/NotFound.js";
import SignUp from "../Pages/SignUp/SignUp.js";
import SignIn from "../Pages/SignIn/SignIn.js";
import ForgotPassword from "../Pages/ForgotPassword/ForgotPassword.js";
import RecoveryLink from "../Pages/RecoveryLink/RecoveryLink.js";
import ActivationLink from "../Pages/ActivationLink/ActivationLink.js";


const AppRouter = () => {
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
      <Route path="/unauthorized" exact element={<Unauthorized />} />
      <Route path="/*"  element={<NotFound />} />
    </Routes>
  );
};

export default AppRouter;
