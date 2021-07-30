import React from 'react';
import './comparison-row.css';
import PropTypes from 'prop-types';

const ComparisonRow = ({ feature }) => (
  <div className="comp-row">
    <div className="comp-current">
      {feature.currVal}
    </div>
    <div className="comp-features">
      {feature.name}
    </div>
    <div className="comp-related">
      {feature.relatedVal}
    </div>
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
