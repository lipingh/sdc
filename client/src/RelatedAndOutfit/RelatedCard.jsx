import React, {useState} from 'react';
import exampleData from './ExampleRelatedProducts.js'

const RelatedCard = (props) => {
  let relatedIndex = -1;
  let relatedStyleInd = 0;
  for (let i = 0; i < exampleData.relatedStyles.length; i++) {
    if (Number.parseInt(exampleData.relatedStyles[i].product_id, 10) === props.product.id) {
      relatedIndex = i;
      for (let j = 0; j < exampleData.relatedStyles[i].results.length; j++) {
        if (exampleData.relatedStyles[i].results[j]['default?']) {
          relatedStyleInd = j;
          break;
        }
      }
      break;
    }
  }
  const relatedImg = exampleData.relatedStyles[relatedIndex].results[relatedStyleInd].photos[0].thumbnail_url;
  const defaultPrice = props.product.default_price;
  const salePrice = exampleData.relatedStyles[relatedIndex].results[relatedStyleInd].sale_price;
  return (
    <div className="list-card">
      <img
        src={relatedImg}
        alt={props.product.name}
        width="200"
        height="200"
        className="card-img"
      />
      <div className="card-add-star"></div>
      <div className="card-category">
        {props.product.category.toUpperCase()}
      </div>
      <div className="card-name">
        {props.product.name}
      </div>
      <div className="card-price">
        <div className="card-default-price">{defaultPrice}</div>
        <div className="card-sale-price">{salePrice ? salePrice : ''}</div>
      </div>
      <div className="card-rating"></div>
    </div>
  );
};

export default RelatedCard;
