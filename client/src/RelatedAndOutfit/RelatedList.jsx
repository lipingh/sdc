import React, {
  useState, useRef, useEffect, useContext,
} from 'react';
import axios from 'axios';
import RelatedCard from './RelatedCard.jsx';
import './list.css';
import options from '../config/config.js';
import { globalContext } from '../index.jsx'

const RelatedList = () => {
  const [currProduct, setCurrProduct] = useState({});
  const [current, setCurrent] = useState(0);
  const [len, setLen] = useState(0);
  const [related, setRelated] = useState([]);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [cards, setCards] = useState(3);
  const globalData = useContext(globalContext);

  const getRelatedFromIds = (idList) => {
    // should eventually use id of the current page (from global state) to set current product
    const relatedIdList = idList.filter((id) => (id !== globalData.state.productId));
    axios.get(`${options.url}products/${globalData.state.productId}`, {
      headers: options.headers,
    })
      .then((res) => {
        setCurrProduct(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    const relatedArray = relatedIdList.map((id) => new Promise((resolve, reject) => {
      axios.get(`${options.url}products/${id}`, {
        headers: options.headers,
      })
        .then((res) => {
          resolve(res.data);
        })
        .catch((err) => {
          reject(err);
        });
    }));
    Promise.all(relatedArray)
      .then((value) => {
        setRelated(value);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getRelated = () => {
    // should eventually use id of the current page (global state not hard code)
    axios.get(`${options.url}products/${globalData.state.productId}/related`, {
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
    window.addEventListener('resize', updateWidth);
    return () => { window.removeEventListener('resize', updateWidth); };
  }, []);

  useEffect(() => {
    getRelated();
  }, [globalData.state.productId]);

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
