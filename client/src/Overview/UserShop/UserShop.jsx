import React from 'react';
import ProductInfo from '../ProductInfo/ProductInfo.jsx';
import StyleSelector from '../StyleSelector/StyleSelector.jsx';
import Cart from '../Cart/Cart.jsx';
import style from './UserShop.module.css';

const UserShop = () => (
  <div className={style.userShop}>
    <ProductInfo />
    <StyleSelector />
    <Cart />
  </div>
);

export default UserShop;
