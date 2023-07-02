import React from "react";

const ImagePopup = ({ card, close }) => {
  return (
    <div className={`popup popup_type_photo ${card && "popup_opened"}`}>
      <div className="popup__pic-container">
        <button type="button" className="popup__close" onClick={close}></button>
        <img src={`${card?.link}`} alt={card?.name} className="popup__photo-image" />
        <h3 className="popup__pic-name">{card?.name}</h3>
      </div>
    </div>
  );
};

export default ImagePopup;
