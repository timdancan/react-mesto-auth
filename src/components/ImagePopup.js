const ImagePopup = () => {
  return (
    <div className="popup popup_img">
      <div className="popup__container">
        <div className="popup__img-container">
          <img
            src="https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg"
            alt="выбранная картинка"
            className="popup__img"
          />
        </div>
        <p className="popup__text"></p>
        <button className="popup__close popup__close_img page-link"></button>
      </div>
    </div>
  );
};

export default ImagePopup;
