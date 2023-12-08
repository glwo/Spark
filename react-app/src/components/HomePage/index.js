import React from "react";
import { useSelector } from "react-redux";
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import Spark from "../Spark";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import Dashboard from "../Dashboard";
import "./HomePage.css";

const HomePage = () => {
    const currentUser = useSelector((state) => state.session.user);

    return (
      <div className="homePageContainer">
        <div className="homePageContent">
          {!currentUser ? (
            <div className="buttonDiv">
              <Spark />
              <div className="WelcomeButtons">
                <h1 className="welcomeMessage">Welcome to Spark</h1>
                <h3>Igniting a healthier, more productive you!</h3>
                <div className="authButtons">
                  <OpenModalButton
                    buttonText="Log In"
                    modalComponent={<LoginFormModal />}
                  />
                  <OpenModalButton
                    buttonText="Sign Up"
                    modalComponent={<SignupFormModal />}
                  />
                </div>
              </div>
            </div>
          ) : (
            <div className="loggedInContainer">
              <div className="leftSidebar">
                <h1>Welcome to the Spark Community!</h1>
                <h2>How can we help you reach your full potential?</h2>
                <div className="loggedInButtons">
                  <Link to="/workouts" className="loggedInButton">
                    Workouts
                  </Link>
                  <Link to="/progress" className="loggedInButton">
                    Progress
                  </Link>
                  <Link to="/inspiration" className="loggedInButton">
                    Inspiration
                  </Link>
                  <Link to="/community" className="loggedInButton">
                    Community
                  </Link>
                </div>
              </div>
            </div>
          )}
          </div>
          <footer className="footer">
            <h3>You can't start a fire without a spark - Bruce Springsteen</h3>
            <div className="rightside-footer">
              <div>
                <a
                  className="link-footer"
                  href="https://github.com/glwo"
                  rel="noreferrer"
                  target="_blank"
                >
                  Glen's Github | <i className="fa-brands fa-github fa-xl" />
                </a>
              </div>
              <div>
                <a
                  className="link-footer"
                  href="https://www.linkedin.com/in/glen-wojnar-74449b269/"
                  rel="noreferrer"
                  target="_blank"
                >
                  Glen's LinkedIn | <i className="fa-brands fa-linkedin fa-xl" />
                </a>
              </div>
              <div>
                <a
                  className="link-footer"
                  href="https://github.com/glwo/Spark"
                  rel="noreferrer"
                  target="_blank"
                >
                  Project Repo | <i className="fa-brands fa-github fa-xl" />
                </a>
              </div>
            </div>
          </footer>
        </div>
    );
  };

  export default HomePage;
