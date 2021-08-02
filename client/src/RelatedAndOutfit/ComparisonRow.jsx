import React from 'react';
import './comparison-row.css';
import PropTypes from 'prop-types';

const ComparisonRow = ({ feature }) => (
  <div className="comp-row">
    <span className="comp-current">
      {feature.currVal}
    </span>
    <span className="comp-features">
      {feature.name}
    </span>
    <span className="comp-related">
      {feature.relatedVal}
    </span>
  </div>
);

ComparisonRow.propTypes = {
  feature: PropTypes.shape({
    name: PropTypes.string,
    currVal: PropTypes.string,
    relatedVal: PropTypes.string,
  }),
};

ComparisonRow.defaultProps = {
  feature: {
    name: '',
    currVal: '',
    relatedVal: '',
  },
};

export default ComparisonRow;
