import avatar from '../images/avatar.png'
import React, { useEffect, useState } from 'react'
import api from '../utils/Api'
import Card from './Card'

const Main = ({onEditProfile, onAddPlace, onEditAvatar, onCardClick}) => {

  const [userName, setUserName] = useState('Жак-Ив Кусто')
  const [userDescription, setUserDescription] = useState('Исследователь океана')
  const [userAvatar, setUserAvatar] = useState(avatar)
  const [cards, setCards] = useState([])

  useEffect(() => {
    api.getInitialCards()
      .then(data => {
        console.log(data)
        setCards(data)
      })
      .catch(err => console.log(err))
  }, [])

  useEffect(() => {
    api.getUserData()
      .then(data => {
        setUserName(data.name)
        setUserDescription(data.about)
        setUserAvatar(data.avatar)
      })
      .catch(err => console.log(err))
  }, [])
  
  const handleCardClick = (card) => {
    onCardClick(card)
  }

  const handleEditAvatarClick = () => {
    onEditAvatar()
  } 
  const handleAddPlaceClick = () => {
    onAddPlace()
  }
  const handleEditProfileClick = () => {
    onEditProfile()
  }
  return (
    <main className="main">
      <section className="profile content content_place_profile">
        <div className="profile__content">
          <div className="profile__avatar-container">
            <img
              src={userAvatar}
              alt="Аватар профиля"
              className="profile__avatar"
            />
            <button 
            className="profile__avatar-button"
            onClick={handleEditAvatarClick}
            ></button>
          </div>
          <div className="profile__info">
            <div className="profile__text">
              <h1 className="profile__title">{userName}</h1>
              <button
                className="profile__edit-button page-link"
                type="button"
                onClick={handleEditProfileClick}
              ></button>
            </div>
            <p className="profile__subtitle">{userDescription}</p>
          </div>
        </div>
        <button
          className="profile__add-button page-link"
          type="button"
          onClick={handleAddPlaceClick}
        ></button>
      </section>

      <section className="elements content content_place_elements">
        {
          cards.map(item => {
            return <Card key={item._id} {...item} card={item} handleCardClick={handleCardClick}/>
          })
        }
      </section>
    </main>
  );
};

export default Main;
