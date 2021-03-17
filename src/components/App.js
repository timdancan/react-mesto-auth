import "../pages/index.css";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import EditAvatarPopup from "./EditAvatarPopup";
import EditProfilePopup from "./EditProfilePopup"
import ImagePopup from "./ImagePopup";
import { useState, useEffect } from "react";
import api from "../utils/Api";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { CardContext } from "../contexts/CardContext";

function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [currentCards, setCurrentCards] = useState([]);
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({
    isOpen: false,
    element: {},
  });

  useEffect(() => {
    api
      .getUserData()
      .then((data) => {
        setCurrentUser(data);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    api
      .getInitialCards()
      .then((data) => {
        setCurrentCards(data);
      })
      .catch((err) => console.log(err));
  }, []);
  
  const handleCardLike = card => {
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    api.changeLikeCardStatus(card._id, !isLiked).then(newCard => {
      setCurrentCards(state => state.map(c => (c._id === card._id ? newCard : c)));
    });
  }
  const handleCardDelete = card => {
    api.deleteCard(card._id)
      .then(() => {
        setCurrentCards(state => state.filter(c => c._id !== card._id))
      })
  }

  const changeStateEditProfile = () => {
    setEditProfilePopupOpen(true);
  };

  const changeStateAddPlace = () => {
    setAddPlacePopupOpen(true);
  };

  const changeStateAvatarProfile = () => {
    setEditAvatarPopupOpen(true);
  };

  const handleCardClick = (card) => {
    setSelectedCard({ isOpen: true, element: card });
  };

  const closeAllPopups = () => {
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setEditAvatarPopupOpen(false);
    setSelectedCard({ ...selectedCard, isOpen: false });
  };

  const handleUpdateUser = (data) => {
    api.saveUserChanges(data)
      .then(data => setCurrentUser(data))
      closeAllPopups()
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <CardContext.Provider value={currentCards}>
        <div className="App">
          <div className="page">
            <Header />
            <Main
              onEditProfile={changeStateEditProfile}
              onAddPlace={changeStateAddPlace}
              onEditAvatar={changeStateAvatarProfile}
              onCardClick={handleCardClick}
              handleCardLike={handleCardLike}
              handleCardDelete={handleCardDelete}
            />
            <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser}/>
            <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} />

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

            <ImagePopup onClose={closeAllPopups} card={selectedCard} />
            <Footer />
          </div>
        </div>
      </CardContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;
