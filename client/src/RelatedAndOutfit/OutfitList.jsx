import React, {
  useState, useRef, useEffect, useContext,
} from 'react';
import OutfitCard from './OutfitCard.jsx';
import './list.css';
import { OutfitContext } from './RelatedAndOutfit.jsx';
import { handleOutfitAction, getOutfits } from './helpers.js';
import { globalContext } from '../index.jsx';

const OutfitList = () => {
  const [current, setCurrent] = useState(0);
  const [len, setLen] = useState(0);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [cards, setCards] = useState(0);
  const outfitsContext = useContext(OutfitContext);
  const globalData = useContext(globalContext);
  const [isInOutfit, setIsInOutfit] = useState(false);

  const updateWidth = () => {
    setWindowWidth(window.innerWidth);
  };

  const checkInOutfit = () => {
    let match = false;
    getOutfits().forEach((id) => {
      if (id === globalData.state.productId) {
        match = true;
      }
    });
    setIsInOutfit(match);
  };

  useEffect(() => {
    checkInOutfit();
    window.addEventListener('resize', updateWidth);
    return () => { window.removeEventListener('resize', updateWidth); };
  }, []);

  useEffect(() => {
    checkInOutfit();
    setLen(outfitsContext.outfits.length + 1);
  }, [outfitsContext.outfits, isInOutfit]);

  const setPossibleCards = () => {
    let possibleCards = Math.floor((windowWidth - 100) / 230);
    if (possibleCards >= len) {
      possibleCards = len;
    }
    setCards(possibleCards);
  };

  useEffect(() => {
    setPossibleCards();
  }, [windowWidth, len]);

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

  const handleAddToOutfit = () => {
    globalData.dispatch({ type: 'updateOutfitIds', data: handleOutfitAction(true, globalData.state.productId) });
  };

  return (
    <div className="list-section">
      <div className="list-btn-container">
        {current !== 0 && <button type="button" className="btn-list-left" onClick={prevCard}>&#10094;</button>}
      </div>
      <div className="list-cards" style={{ width: `${cards * 230}px` }} ref={listRef}>
        {isInOutfit
          ? (
            <div className="list-card">
              <div className="added-card-text">
                <div className="plus-add-card">&#10003;</div>
                <div className="text-add-card">Added to Outfit!</div>
              </div>
            </div>
          )
          : (
            <div className="add-outfit-card" onClick={() => (handleAddToOutfit())}>
              <div className="add-card-text">
                <div className="plus-add-card">+</div>
                <div className="text-add-card">Add to Outfit</div>
              </div>
            </div>
          )}
        {outfitsContext.outfits.map((product) => (
          <OutfitCard key={product.id} product={product} />
        ))}
      </div>
      <div className="list-btn-container">
        {current < len - cards && <button type="button" className="btn-list-right" onClick={nextCard}>&#10095;</button>}
      </div>
    </div>
  );
};

export default OutfitList;
