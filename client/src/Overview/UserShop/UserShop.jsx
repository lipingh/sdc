import React from 'react';
import ProductInfo from '../ProductInfo/ProductInfo.jsx';
import style from './UserShop.module.css';

const UserShop = () => (
  <div className={style.infoContainer}>
    <ProductInfo />
  </div>
);

export default UserShop;
