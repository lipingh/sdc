import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import RelatedCard from './RelatedCard.jsx';
import './list.css';
import options from '../config/config.js';

const RelatedList = () => {
  const [currProduct, setCurrProduct] = useState({});
  const [current, setCurrent] = useState(0);
  const [len, setLen] = useState(0);
  const [related, setRelated] = useState([]);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [cards, setCards] = useState(3);

  const getRelatedFromIds = (idList) => {
    const relatedList = [];
    idList.forEach((id) => {
      axios.get(`${options.url}products/${id}`, {
        headers: options.headers,
      })
        .then((res) => {
          // condition should eventually use id of the current page (from global state) to ignore it
          if (id !== 13029) {
            relatedList.push(res.data);
            const newRelated = related.concat(relatedList);
            setRelated(newRelated);
          } else {
            setCurrProduct(res.data);
          }
        })
        .catch((err) => {
          throw err;
        });
    });
  };

  const getRelated = () => {
    // should eventually use id of the current page (global state not hard code)
    axios.get(`${options.url}products/13029/related`, {
      headers: options.headers,
    })
      .then((res) => {
        setLen(res.data.length - 1);
        getRelatedFromIds(res.data);
      })
      .catch((err) => {
        throw err;
      });
  };

  const updateWidth = () => {
    setWindowWidth(window.innerWidth);
  };

  useEffect(() => {
    getRelated();
    window.addEventListener('resize', updateWidth);
    return () => { window.removeEventListener('resize', updateWidth); };
  }, []);

  useEffect(() => {
    let possibleCards = Math.floor((windowWidth - 100) / 230);
    if (possibleCards >= len) {
      possibleCards = len;
    }
    setCards(possibleCards);
  }, [windowWidth]);

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
      });
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
    <div className="list-section">
      {current !== 0 && <button type="button" className="btn-list-left" onClick={prevCard}>prev</button>}
      <div className="list-cards" style={{ width: `${cards * 230}px` }} ref={listRef}>
        {related.map((product) => (
          <RelatedCard key={product.id} product={product} currProduct={currProduct} />
        ))}
      </div>
      {current !== len - cards && <button type="button" className="btn-list-right" onClick={nextCard}>next</button>}
    </div>
  );
};

export default RelatedList;
