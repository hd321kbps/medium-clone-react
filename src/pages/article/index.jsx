import React, { useState, useEffect, useContext } from 'react';
import { Link, Redirect } from 'react-router-dom';
import IonIcon from '@reacticons/ionicons';

import useFetch from '../../hooks/useFetch';
import { CurrentUserContext } from '../../contexts/currentUser';
import Loading from '../../components/loading';
import ErrorMessage from '../../components/errorMessage';
import TagList from '../../components/tagList';

const Article = (props) => {
  const slug = props.match.params.slug;
  const apiUrl = `/articles/${slug}`;
  const [
    {
      response: fetchArticleResponse,
      isLoading: fetchArticleIsLoading,
      error: fetchArticleError
    },
    doFetch
  ] = useFetch(apiUrl);
  const [{ response: deleteArticleResponse }, doDeleteArticle] =
    useFetch(apiUrl);
  const [currentUserState] = useContext(CurrentUserContext);
  const [isSuccessfullDelete, setIsSuccessfullDelete] = useState(false);

  const isAuthor = () => {
    if (!fetchArticleResponse || !currentUserState.isLoggedIn) {
      return false;
    }

    return (
      fetchArticleResponse.article.author.username ===
      currentUserState.currentUser.username
    );
  };

  const deleteArticle = () => {
    doDeleteArticle({
      method: 'DELETE'
    });
  };

  useEffect(() => {
    doFetch();
  }, [doFetch]);

  useEffect(() => {
    if (deleteArticleResponse === null) {
      return;
    }
    setIsSuccessfullDelete(true);
  }, [deleteArticleResponse]);

  if (isSuccessfullDelete) {
    return <Redirect to="/" />;
  }

  return (
    <div className="article-page">
      <div className="banner mx-auto bg-dark">
        {!fetchArticleIsLoading && fetchArticleResponse && (
          <div className="container p-3 mb-3">
            <h1>{fetchArticleResponse.article.title}</h1>
            <div className="article-meta d-flex">
              <Link
                to={`/profiles/${fetchArticleResponse.article.author.username}`}
              >
                <img
                  className="user-pic-article rounded-3 me-2"
                  src={fetchArticleResponse.article.author.image}
                  alt=""
                />
              </Link>
              <div className="info">
                <Link
                  to={`/profiles/${fetchArticleResponse.article.author.username}`}
                >
                  {fetchArticleResponse.article.author.username}
                </Link>
                <div className="date">
                  {fetchArticleResponse.article.createdAt}
                </div>
              </div>
            </div>
            {isAuthor() && (
              <div className="mt-3">
                <Link
                  className="btn btn-outline-secondary btn-sm me-2"
                  to={`/articles/${fetchArticleResponse.article.slug}/edit`}
                >
                  <IonIcon name="pencil-outline" />
                  <span>Edit Article</span>
                </Link>
                <button
                  className="btn btn-outline-danger btn-sm"
                  onClick={deleteArticle}
                >
                  <IonIcon name="trash-outline" />
                  <span>Delete Article</span>
                </button>
              </div>
            )}
          </div>
        )}
      </div>
      <div className="container page">
        {fetchArticleIsLoading && <Loading />}
        {fetchArticleError && <ErrorMessage />}
        {!fetchArticleIsLoading && fetchArticleResponse && (
          <div className="row article-content">
            <div className="col-xs-12">
              <div>
                <p>{fetchArticleResponse.article.body}</p>
              </div>
              <TagList tags={fetchArticleResponse.article.tagList} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Article;
