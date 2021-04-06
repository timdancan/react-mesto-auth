import correct from "../images/confirm_icon.svg";
import incorrect from '../images/unconfirm_icon.svg'

export const InfoTooltip = ({onClose, isOpen}) => {
  return (
    <div className={`popup ${isOpen.isOpen ? "popup_visiable" : null}`}>
      <div className={`popup__content popup__content_info`}>
        <button className={`popup__close page-link`} type="button" onClick={onClose}></button>
        <img className="info-icon" src={isOpen.successful ? correct : incorrect} alt="confirm" />
        <p className="info-text">{isOpen.successful ? "Вы успешно зарегистрировались!" : "Что-то пошло не так! Попробуйте ещё раз."}</p>
      </div>
    </div>
  )
}
