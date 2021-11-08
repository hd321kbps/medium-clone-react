import React from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';

import { range } from '../../utils';

const PaginationItem = ({ page, currentPage, url }) => {
  const liClasses = classNames({
    'page-item': true,
    active: currentPage === page
  });

  const linkClasses = classNames({
    'page-link': true,
    'bg-success': currentPage === page
  });

  return (
    <li className={liClasses}>
      <Link to={`${url}?page=${page}`} className={linkClasses}>
        {page}
      </Link>
    </li>
  );
};

const Pagination = ({ total, limit, url, currentPage }) => {
  const pagesCount = Math.ceil(total / limit);
  const pages = range(1, pagesCount);

  return (
    <ul className="pagination mt-3">
      {pages.map((page) => (
        <PaginationItem
          page={page}
          currentPage={currentPage}
          url={url}
          key={page}
        />
      ))}
    </ul>
  );
};

export default Pagination;
