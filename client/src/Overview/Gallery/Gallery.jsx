import React, { useState, useEffect } from 'react';
import axios from 'axios';
import style from './Gallery.module.css';
import options from '../../config/config.js';

const Gallery = () => {
  const [styles, setStyles] = useState([]);
  const [images, setImages] = useState([]);
  const [currImg, setCurrImg] = useState('');

  useEffect(() => {
    axios.get(`${options.url}products/20100/styles`, { headers: options.headers })
      .then((response) => {
        const imgs = response.data.results[0].photos.map((photo) => photo.url);
        setImages(imgs);
        setStyles(response.data.results);
        setCurrImg(imgs[0]);
      })
      .catch((err) => {
        console.log('styles data fetching err', err);
      });
  }, []);

  return (
    <div className={style.gallery}>
      <div className={style.thumbnail}></div>
      <div className={style.mainImage}>
        <button type="button" className={style.clickPrev}>&lt;</button>
        <img src={currImg} alt="selected style" className={style.image} />
        <button type="button" className={style.clickNext}>&gt;</button>
      </div>
    </div>
  );
};

export default Gallery;
