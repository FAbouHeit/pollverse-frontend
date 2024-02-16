import { Routes, Route } from "react-router-dom";
import WelcomeOutlet from './WelcomeOutlet.js'
import Welcome from "../Pages/Welcome/Welcome.js";
import Unauthorized from "../Pages/Unauthorized/Unauthorized.js";
import NotFound from "../Pages/NotFound/NotFound.js";
import SignUp from "../Pages/SignUp/SignUp.js";


const AppRouter = () => {
  return (
    <Routes>
        <Route path="/" element={<WelcomeOutlet />}>
            <Route path="/" exact element={<Welcome />} />
            <Route path="/sign-up" element={<SignUp />} />
        </Route>
      <Route path="/unauthorized" exact element={<Unauthorized />} />
      <Route path="/*"  element={<NotFound />} />
    </Routes>
  );
};

export default AppRouter;
