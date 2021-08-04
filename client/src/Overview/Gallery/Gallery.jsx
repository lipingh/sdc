import React, {
  useState, useEffect, useRef, useContext,
} from 'react';
import style from './Gallery.module.css';
import { ExpandContext } from '../Overview.jsx';

const Gallery = () => {
  const [currImgIndex, setCurrImgIndex] = useState(0);
  const [firstThumbnailIdex, setFirstThumbnailIdex] = useState(0);
  const imageMove = useRef(null);
  const entireGallery = useRef(null);
  const contextData = useContext(ExpandContext);

  const buttonClickHandler = (direction) => (
    () => {
      if (direction === 'next') {
        setCurrImgIndex((prevIndex) => prevIndex + 1);
        imageMove.current.scrollBy({
          top: 0,
          left: 360,
          behavior: 'smooth',
        });
        setFirstThumbnailIdex(Math.floor(currImgIndex / 4) * 5);
      } else if (direction === 'prev') {
        setCurrImgIndex((prevIndex) => prevIndex - 1);
        imageMove.current.scrollBy({
          top: 0,
          left: -360,
          behavior: 'smooth',
        });
        setFirstThumbnailIdex(Math.floor(currImgIndex / 6) * 5);
      } else if (direction === 'up') {
        setFirstThumbnailIdex((prevIndex) => prevIndex - 5);
      } else if (direction === 'down') {
        setFirstThumbnailIdex((prevIndex) => prevIndex + 5);
      }
    }
  );

  const thumbnailClickHandler = (index) => (
    () => {
      const distance = (index - currImgIndex) * 360;
      imageMove.current.scrollBy({
        top: 0,
        left: distance,
        behavior: 'smooth',
      });
      setCurrImgIndex(index);
    }
  );

  const mainImageClickHandler = () => {
    if (!contextData.currState.isExpanded) {
      contextData.dispatchFunc({ type: 'expand' });
      entireGallery.current.style.width = '100%';
    }
  };

  const expandImgClickHandler = (event) => {
    event.target.classList.add(style.zoomImage);
    const magnifyArea = document.getElementById('magnifyArea');
    const magnifyImg = event.target;

    function listener(e) {
      let clientX = e.clientX - magnifyArea.offsetLeft;
      let clientY = e.clientY - magnifyArea.offsetTop;

      const w = magnifyArea.offsetWidth;
      const h = magnifyArea.offsetHeight;

      clientX = (clientX / w) * 70;
      clientY = (clientY / h) * 70;
      magnifyImg.style.transform = `translate(-${clientX}%, -${clientY}%) scale(2.5)`;
    }
    magnifyArea.addEventListener('mousemove', listener);

    magnifyArea.addEventListener('mouseleave', () => {
      magnifyImg.style.transform = 'translate(-50%, -50%) scale(1)';
      magnifyArea.removeEventListener('mousemove', listener);
    });
  };

  const expandButtonClickHandler = () => {
    if (!contextData.currState.isExpanded) {
      contextData.dispatchFunc({ type: 'expand' });
      entireGallery.current.style.width = '100%';
    } else {
      contextData.dispatchFunc({ type: 'unexpand' });
      entireGallery.current.style.width = '65%';
    }
  };

  return (
    <div className={style.gallery} ref={entireGallery}>
      <div className={style.sideBar}>
        {firstThumbnailIdex !== 0 && <button type="button" onClick={buttonClickHandler('up')} className={style.upclick}>&and;</button>}
        <div className={style.thumbnails}>
          {contextData.currState.thumbnails.slice(firstThumbnailIdex, firstThumbnailIdex + 5).map((url, index) => (
            <div className={style.selected} key={firstThumbnailIdex + index}>
              <img
                src={url}
                alt="selected style thumbnail"
                className={style.eachThumbnail}
                onClick={thumbnailClickHandler(firstThumbnailIdex + index)}
              />
              {firstThumbnailIdex + index === currImgIndex && <div className={style.highlight} />}
            </div>
          ))}
        </div>
        {firstThumbnailIdex + 5 < contextData.currState.thumbnails.length && <button type="button" onClick={buttonClickHandler('down')} className={style.downclick}>&or;</button>}
      </div>
      <div className={style.mainGallery}>
        {currImgIndex !== 0 ? <button type="button" className={style.clickPrev} onClick={buttonClickHandler('prev')}>&lt;</button>
          : <div />}
        {contextData.currState.isExpanded
          ? (
            <div className={style.mainImage} id="magnifyArea" ref={imageMove}>
              {contextData.currState.images.map((imageurl, index) => (
              <img src={imageurl} alt="selected style" className={style.image} key={index} onClick={expandImgClickHandler}/>
              ))}
            </div>
          ) : (
            <div className={style.mainImage} ref={imageMove}>
              {contextData.currState.images.map((imageurl, index) => (
              <img src={imageurl} alt="selected style" className={style.image} key={index} onClick={mainImageClickHandler} />
              ))}
            </div>
          )}
        {currImgIndex !== contextData.currState.images.length - 1 ? <button type="button" className={style.clickNext} onClick={buttonClickHandler('next')}>&gt;</button>
          : <div />}
        <div className={style.expand} onClick={expandButtonClickHandler} />
      </div>
    </div>
  );
};

export default Gallery;
