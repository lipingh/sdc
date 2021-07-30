import React, { useState, useReducer, useEffect } from 'react';
import axios from 'axios';
import options from '../config/config.js';
import RelatedList from './RelatedList.jsx';
import OutfitList from './OutfitList.jsx';

export const OutfitContext = React.createContext();

const RelatedAndOutfit = () => {
  const [outfits, setOutfits] = useState([]);

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
        })
        .catch((res, err) => {
          res.end('Could not get outfits from ids: ', err);
        });
    });
  };

  const getOutfits = () => {
    let storageOutfits = JSON.parse(window.localStorage.getItem('outfits'));
    if (!Array.isArray(storageOutfits)) {
      window.localStorage.setItem('outfits', JSON.stringify([]));
      storageOutfits = [];
    }
    getOutfitsFromIds(storageOutfits);
  };

  useEffect(() => {
    getOutfits();
  }, []);

  const handleOutfitAction = (bool, cardId) => {
    let storageOutfits = JSON.parse(window.localStorage.getItem('outfits'));
    if (bool) {
      storageOutfits.push(cardId);
      window.localStorage.setItem('outfits', JSON.stringify(storageOutfits));
    } else {
      for (let j = 0; j < storageOutfits.length; j += 1) {
        if (storageOutfits[j] === cardId) {
          storageOutfits.splice(j, 1);
          break;
        }
      };
      window.localStorage.setItem('outfits', JSON.stringify(storageOutfits));
    }
  };

  return (
    <div id="comp-modal-portal" className="related-outfit">
      RELATED AND OUTFIT
      <OutfitContext.Provider value={{ outfits, handleOutfitAction }}>
        <div className="related-section">Related Products</div>
        <RelatedList />
        <div className="outfit-section">Your Outfit</div>
        <OutfitList />
      </OutfitContext.Provider>
    </div>
  );
};

export default RelatedAndOutfit;
