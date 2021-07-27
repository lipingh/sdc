import React, { useState, useRef, useEffect } from 'react';
import RelatedCard from './RelatedCard.jsx';
import exampleData from './ExampleRelatedProducts.js';
import axios from 'axios';
import './related-list.css';
import options from '../config/config.js';

const RelatedList = () => {
  const [current, setCurrent] = useState(0);
  const [len, setLen] = useState(0);
  const [relatedIds, setRelatedIds] = useState([]);
  const [related, setRelated] = useState([]);
  const [relatedStyles, setRelatedStyles] = useState([]);

  const getRelated = () => {
    axios.get(`${options.url}products/13029/related`, {
      headers: options.headers,
    })
      .then(res => {
        setLen(res.data.length);
        getRelatedFromIds(res.data);
      })
      .catch((res, err) => {
        res.end('Could not get related: ', err);
      })
  }

  const getRelatedFromIds = (idList) => {
    let relatedList = []
    idList.forEach(id => {
      axios.get(`${options.url}products/${id}`, {
        headers: options.headers,
      })
        .then(res => {
          relatedList.push(res.data);
          setRelated([...related, relatedList])
        })
    })
  }

  useEffect(() => {
    getRelated();
  }, []);

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
    if (current > 0) {
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
      {current !== 0 && <button className="btn-related-left" onClick={prevCard}>prev</button>}
      <div className="related-list" ref={listRef}>
        {exampleData.exampleRelated.map((product) => (
          <RelatedCard key={product.id} product={product} />
        ))}
      </div>
      {current !== len - 4 && <button className="btn-related-right" onClick={nextCard}>next</button>}
    </div>
  );
};

export default RelatedList;
