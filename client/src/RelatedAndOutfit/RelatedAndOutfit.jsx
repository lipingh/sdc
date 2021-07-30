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
          console.log('data: ', res.data);
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
      window.localStorage.setItem('outfits', JSON.stringify([13031]));
      storageOutfits = [];
    }
    getOutfitsFromIds(storageOutfits);
  };

  useEffect(() => {
    getOutfits();
  }, []);

  return (
    <div id="comp-modal-portal" className="related-outfit">
      RELATED AND OUTFIT
      <OutfitContext.Provider value={{ outfits, setOutfits }}>
        <div className="related-section">Related Products</div>
        <RelatedList />
        <div className="outfit-section">Your Outfit</div>
        <OutfitList />
      </OutfitContext.Provider>
    </div>
  );
};

export default RelatedAndOutfit;
