import React, {useState, useEffect} from 'react';
import axios from 'axios';
import options from '../config/config.js'
import './related.css';
import emptyStar from 'star-icon-empty.png';

const RelatedCard = (props) => {
  const [styles, setStyles] = useState([]);
  const [relatedImg, setRelatedImg] = useState('');
  const [salePrice, setSalePrice] = useState('');
  const [defaultPrice, setDefaultPrice] = useState('');

  const getRelatedStylesFromIds =() => {
    axios.get(`${options.url}products/${props.product.id}/styles`, {
      headers: options.headers,
    })
      .then((res) => {
        setStyles(res.data.results);
        setDefaultData(res.data);
      })
      .catch((res, err) => {
        res.end('Could not get related styles: ', err);
      });
  }

  const setDefaultData = (stylesObj) => {
    let relatedStyleInd = 0;
    for (let i = 0; i < stylesObj.results.length; i++) {
      if (stylesObj.results[i]['default?']) {
        relatedStyleInd = i;
        break;
      }
    }
    setRelatedImg(stylesObj.results[relatedStyleInd].photos[0].thumbnail_url);
    setDefaultPrice(props.product.default_price);
    setSalePrice(stylesObj.results[relatedStyleInd].sale_price);
  }

  useEffect(() => {
    getRelatedStylesFromIds();
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
      <div className="card-add-star">
        <img src={emptyStar} alt="star_icon_empty" />
      </div>
      <div className="card-category">
        {props.product.category.toUpperCase()}
      </div>
      <div className="card-name">
        {props.product.name}
      </div>
      <div className="card-price">
        <div className="card-default-price">{defaultPrice}</div>
        <div className="card-sale-price">{salePrice || ''}</div>
      </div>
      <div className="card-rating">[rating]</div>
    </div>
  );
};

export default RelatedCard;
