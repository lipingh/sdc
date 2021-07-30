import React from 'react';
import RelatedList from './RelatedList.jsx';
import OutfitList from './OutfitList.jsx'

const RelatedAndOutfit = () => (
  <div id="comp-modal-portal" className="related-outfit">
    RELATED AND OUTFIT
    <div className="related-section">Related Products</div>
    <RelatedList />
    <div className="outfit-section">Your Outfit</div>
    <OutfitList />
  </div>
);

export default RelatedAndOutfit;
