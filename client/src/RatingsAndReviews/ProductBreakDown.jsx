import React from 'react';
import PropTypes from 'prop-types';

const ProductBreakDown = ({ characteristics }) => (
  <div className="factors">
    <div className="full-factor-bar">
      {Object.keys(characteristics).map((character) => {
        const currentCharacterRating = parseFloat(characteristics[character].value);
        const indicatorValue = Number.isNaN(currentCharacterRating) ? 0
          : (currentCharacterRating * 50) / 5;
        return (
          <div key={character} className="bar-row">
            <span className="factor-side">{character}</span>
            <span className="factor-bar">
              {Number.isNaN(currentCharacterRating) ? 0 : currentCharacterRating.toFixed(1)}
            </span>
            <span className="indicator" style={{ margin: `${indicatorValue}%` }}>
              &#9662;
            </span>
          </div>
        );
      })}

    </div>
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
