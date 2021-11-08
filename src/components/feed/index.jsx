import React from 'react';
import { Link } from 'react-router-dom';

import TagList from '../tagList';
import AddToFavorites from '../addToFavorites.js';

const Feed = ({ articles }) => {
  return (
    <div>
      {articles.map((article, index) => (
        <div className="article-preview border-bottom mt-3" key={index}>
          <div className="article-meta d-flex">
            <Link to={`/profiles/${article.author.username}`}>
              <img
                className="user-pic-article rounded-3 me-2"
                src={article.author.image}
                alt=""
              />
            </Link>

            <div className="info flex-grow-1">
              <Link
                to={`/profiles/${article.author.username}`}
                className="author text-success"
              >
                {article.author.username}
              </Link>
              <div className="date text-secondary">{article.createdAt}</div>
            </div>
            <div className="float-end">
              <AddToFavorites
                isFavorited={article.favorited}
                favoritesCount={article.favoritesCount}
                articleSlug={article.slug}
              />
            </div>
          </div>
          <Link to={`/articles/${article.slug}`} className="preview-link">
            <h1>{article.title}</h1>
          </Link>
          <p>{article.description}</p>
          <span>Read more...</span>
          <TagList tags={article.tagList} />
        </div>
      ))}
    </div>
  );
};

export default Feed;
