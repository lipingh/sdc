import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import options from '../config/config.js';
import RelatedList from './RelatedList.jsx';
import OutfitList from './OutfitList.jsx';
import { getOutfits } from './helpers.js';
import { globalContext } from '../index.jsx';

export const OutfitContext = React.createContext();

const RelatedAndOutfit = () => {
  const [outfits, setOutfits] = useState([]);
  const [outfitIds, setOutfitIds] = useState([]);

  const getOutfitsFromIds = (idList) => {
    const getOutfitsArray = idList.map((id) => new Promise((resolve, reject) => {
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
    Promise.all(getOutfitsArray)
      .then((value) => {
        setOutfits(value);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getOutfitsFromIds(getOutfits());
  }, []);

  useEffect(() => {
    getOutfitsFromIds(outfitIds);
  }, [outfitIds]);

  return (
    <div id="comp-modal-portal" className="related-outfit">
      RELATED AND OUTFIT
      <OutfitContext.Provider value={{ outfits, setOutfitIds }}>
        <div className="related-section">Related Products</div>
        <RelatedList />
        <div className="outfit-section">Your Outfit</div>
        <OutfitList />
      </OutfitContext.Provider>
    </div>
  );
};

export default RelatedAndOutfit;
