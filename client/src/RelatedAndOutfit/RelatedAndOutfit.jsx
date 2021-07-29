import React, {useState} from 'react';
import RelatedList from './RelatedList.jsx';
import axios from 'axios';
import options from '../config/config.js';

const RelatedAndOutfit = () => (
  <div id="comp-modal-portal" className="related-outfit">
    RELATED AND OUTFIT
    <RelatedList />
  </div>
);

export default RelatedAndOutfit;
