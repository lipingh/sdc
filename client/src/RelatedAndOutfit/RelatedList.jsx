import React, { useState, useRef } from 'react';
import RelatedCard from './RelatedCard.jsx';
import exampleData from './ExampleRelatedProducts.js';
import './related-list.css';

const RelatedList = () => {
  const [current, setCurrent] = useState(0);
  const len = exampleData.exampleRelated.length;

  const listRef = useRef(null);

  const nextCard = () => {
    let newCurrent = current;
    if (newCurrent !== len - 1) {
      newCurrent = current + 1;
    }
    if (listRef.current) {
      listRef.current.scrollBy({
        top: 0,
        left: 231,
        behavior: 'smooth',
      })
    }
    setCurrent(newCurrent);
  };

  const prevCard = () => {
    let newCurrent = 0;
    if (newCurrent > 0) {
      newCurrent = current - 1;
    }
    if (listRef.current) {
      listRef.current.scrollBy({
        top: 0,
        left: -231,
        behavior: 'smooth',
      });
    }
    setCurrent(newCurrent);
  };

  return (
    <div className="related">
      <div className="related-list" ref={listRef}>
      <button className="btn-related-left" onClick={prevCard}>prev</button>
        {exampleData.exampleRelated.map((product) => (
          <RelatedCard key={product.id} product={product} />
        ))}
      <button className="btn-related-right" onClick={nextCard}>next</button>
      </div>
    </div>
  );
};

export default RelatedList;
