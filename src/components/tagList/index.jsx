import React from 'react';

const TagList = ({ tags }) => {
  return tags[0] !== '' ? (
    <ul className="tag-list">
      {tags.map((tag) => (
        <li
          key={tag}
          className="tag-default tag-pill tag-outline badge bg-success me-1"
        >
          {tag}
        </li>
      ))}
    </ul>
  ) : (
    ''
  );
};

export default TagList;
