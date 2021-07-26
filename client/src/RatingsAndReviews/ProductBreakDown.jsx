import React from 'react';
import PropTypes from 'prop-types';

const ProductBreakDown = ({ characteristics }) => (
  <div>
    {Object.keys(characteristics).map((character) => (
      <div key={character}>
        {character}
        :
        {parseFloat(characteristics[character].value).toFixed(2)}
      </div>
    ))}
  </div>
);

ProductBreakDown.propTypes = {
  characteristics: PropTypes.shape({
    value: PropTypes.string,
  }),
};
ProductBreakDown.defaultProps = {
  characteristics: {},
};
export default ProductBreakDown;
