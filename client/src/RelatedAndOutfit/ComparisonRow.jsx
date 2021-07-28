import React from 'react';
import './comparison-row.css';

const ComparisonRow = ({feature}) => (
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

export default ComparisonRow;
