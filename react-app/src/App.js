import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch, useLocation } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import HomePage from "./components/HomePage";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
import ProgressPage from "./components/ProgressPage";


function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const location = useLocation();

  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  const hideNavigation = location.pathname === "/";

  return (
    <>
      {!hideNavigation && <Navigation isLoaded={isLoaded} />}
      {isLoaded && (
        <Switch>
          <Route path="/login">
            <LoginFormPage />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <Route path="/progress">
            <ProgressPage />
          </Route>
          <Route exact path="/">
            <HomePage />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
