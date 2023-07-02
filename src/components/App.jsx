import { useEffect, useState } from "react";

import ImagePopup from "./ImagePopup";
import Header from "./Header";
import Footer from "./Footer";
import EditProfilePopup from "./EditProfilePopup.jsx";
import Main from "./Main";
import api from "../utils/api.js";
import CurrentUserContext from "../contexts/CurrentUserContext";
import EditAvatarPopup from "./EditAvatarPopup.jsx";
import AddPlacePopup from "./AddPlacePopup .jsx";
import useEscapeClose from "../hooks/useEscapeClose.js";
function App() {
  const [cards, setCards] = useState([]);
  const [currentUser, setCurrentUser] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  // Начальное инфо
  useEffect(() => {
    Promise.all([api.getInitialCards(), api.getUserInfo()])
      .then(([cards, userInfo]) => {
        setCards(cards);
        setCurrentUser(userInfo);
      })
      .catch((e) => console.log(e));
  }, []);

  // Добавление карточки
  const handleAddPlaceSubmit = (data) => {
    setIsLoading(true);
    api
      .addCard(data)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        setIsAddPlacePopupOpen(false);
      })
      .catch((e) => console.log(e))
      .finally(() => setIsLoading(false));
  };

  //  Лайк
  const handleCardLike = (card) => {
    const isLiked = card.likes.some((item) => item._id === currentUser._id);
    if (!isLiked) {
      api
        .addLike(card._id)
        .then((newCard) => {
          const newCards = cards.map((c) => (c._id === card._id ? newCard : c));
          setCards(newCards);
        })
        .catch((e) => console.log(e));
    } else {
      api
        .deleteLike(card._id)
        .then((newCard) => {
          const newCards = cards.map((c) => (c._id === card._id ? newCard : c));
          setCards(newCards);
        })
        .catch((e) => console.log(e));
    }
  };
  // Удалить карточку
  const handleCardDelete = (card) => {
    api
      .deleteCard(card._id)
      .then((data) => {
        const updatedCards = [...cards.filter((item) => item._id !== card._id)];
        setCards(updatedCards);
      })
      .catch((e) => console.log(e));
  };
  //Popups State
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);

  // Close all
  const closeAllPopups = () => {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard(null);
  };

  // Закрыть на ESC
  useEscapeClose(closeAllPopups);

  // Обновить инфо
  const handleUpdateUser = (data) => {
    setIsLoading(true);
    api
      .changeUserInfo(data)
      .then((data) => {
        setCurrentUser(data);
        setIsEditProfilePopupOpen(false);
      })
      .catch((e) => console.log(e))
      .finally(() => setIsLoading(false));
  };
  // Обновить аватар
  const handleUpdateAvatar = (data) => {
    api
      .changeAvatar(data.avatar)
      .then((data) => {
        setCurrentUser(data);
        setIsEditAvatarPopupOpen(false);
      })
      .catch((e) => console.log(e));
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        {selectedCard !== null && (
          <ImagePopup card={selectedCard} close={closeAllPopups} />
        )}
        <EditProfilePopup
          isLoading={isLoading}
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />
        <AddPlacePopup
          isLoading={isLoading}
          onClose={closeAllPopups}
          isAddPlacePopupOpen={isAddPlacePopupOpen}
          onAddPlace={handleAddPlaceSubmit}
        />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />
        <Header />

        <Main
          cards={cards}
          onEditProfile={() => setIsEditProfilePopupOpen(true)}
          onEditPlace={() => setIsAddPlacePopupOpen(true)}
          onEditAvatar={() => setIsEditAvatarPopupOpen(true)}
          onCardClick={(data) => setSelectedCard(data)}
          onCardLike={handleCardLike}
          onCardDelete={handleCardDelete}
        />

        <Footer />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
