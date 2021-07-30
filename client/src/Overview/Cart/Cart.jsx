import React, { useState, useEffect, useContext, useRef } from 'react';
import axios from 'axios';
import options from '../../config/config.js';
import { ExpandContext } from '../Overview.jsx';
import style from './Cart.module.css';

const Cart = () => {
  const contextData = useContext(ExpandContext);
  // const [sku, setSku] = useState({});
  const [skuIds, setSkuIds] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [quantities, setQuantities] = useState([]);
  const [selectedSize, setSelectedSize] = useState('');
  const select = useRef(null);

  const sizeChangeHandler = () => {
    setSelectedSize(select.current.value);
  };

  useEffect(() => {
    axios.get(`${options.url}products/${contextData.currState.productId}/styles`, { headers: options.headers })
      .then((response) => {
        // const skuData = {};
        const skuIdData = [];
        const sizeData = [];
        const quantityData = [];
        for (const [key, value] of Object.entries(response.data.results[contextData.currState.styleIndex].skus)) {
          if (key !== 'null') {
            // skuData[key] = value;
            skuIdData.push(key);
            sizeData.push(value.size);
            let temp = {};
            temp[value.size] = value.quantity; // {'M': 12}
            quantityData.push(temp);
          }
        }
        // setSku(skuData);
        setSizes(sizeData);
        setSkuIds(skuIdData);
        setQuantities(quantityData);
      })
      .catch((err) => {
        console.log('styles data fetching err', err);
      });
  }, [contextData.currState.styleIndex, contextData.currState.productId]);
  return (
    <div>
      <select name="sizes" ref={select} onChange={sizeChangeHandler}>
        <option value="">SELECT SIZE</option>
        {sizes.map((size, index) => (<option value={size} key={index}>{size}</option>))}
      </select>
    </div>
  );
};

export default Cart;
