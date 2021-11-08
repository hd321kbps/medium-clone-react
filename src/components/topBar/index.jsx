import React, { useEffect, useContext, Fragment } from 'react';
import { Link, NavLink } from 'react-router-dom';
import IonIcon from '@reacticons/ionicons';

import { CurrentUserContext } from '../../contexts/currentUser';

const TopBar = () => {
  const [currentUserState] = useContext(CurrentUserContext);

  return (
    <nav className="navbar navbar-expand-lg navbar-light">
      <div className="container">
        <Link to="/" className="navbar-brand text-success">
          Medium
        </Link>
        <ul className="navbar-nav justify-content-end">
          <li className="nav-item">
            <NavLink to="/" className="nav-link" exact>
              <IonIcon name="home-outline" />
              <span>Home</span>
            </NavLink>
          </li>
          {!currentUserState.isLoggedIn && (
            <Fragment>
              <li className="nav-item">
                <NavLink to="/login" className="nav-link">
                  <IonIcon name="log-in-outline" />
                  <span>Sign in</span>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/register" className="nav-link">
                  <IonIcon name="log-out-outline" />
                  <span>Sign up</span>
                </NavLink>
              </li>
            </Fragment>
          )}
          {currentUserState.isLoggedIn && (
            <Fragment>
              <li className="nav-item">
                <NavLink to="/articles/new" className="nav-link">
                  <IonIcon name="create-outline" />
                  <span>New Post</span>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/settings" className="nav-link">
                  <IonIcon name="settings-outline" />
                  <span>Settings</span>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  to={`/profiles/${currentUserState.currentUser.username}`}
                  className="nav-link"
                >
                  <img
                    src={currentUserState.currentUser.image}
                    alt=""
                    className="user-pic rounded-3 me-1"
                  />
                  <span>{currentUserState.currentUser.username}</span>
                </NavLink>
              </li>
            </Fragment>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default TopBar;
