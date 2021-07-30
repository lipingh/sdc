import React, {
  useState, useRef, useEffect, useContext,
} from 'react';
import axios from 'axios';
import OutfitCard from './OutfitCard.jsx';
import './list.css';
import options from '../config/config.js';
import { OutfitContext } from './RelatedAndOutfit.jsx';

const OutfitList = () => {
  const [currProduct, setCurrProduct] = useState({});
  const [current, setCurrent] = useState(0);
  const [len, setLen] = useState(0);
  const [outfits, setOutfits] = useState([]);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [cards, setCards] = useState(0);
  const outfitsContext = useContext(OutfitContext);

  const getOutfitsFromIds = (idList) => {
    const outfitsList = [];
    idList.forEach((id) => {
      axios.get(`${options.url}products/${id}`, {
        headers: options.headers,
      })
        .then((res) => {
          // condition should eventually use id of the current page (from global state) to ignore it
          outfitsList.push(res.data);
          const newOutfits = outfits.concat(outfitsList);
          setOutfits(newOutfits);
          setCurrProduct(res.data);
        })
        .catch((res, err) => {
          res.end('Could not get outfits from ids: ', err);
        });
    });
  };

  // This should be refactored to get a list of ids from local storage
  // const getOutfits = () => {
  //   const storageOutfits = JSON.parse(window.localStorage.getItem('outfits'));
  //   if (!Array.isArray(storageOutfits)) {
  //     window.localStorage.setItem('outfits', JSON.stringify([13031]));
  //     storageOutfits = [];
  //   }
  //   setLen(storageOutfits.length - 1);
  //   getOutfitsFromIds(storageOutfits);
  // };

  const updateWidth = () => {
    setWindowWidth(window.innerWidth);
  };

  useEffect(() => {
    console.log('from component: ', outfitsContext.outfits);
    setLen(outfitsContext.outfits.length - 1);
    getOutfitsFromIds(outfitsContext.outfits);
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
        {outfits.map((product) => (
          <OutfitCard key={product.id} product={product} currProduct={currProduct} />
        ))}
      </div>
      {current !== len - cards && <button type="button" className="btn-list-right" onClick={nextCard}>next</button>}
    </div>
  );
};

export default OutfitList;
