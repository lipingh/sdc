import React, {
  useState, useEffect, useContext, useRef,
} from 'react';
import axios from 'axios';
import options from '../../config/config.js';
import { ExpandContext } from '../Overview.jsx';
import style from './Cart.module.css';
import emptyHeart from './emptyheart.png';
import pinkHeart from './pinkheart.png';
import helperMethods from '../../RelatedAndOutfit/helpers.js';

const Cart = () => {
  const contextData = useContext(ExpandContext);
  const [sku, setSku] = useState({});
  const [sizes, setSizes] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedQuan, setSelectedQuan] = useState('');
  const [availableQuantity, setAvailableQuantity] = useState(0);
  const selectSize = useRef(null);
  const selectQuantity = useRef(null);
  const [isFavorite, setIsFavorite] = useState(false);

  const sizeChangeHandler = () => {
    setSelectedSize(selectSize.current.value);
    setAvailableQuantity(quantities[selectSize.current.value]);
  };

  const quantityChangeHandler = () => {
    console.log(selectedQuan);
    setSelectedQuan(selectQuantity.current.value);
  };

  const favClickHandler = () => {
    if (!isFavorite) { // add to local storage
      helperMethods.handleOutfitAction(true, contextData.currState.productId);
    } else { // remove from local storage
      helperMethods.handleOutfitAction(false, contextData.currState.productId);
    }
    setIsFavorite(!isFavorite);
  };

  const addProduct = (id, quantity) => {
    const data = {
      sku_id: parseInt(id, 10),
      count: parseInt(quantity, 10),
    };
    axios.post(`${options.url}cart`, data, { headers: options.headers })
      .then(() => {
        console.log('successful post request');
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const buttonClickHandler = () => {
    Object.keys(sku).forEach((skuId) => {
      if (sku[skuId].size === selectedSize) {
        addProduct(skuId, selectedQuan);
      }
    });
  };

  useEffect(() => {
    axios.get(`${options.url}products/${contextData.currState.productId}/styles`, { headers: options.headers })
      .then((response) => {
        const skuData = {};
        const sizeData = [];
        const quantityData = {};
        for (const [key, value] of Object.entries(response.data.results[contextData.currState.styleIndex].skus)) {
          if (key !== 'null' && value.quantity > 0) {
            skuData[key] = value;
            sizeData.push(value.size);
            quantityData[value.size] = value.quantity; // {'M': 12}
          }
        }
        setSku(skuData);
        setSizes(sizeData);
        setQuantities(quantityData);
      })
      .catch((err) => {
        console.log('styles data fetching err', err);
      });
  }, [contextData.currState.styleIndex, contextData.currState.productId]);
  return (
    <div className={style.cart}>
      {sizes.length > 0
        ? (
          <select name="sizes" ref={selectSize} onChange={sizeChangeHandler} className={style.size}>
            <option value="">SELECT SIZE</option>
            {sizes.map((size, index) => (<option value={size} key={index}>{size}</option>))}
          </select>
        ) : <select name="sizes" disabled><option value="">OUT OF STOCK</option></select>}
      {availableQuantity > 0
        ? (
          <select name="quantities" ref={selectQuantity} onChange={quantityChangeHandler} className={style.quantity}>
            <option value="1">1</option>
            {availableQuantity >= 15
              ? (
                [...Array(14)].map((element, index) => (
                  <option value={index + 2} key={index}>{index + 2}</option>))
              ) : [...Array(availableQuantity - 1)].map((element, index) => (
                <option value={index + 2} key={index}>{index + 2}</option>))}
          </select>
        ) : <select name="quantities" disabled className={style.quantity}><option value="">-</option></select>}
      {sizes.length > 0 && <button type="button" className={style.addButton} onClick={buttonClickHandler}>Add To Bag</button>}
      {isFavorite ? <img src={pinkHeart} alt="favorite button" className={style.favorite} onClick={favClickHandler} />
        : <img src={emptyHeart} alt="favorite button" className={style.favorite} onClick={favClickHandler} />}
    </div>
  );
};

export default Cart;
