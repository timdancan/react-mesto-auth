import "../pages/index.css";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ConfirmDeletePopup from "./ConfirmDeletePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import EditProfilePopup from "./EditProfilePopup"
import AddPlacePopup from "./AddPlacePopup"
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
  const [isConfirmDeletePopupOpen, setConfirmDeletePopupOpen] = useState({isOpen: false, card: {}});
  const [selectedCard, setSelectedCard] = useState({
    isOpen: false,
    element: {},
  });

  useEffect(() => {
    api
      .getUserData()
      .then((data) => {
        setCurrentUser(data);
        console.log(data);
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
      closeAllPopups()
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

  const changeStateConfirmeDelete = (card) => {
    setConfirmDeletePopupOpen({...isConfirmDeletePopupOpen, isOpen: true, card: card});
  };

  const handleCardClick = (card) => {
    setSelectedCard({ isOpen: true, element: card });
  };

  const closeAllPopups = () => {
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setEditAvatarPopupOpen(false);
    setConfirmDeletePopupOpen({...isConfirmDeletePopupOpen, isOpen: false})
    setSelectedCard({ ...selectedCard, isOpen: false });
  };

  const handleUpdateUser = data => {
    api.saveUserChanges(data)
      .then(data => setCurrentUser(data))
      closeAllPopups()
  }

  const handleUpdateAvatar = avatar => {
    console.log(avatar)
    api.changedAvatar(avatar)
      .then(data => setCurrentUser({ ...currentUser, avatar: data.avatar}))
      closeAllPopups()
  }

  const handleAddPlaceSubmit = data => {
    console.log(data)
    api.postNewCard(data)
      .then(newCard => setCurrentCards([newCard, ...currentCards]))
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
              onConfirmeDelete={changeStateConfirmeDelete}
              onCardClick={handleCardClick}
              handleCardLike={handleCardLike}
              handleCardDelete={handleCardDelete}
            />
            <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser}/>
            <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar}/>
            <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit}/>
            <ConfirmDeletePopup isOpen={isConfirmDeletePopupOpen} onClose={closeAllPopups} onCardDelete={handleCardDelete}/>
            

            <ImagePopup onClose={closeAllPopups} card={selectedCard} />
            <Footer />
          </div>
        </div>
      </CardContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;
