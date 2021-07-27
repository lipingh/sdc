import React, {useState, useEffect} from 'react';
import exampleData from './ExampleRelatedProducts.js';
import './related.css';

const RelatedCard = (props) => {
  const [relatedImg, setRelatedImg] = useState('');
  const [salePrice, setSalePrice] = useState('');
  const [defaultPrice, setDefaultPrice] = useState('');

  console.log('product: ', props.product)
  const retrieveDefaultData = () => {
    console.log('props styles: ', props.styles);
    let relatedIndex = -1;
    let relatedStyleInd = 0;
    for (let i = 0; i < props.styles.results.length; i++) {
      if (props.styles.results[i]['default?']) {
        relatedStyleInd = i;
        break;
      }
    }
    setRelatedImg(props.styles.results[relatedStyleInd].photos[0].thumbnail_url);
    setDefaultPrice(props.product.default_price);
    setSalePrice(props.styles.results[relatedStyleInd].sale_price);
  }

  useEffect(() => {
    retrieveDefaultData(props.styles)
  }, [])

  return (
    <div className="list-card">
      <img
        src={relatedImg}
        alt={props.product.name}
        width="200"
        height="200"
        className="card-img"
      />
      <div className="card-add-star">star</div>
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
      <div className="card-rating">[rating]</div>
    </div>
  );
};

export default RelatedCard;
