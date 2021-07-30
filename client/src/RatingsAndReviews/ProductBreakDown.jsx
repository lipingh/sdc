import React from 'react';
import PropTypes from 'prop-types';

const ProductBreakDown = ({ characteristics }) => (
  <div className="factors">
    <div className="full-factor-bar">
      {Object.keys(characteristics).map((character) => {
        // const indicatorValue = parseFloat(characteristics[character].value) * 20 - 5;
        const indicatorValue = (parseFloat(characteristics[character].value) * 50) / 5;
        return (
          <div key={character} className="bar-row">
            <span>{character}</span>
            <span className="factor-bar">
              {parseFloat(characteristics[character].value).toFixed(1)}
            </span>
            <span className="indicator" style={{ margin: `${indicatorValue}%` }}>
              &#9662;
            </span>
          </div>
        );
      })
      }

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
