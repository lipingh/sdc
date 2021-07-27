import React, { useState } from 'react';
import RelatedCard from './RelatedCard.jsx';
import exampleData from './ExampleRelatedProducts.js';
import './related-list.css';

const RelatedList = () => {
  const [current, setCurrent] = useState(0);
  const len = exampleData.exampleRelated.length;
  const width = window.innerWidth;
  console.log('width: ', width)

  const nextCard = () => {
    setCurrent(current === len - 1 ? current : current + 1);
  };

  const prevCard = () => {
    setCurrent(current === 0 ? 0 : current - 1);
  };

  console.log('current: ', current);
  return (
    <div className="related-list">
      {exampleData.exampleRelated.map((product) => (
        <RelatedCard key={product.id} product={product} />
      ))}
      <div className="list-actions">
        <button className="btn-related-left" onClick={prevCard}>prev</button>
        <button className="btn-related-right" onClick={nextCard}>next</button>
      </div>
    </div>
  );
};

export default RelatedList;
