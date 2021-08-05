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
      <img
        src={url}
        alt=""
        onClick={() => handleClickPhoto(id)}
        onKeyPress={() => { }}
        role="presentation"
      />
    </div>,
    document.getElementById('image-modal'),
  );
};

export default ImageModal;
