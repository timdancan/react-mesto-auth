const PopupWithForm = ({title, name, buttonText, children, isOpen, onClose}) => {
  const onCloseClick = () => {
    onClose()
  }
  return (
    <div className={`popup popup_${name} ${isOpen ? 'popup_visiable' : false}`}>
      <div className={`popup__content popup__content_${name}`}>
        <button className={`popup__close popup__close_${name} page-link`} type="button" onClick={onCloseClick}></button>
        <h3 className={`popup__title popup__title_${name}`}>{title}</h3>
        <form
          className={`popup__form popup__form_${name}`}
          name={`popup-${name}`}
          noValidate
        >
          {children}
          <button className={`popup__button popup__button_${name}`} type="submit">
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
};

export default PopupWithForm;
