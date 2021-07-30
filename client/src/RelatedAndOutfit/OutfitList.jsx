import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import OutfitCard from './OutfitCard.jsx';
import './related-list.css';
import options from '../config/config.js';

const OutfitList = () => {
  const [currProduct, setCurrProduct] = useState({});
  const [current, setCurrent] = useState(0);
  const [len, setLen] = useState(0);
  const [outfits, setOutfits] = useState([]);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [cards, setCards] = useState(3);

  const getOutfitsFromIds = (idList) => {
    const outfitsList = [];
    idList.forEach((id) => {
      axios.get(`${options.url}products/${id}`, {
        headers: options.headers,
      })
        .then((res) => {
          if (id !== 13029) {
            outfitsList.push(res.data);
            const newRelated = outfits.concat(outfitsList);
            setOutfits(newRelated);
          } else {
            setCurrProduct(res.data);
          }
        })
        .catch((res, err) => {
          res.end('Could not get outfits from ids: ', err);
        });
    });
  };

  const getOutfits = () => {
    axios.get(`${options.url}products/13029/related`, {
      headers: options.headers,
    })
      .then((res) => {
        setLen(res.data.length - 1);
        getOutfitsFromIds(res.data);
      })
      .catch((res, err) => {
        res.end('Could not get outfits: ', err);
      });
  };

  const updateWidth = () => {
    setWindowWidth(window.innerWidth);
  };

  useEffect(() => {
    getOutfits();
    window.addEventListener('resize', updateWidth);
    return () => { window.removeEventListener('resize', updateWidth); };
  }, []);

  useEffect(() => {
    const possibleCards = Math.floor((windowWidth - 100) / 230);
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
    <div className="related">
      {current !== 0 && <button type="button" className="btn-related-left" onClick={prevCard}>prev</button>}
      <div className="related-list" style={{ width: `${cards * 230}px` }} ref={listRef}>
        {outfits.map((product) => (
          <OutfitCard key={product.id} product={product} currProduct={currProduct} />
        ))}
      </div>
      {current !== len - cards && <button type="button" className="btn-related-right" onClick={nextCard}>next</button>}
    </div>
  );
};

export default OutfitList;
