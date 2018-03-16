import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

function Menu({ items, isLoading }) {
  return (
    <div>
      <h1>Ridibooks CMS Menu</h1>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <ul>
          {_.map(items, (item, key) => (
            <li key={key}>{JSON.stringify(item)}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

Menu.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object),
  isLoading: PropTypes.bool,
};

Menu.defaultProps = {
  items: undefined,
  isLoading: false,
};

export default Menu;
