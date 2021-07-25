import React, { useState } from 'react';
import RelatedCard from './RelatedCard.jsx';

function RelatedList() {
  return (
    <div>
      List
      <ul>
        <RelatedCard />
        <RelatedCard />
        <RelatedCard />
      </ul>
    </div>
  )
}

export default RelatedList;
