import React from 'react';
import ReactDOM from 'react-dom';

const ImageModal = ({
  showFullImage, url, id, handleClickPhoto,
}) => {
  if (!showFullImage) {
    return null;
  }
  return ReactDOM.createPortal(
    <div className="image-window-modal">
      <button type="button" onClick={() => handleClickPhoto(id)}>X</button>
      <img src={url} alt="" />
    </div>,
    document.getElementById('image-modal'),
  );
};

export default ImageModal;
