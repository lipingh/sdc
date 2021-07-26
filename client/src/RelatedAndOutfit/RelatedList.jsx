import React, {useState} from 'react';
import RelatedCard from './RelatedCard.jsx';
import exampleData from './ExampleRelatedProducts.js';
import './related-list.css';

const RelatedList = () => (
  <div className="related-list">
    <h3>Related</h3>
    {exampleData.exampleRelated.map((product) => (
      <RelatedCard key={product.id} product={product} />
    ))}
  </div>
);

export default RelatedList;
