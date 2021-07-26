import React, {useState} from 'react';
import exampleData from './ExampleRelatedProducts.js'

const RelatedCard = (props) => {
  let relatedIndex = -1;
  for (let i = 0; i < exampleData.relatedStyles.length; i++) {
    if (Number.parseInt(exampleData.relatedStyles[i].product_id, 10) === props.product.id) {
      relatedIndex = i;
      break;
    }
  }
  const relatedObj = exampleData.relatedStyles[relatedIndex];
  return (
    <div className="related-card">
      <img
        src={relatedObj.results[0].photos[0].thumbnail_url}
        alt={relatedObj.results[0].name}
        width="200"
        height="200"
      />
      <div>
        Product Category
      </div>
    </div>
  );
};

export default RelatedCard;
