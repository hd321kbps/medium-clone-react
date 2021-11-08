import React from 'react';
import IonIcon from '@reacticons/ionicons';
import classNames from 'classnames';

import useFetch from '../../hooks/useFetch';

const AddToFavorites = ({ isFavorited, favoritesCount, articleSlug }) => {
  const apiUrl = `/articles/${articleSlug}/favorite`;
  const [{ response }, doFetch] = useFetch(apiUrl);
  const favoriteCountWithResponse = response
    ? response.article.favoritesCount
    : favoritesCount;
  const isFavoritedWithResponse = response
    ? response.article.favorited
    : isFavorited;
  const buttonClasses = classNames({
    btn: true,
    'btn-sm': true,
    'btn-success': isFavoritedWithResponse,
    'btn-outline-success': !isFavoritedWithResponse
  });

  const handleLike = (event) => {
    event.preventDefault();

    doFetch({
      method: isFavoritedWithResponse ? 'DELETE' : 'POST'
    });
  };

  return (
    <button className={buttonClasses} onClick={handleLike}>
      <IonIcon name="heart" />
      <span>{favoriteCountWithResponse}</span>
    </button>
  );
};

export default AddToFavorites;
