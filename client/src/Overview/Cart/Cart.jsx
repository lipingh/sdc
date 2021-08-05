import React, {
  useState, useEffect, useContext, useRef,
} from 'react';
import axios from 'axios';
import options from '../../config/config.js';
import { ExpandContext } from '../Overview.jsx';
import { globalContext } from '../../index.jsx';
import style from './Cart.module.css';
import emptyHeart from './emptyheart.png';
import pinkHeart from './pinkheart.png';
import helperMethods from '../../RelatedAndOutfit/helpers.js';

const Cart = () => {
  const contextData = useContext(ExpandContext);
  const globalData = useContext(globalContext);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedQuan, setSelectedQuan] = useState('');
  const [availableQuantity, setAvailableQuantity] = useState(0);
  const selectSize = useRef(null);
  const selectQuantity = useRef(null);
  const [isFavorite, setIsFavorite] = useState(false);

  const sizeChangeHandler = () => {
    setSelectedSize(selectSize.current.value);
    setAvailableQuantity(contextData.currState.quantities[selectSize.current.value]);
  };

  const quantityChangeHandler = () => {
    setSelectedQuan(selectQuantity.current.value);
  };

  const favClickHandler = () => {
    if (!isFavorite) { // add to local storage
      globalData.dispatch({ type: 'updateOutfitIds', data: helperMethods.handleOutfitAction(true, globalData.state.productId) });
    } else { // remove from local storage
      globalData.dispatch({ type: 'updateOutfitIds', data: helperMethods.handleOutfitAction(false, globalData.state.productId) });
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
    Object.keys(contextData.currState.sku).forEach((skuId) => {
      if (contextData.currState.sku[skuId].size === selectedSize) {
        addProduct(skuId, selectedQuan);
      }
    });
  };

  useEffect(() => {
    setSelectedSize('');
    setAvailableQuantity(0);
    if (globalData.state.outfits.includes(globalData.state.productId)) {
      setIsFavorite(true);
    } else {
      setIsFavorite(false);
    }
  }, [contextData.currState.styleIndex, globalData.state.productId, globalData.state.outfits]);
  return (
    <div className={style.cart}>
      {contextData.currState.sizes.length > 0
        ? (
          <select name="sizes" ref={selectSize} value={selectedSize} onChange={sizeChangeHandler} className={style.size}>
            <option value="">SELECT SIZE</option>
            {contextData.currState.sizes.map(
              (size, index) => (<option value={size} key={index}>{size}</option>),
            )}
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
      {contextData.currState.sizes.length > 0 && <button type="button" className={style.addButton} onClick={buttonClickHandler}>Add To Bag</button>}
      {isFavorite ? <img src={pinkHeart} alt="favorite button" className={style.favorite} onClick={favClickHandler} />
        : <img src={emptyHeart} alt="favorite button" className={style.favorite} onClick={favClickHandler} />}
    </div>
  );
};

export default Cart;
