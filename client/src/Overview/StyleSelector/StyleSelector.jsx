import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import options from '../../config/config.js';
import { ExpandContext } from '../Overview.jsx';
import style from './StyleSelector.module.css';
import checkmark from './checkmark.png';

const StyleSelector = () => {
  const contextData = useContext(ExpandContext);
  const [styleName, setStyleName] = useState('');
  const [styleThumbnails, setStyleThumbnails] = useState([]);

  useEffect(() => {
    axios.get(`${options.url}products/${contextData.currState.productId}/styles`, { headers: options.headers })
      .then((response) => {
        setStyleName(response.data.results[contextData.currState.styleIndex].name);
        const thumbnails = response.data.results.map((styleObj) => (
          styleObj.photos[0].thumbnail_url
        ));
        setStyleThumbnails(thumbnails);
      })
      .catch((err) => {
        console.log('styles data fetching err', err);
      });
  }, []);
  return (
    <div className={style.styleSelector}>
      <>
        <span className={style.styleText}>STYLE &gt;</span>
        <span className={style.styleName}>{styleName}</span>
      </>
      <div className={style.flex}>
        {styleThumbnails.map((thumbnailurl, index) => (
          <div key={index} className={style.selector}>
            <div className={style.frame}>
              <img src={thumbnailurl} alt="style thumbnail" className={style.thumbnail} />
            </div>
            <div className={style.checkmark}>
              <img src={checkmark} alt="checkmark" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StyleSelector;
