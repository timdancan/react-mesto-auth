import "../pages/index.css";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup"
import {useState} from 'react'

function App() {
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false)
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false)
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false)
  // const [selectedCard, setSelectedCard] = 

  const changeStateEditProfile = () => {
    setEditProfilePopupOpen(true)
  }

  const changeStateAddPlace = () => {
    setAddPlacePopupOpen(true)
  }

  const changeStateAvatarProfile = () => {
    setEditAvatarPopupOpen(true)
  }

  const closeAllPopups = () => {
    setEditProfilePopupOpen(false)
    setAddPlacePopupOpen(false)
    setEditAvatarPopupOpen(false)
  }

  return (
    <div className="App">
      <div className="page">
        <Header />
        <Main onEditProfile={changeStateEditProfile} onAddPlace={changeStateAddPlace} onEditAvatar={changeStateAvatarProfile}/>
        <PopupWithForm
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups} 
          id="edit"
          title="Редактировать профиль"
          name="edit"
          buttonText="Сохранить"
        >
          <label className="popup__label">
            <input
              type="text"
              className="popup__input popup__input_place_title"
              id="input-title"
              name="Name"
              minLength="2"
              maxLength="40"
              required
            />
            <span className="popup__error" id="input-title-error"></span>
          </label>
          <label className="popup__label">
            <input
              type="text"
              className="popup__input popup__input_place_subtitle"
              id="input-subtitle"
              name="Profession"
              minLength="2"
              maxLength="200"
              required
            />
            <span className="popup__error" id="input-subtitle-error"></span>
          </label>
        </PopupWithForm>


        <PopupWithForm
          id="change"
          title="Обновить аватар"
          name="change"
          buttonText="Сохранить"
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups} 
        >
          <label className="popup__label popup__label_change">
            <input
              type="url"
              className="popup__input popup__input_change"
              id="input-change"
              name="Url"
              placeholder="Ссылка на картинку"
              required
            />
            <span className="popup__error" id="input-change-error"></span>
          </label>
        </PopupWithForm>

        <PopupWithForm
          id="confirm"
          title="Вы уверены?"
          name="confirm"
          buttonText="Да"
        ></PopupWithForm>

        <PopupWithForm
          id="add"
          title="Новое место"
          name="add"
          buttonText="Создать"
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups} 
        >
          <label className="popup__label popup__label_add">
            <input
              type="text"
              className="popup__input popup__input_add_name"
              id="input-name"
              name="Name"
              placeholder="Название"
              minLength="2"
              maxLength="30"
              required
            />
            <span className="popup__error" id="input-name-error"></span>
          </label>
          <label className="popup__label popup__label_add">
            <input
              type="url"
              className="popup__input popup__input_add_src"
              id="input-url"
              name="Url"
              placeholder="Ссылка на картинку"
              required
            />
            <span className="popup__error" id="input-url-error"></span>
          </label>
        </PopupWithForm>

        <ImagePopup />
        <Footer />
      </div>
    </div>
  );
}

export default App;
