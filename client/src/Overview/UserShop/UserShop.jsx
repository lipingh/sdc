import React from 'react';
import ProductInfo from '../ProductInfo/ProductInfo.jsx';
import StyleSelector from '../StyleSelector/StyleSelector.jsx';
import style from './UserShop.module.css';

const UserShop = () => (
  <div className={style.userShop}>
    <ProductInfo />
    <StyleSelector />
  </div>
);

export default UserShop;
