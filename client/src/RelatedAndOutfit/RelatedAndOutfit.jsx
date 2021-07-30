import React, { useState, useReducer, useEffect } from 'react';
import RelatedList from './RelatedList.jsx';
import OutfitList from './OutfitList.jsx';

export const OutfitContext = React.createContext();

const RelatedAndOutfit = () => {
  const getOutfits = () => {
    let storageOutfits = JSON.parse(window.localStorage.getItem('outfits'));
    if (!Array.isArray(storageOutfits)) {
      window.localStorage.setItem('outfits', JSON.stringify([13031]));
      storageOutfits = [];
    }
    console.log('from parent: ', storageOutfits);
    return storageOutfits;
  };

  const [outfits, setOutfits] = useState(getOutfits());

  useEffect(() => {
    setOutfits(getOutfits());
  }, []);

  return (
    <div id="comp-modal-portal" className="related-outfit">
      RELATED AND OUTFIT
      <OutfitContext.Provider value={{ outfits, getOutfits }}>
        <div className="related-section">Related Products</div>
        <RelatedList />
        <div className="outfit-section">Your Outfit</div>
        <OutfitList />
      </OutfitContext.Provider>
    </div>
  );
};

export default RelatedAndOutfit;
