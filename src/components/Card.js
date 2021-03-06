const Card = ({name, link, likes, handleCardClick, card}) => {
  const onCardClick = () => {
    handleCardClick(card)
  }
  return (
    <article className="element">
      <button className="element__trash page-link" type="button"></button>
      <div className="element__img" style={{backgroundImage: `url(${link})`}} role="img" aria-label={name} onClick={onCardClick}></div>
      <div className="element__items">
        <h3 className="element__title">{name}</h3>
        <div className="element__container">
          <button className="element__button page-link" type="button"></button>
          <span className="element__counter">{likes.length}</span>
        </div>
      </div>
    </article>
  );
};

export default Card;
