import React, { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHippo } from '@fortawesome/free-solid-svg-icons';

import AuthService from "./services/auth.service";

import Login from "./components/Login";
import Register from "./components/Register";
import Jobs from "./components/Jobs";
import Profile from "./components/Profile";
import AddOffer from "./components/AddOffer";
import Company from "./components/Company"; ///////// ICI
import MyOffers from "./components/MyOffers"; //////////// ET LA
import Database from "./components/Database"; //////////// ET LA
// import Offers from "./components/Offers";
// import BoardUser from "./components/BoardUser";
// import BoardAdmin from "./components/BoardAdmin";

import AuthVerify from "./common/Authverify";
import EventBus from "./common/EventBus";

const App = () => {
  const [showAdminBoard, setShowAdminBoard] = useState(false);
  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (user) {
      setCurrentUser(user);
      setShowAdminBoard(user.roles.includes("ROLE_ADMIN")); // REMPLACER PAR COMPANY
    }

    EventBus.on("logout", () => {
      logOut();
    });

    return () => {
      EventBus.remove("logout");
    };
  }, []);

  const logOut = () => {
    AuthService.logout();
    setShowAdminBoard(false);
    setCurrentUser(undefined);
  };

  return (
    <div className="all"> {/* CSS GRIS POUR ALL*/}
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <Link to={"/"} className="navbar-brand">
          <FontAwesomeIcon icon={faHippo} style={{fontSize:"60px"}}/>
        </Link>
        <div className="navbar-nav mr-auto">
          {currentUser ? (
            <div className="connected-navbar">
              {currentUser.roles == "ROLE_ADMIN" || currentUser.roles == "ROLE_COMPANY"? (
                <div className="admin-navbar">
                  <li className="nav-item">
                    <Link to={"/jobs"} className="nav-link">
                      Home
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to={"/add"} className="nav-link">
                      AddOffers
                    </Link>
                  </li>
                  <li className="nav-item"> 
                  <Link to={"/company"} className="nav-link"> 
                    Company 
                  </Link> 
                </li> 
                <li className="nav-item"> 
                  <Link to={"/my_offers"} className="nav-link"> 
                    MyOffers 
                  </Link> 
                
                </li> 
                <li className="nav-item"> 
                  <Link to={"/database"} className="nav-link"> 
                    Database 
                  </Link> 
                </li> 
                </div>
                
              ) : (<div className="user-navbar">
                <li className="nav-item">
                  <Link to={"/jobs"} className="nav-link">
                    Home
                  </Link>
                </li>
                <li className="nav-item"> 
                  <Link to={"/company"} className="nav-link"> 
                    Company 
                  </Link> 
                </li> 
              </div>)}
            </div>
          ) : (<div></div>)} {/*DIV VIDE QUAND T'ES PAS CONNECTé */}
        </div>

        {currentUser ? (
          <div className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to={"/profile"} className="nav-link">
                {currentUser.username}
              </Link>
            </li>
            <li className="nav-item">
              <a href="/login" className="nav-link" onClick={logOut}>
                LogOut
              </a>
            </li>
          </div>
        ) : (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/login"} className="nav-link">
                  Login
              </Link>
              </li>

              <li className="nav-item">
                <Link to={"/register"} className="nav-link">
                  Sign Up
              </Link>
              </li>
            </div>
          )}
      </nav>

      <div className="maincss">
        <Routes>
          <Route exact path={"/"} element={<Jobs />} />
          <Route exact path={"/jobs"} element={<Jobs />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/profile" element={<Profile />} />
          <Route exact path="/add" element={<AddOffer />} />
          <Route exact path="/company" element={<Company />} /> {/*ICI JAI RAJOUTER */}
          <Route exact path="/my_offers" element={<MyOffers />} /> {/*ICI JAI RAJOUTER */}
          <Route exact path="/database" element={<Database />} /> {/*ICI JAI RAJOUTER */}
        </Routes>
      </div>

      <AuthVerify logOut={logOut} />
    </div>
  );
};

export default App;