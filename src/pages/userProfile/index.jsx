import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';

import useFetch from '../../hooks/useFetch';
import UserArticles from './components/userArticles';

const UserProfile = ({ location, match }) => {
  const slug = match.params.slug;
  const isFavorites = location.pathname.includes('favorites');
  const apiUrl = `/profiles/${slug}`;
  const [{ response }, doFetch] = useFetch(apiUrl);
  console.log(response);

  useEffect(() => {
    doFetch();
  }, [doFetch]);

  if (!response) {
    return null;
  }

  return (
    <div className="profile-page">
      <div className="user-info banner bg-secondary text-center p-3 mb-3">
        <div className="container">
          <div className="col-xs-12 col-md-10 offset-md-1">
            <img
              src={response.profile.image}
              alt=""
              className="user-img user-avatar rounded-circle"
            />
            <h4>{response.profile.username}</h4>
            <p>{response.profile.bio}</p>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-xs-12 col-md-10 offset-md-1">
            <div className="article-toggle">
              <ul className="nav nav-tabs">
                <li className="nav-item">
                  <NavLink
                    to={`/profiles/${response.profile.username}`}
                    className="nav-link"
                    exact
                  >
                    My Posts
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    to={`/profiles/${response.profile.username}/favorites`}
                    className="nav-link"
                    exact
                  >
                    Favorites Posts
                  </NavLink>
                </li>
              </ul>
            </div>
            <UserArticles
              username={response.profile.username}
              location={location}
              isFavorites={isFavorites}
              url={match.url}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
