import React, { useState } from 'react';
import RelatedCard from './RelatedCard.jsx';
import exampleData from './ExampleRelatedProducts.js';
import './related-list.css';

const RelatedList = () => {
  const thing = '';
  return (
    <div className="related-list">
      {exampleData.exampleRelated.map((product) => (
        <RelatedCard key={product.id} product={product} />
      ))}
      <div className="list-actions">
        <button className="btn-related-left">prev</button>
        <button className="btn-related-right">next</button>
      </div>
    </div>
  );
};

export default RelatedList;
