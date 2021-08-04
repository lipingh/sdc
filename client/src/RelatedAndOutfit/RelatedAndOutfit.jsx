import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import options from '../config/config.js';
import RelatedList from './RelatedList.jsx';
import OutfitList from './OutfitList.jsx';
import { getOutfits } from './helpers.js';
import { globalContext } from '../index.jsx';
import './main.css';

export const OutfitContext = React.createContext();

const RelatedAndOutfit = () => {
  const [outfits, setOutfits] = useState([]);
  const globalData = useContext(globalContext);

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
    getOutfitsFromIds(globalData.state.outfits);
  }, [globalData.state.outfits]);

  return (
    <div id="comp-modal-portal" className="related-outfit">
      <OutfitContext.Provider value={{ outfits }}>
        <div className="related-section">Related Products</div>
        <RelatedList />
        <div className="outfit-section">Your Outfit</div>
        <OutfitList />
      </OutfitContext.Provider>
    </div>
  );
};

export default RelatedAndOutfit;
