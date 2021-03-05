import avatar from '../images/avatar.png'
import React from 'react'

const Main = ({onEditProfile, onAddPlace, onEditAvatar}) => {

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
              src={avatar}
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
              <h1 className="profile__title">Жак-Ив Кусто</h1>
              <button
                className="profile__edit-button page-link"
                type="button"
                onClick={handleEditProfileClick}
              ></button>
            </div>
            <p className="profile__subtitle">Исследователь океана</p>
          </div>
        </div>
        <button
          className="profile__add-button page-link"
          type="button"
          onClick={handleAddPlaceClick}
        ></button>
      </section>

      <section className="elements content content_place_elements"></section>
    </main>
  );
};

export default Main;
