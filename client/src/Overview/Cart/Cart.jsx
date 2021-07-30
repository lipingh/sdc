import React, {
  useState, useEffect, useContext, useRef,
} from 'react';
import axios from 'axios';
import options from '../../config/config.js';
import { ExpandContext } from '../Overview.jsx';
import style from './Cart.module.css';

const Cart = () => {
  const contextData = useContext(ExpandContext);
  // const [sku, setSku] = useState({});
  const [skuIds, setSkuIds] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedQuan, setSelectedQuan] = useState('');
  const [availableQuantity, setAvailableQuantity] = useState(0);
  const selectSize = useRef(null);
  const selectQuantity = useRef(null);

  const sizeChangeHandler = () => {
    setSelectedSize(selectSize.current.value);
    setAvailableQuantity(quantities[selectSize.current.value]);
  };

  const quantityChangeHandler = () => {
    setSelectedQuan(selectQuantity.current.value);
  };

  useEffect(() => {
    axios.get(`${options.url}products/${contextData.currState.productId}/styles`, { headers: options.headers })
      .then((response) => {
        // const skuData = {};
        const skuIdData = [];
        const sizeData = [];
        const quantityData = {};
        for (const [key, value] of Object.entries(response.data.results[contextData.currState.styleIndex].skus)) {
          if (key !== 'null') {
            // skuData[key] = value;
            skuIdData.push(key);
            sizeData.push(value.size);
            quantityData[value.size] = value.quantity; // {'M': 12}
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
      {sizes.length
        ? (
          <select name="sizes" ref={selectSize} onChange={sizeChangeHandler}>
            <option value="">SELECT SIZE</option>
            {sizes.map((size, index) => (<option value={size} key={index}>{size}</option>))}
          </select>
        ) : <select name="sizes" disabled><option value="">OUT OF STOCK</option></select>}
      {availableQuantity > 0
        ? (
          <select name="quantities" ref={selectQuantity} onChange={quantityChangeHandler}>
            <option value="1">1</option>
            {availableQuantity >= 15
              ? (
                [...Array(14)].map((element, index) => (
                  <option value={index + 2} key={index}>{index + 2}</option>))
              ) : [...Array(availableQuantity - 1)].map((element, index) => (
                <option value={index + 2} key={index}>{index + 2}</option>))}
          </select>
        ) : <select name="quantities" disabled><option value="">-</option></select>}
    </div>
  );
};

export default Cart;
