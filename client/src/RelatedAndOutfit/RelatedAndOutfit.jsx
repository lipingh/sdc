import React, { useState, useReducer, useEffect } from 'react';
import axios from 'axios';
import options from '../config/config.js';
import RelatedList from './RelatedList.jsx';
import OutfitList from './OutfitList.jsx';
import { getOutfits } from './helpers.js';

export const OutfitContext = React.createContext();

const RelatedAndOutfit = () => {
  const [outfits, setOutfits] = useState([]);
  const [outfitIds, setOutfitIds] = useState([]);

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
        .catch((err) => {
          throw err;
        });
    });
  };

  useEffect(() => {
    getOutfitsFromIds(getOutfits());
  }, []);

  useEffect(() => {
    console.log('newIds: ', outfitIds);
    getOutfitsFromIds(outfitIds);
  }, [outfitIds]);

  // const listenStorage = () => {
  //   console.log(JSON.parse(window.localStorage.getItem('outfits')));
  //   setOutfitIds(JSON.parse(window.localStorage.getItem('outfits')));
  // };

  // useEffect(() => {
  //   window.addEventListener('storage', listenStorage);
  //   return () => {
  //     window.removeEventListener('storage', listenStorage);
  //   };
  // }, []);

  // useEffect(() => {
  //   getOutfitsFromIds(outfitIds);
  // }, [outfitIds])

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
