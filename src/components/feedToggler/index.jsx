import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import IonIcon from '@reacticons/ionicons';

import { CurrentUserContext } from '../../contexts/currentUser';

const FeedToggler = ({ tagName }) => {
  const [currentUserState] = useContext(CurrentUserContext);

  return (
    <div className="feed-toggle">
      <ul className="nav nav-tabs">
        {currentUserState.isLoggedIn && (
          <li className="nav-item">
            <NavLink to="/feed" className="nav-link">
              Your feed
            </NavLink>
          </li>
        )}

        <li className="nav-item">
          <NavLink to="/" className="nav-link" exact>
            Global feed
          </NavLink>
        </li>
        {tagName && (
          <li className="nav-item">
            <NavLink to={`/tags/${tagName}`} className="nav-link" exact>
              <IonIcon name="at-outline"></IonIcon>
              <span>{tagName}</span>
            </NavLink>
          </li>
        )}
      </ul>
    </div>
  );
};

export default FeedToggler;
