import "../styles/index.css";
import { initialCards } from "./cards.js";
import { createCard } from "../components/card.js";
import { cardDelete } from "../components/card.js";
import { openModal } from "../components/modal.js";
import { closeModal } from "../components/modal.js";
import { closeModalsc } from "../components/modal.js";
import { showZoomImage } from "../components/modal.js";

const cardsContainer = document.querySelector(".places__list");
const popup = document.querySelector(".popup");
const popups = document.querySelectorAll(".popup");
const newCardPopup = document.querySelector(".popup_type_new-card");
const formNewCardPopup = newCardPopup.querySelector('form[name="new-place"]');

const popupEditProfile = document.querySelector(".popup_type_edit");
const formEditProfile = popupEditProfile.querySelector('form[name="edit-profile"]');
const profileInfo = document.querySelector(".profile__info");
const profileName = profileInfo.querySelector(".profile__title");
const profileJob = profileInfo.querySelector(".profile__description");
const nameInput = formEditProfile.querySelector(".popup__input_type_name");
const jobInput = formEditProfile.querySelector(".popup__input_type_description");

const editProfileButton = document.querySelector(".profile__edit-button");
const addCardButton = document.querySelector(".profile__add-button");
const closeButton = popup.querySelector(".popup__close");

const newCardName = formNewCardPopup .querySelector(".popup__input_type_card-name");
const newCardUrl = formNewCardPopup .querySelector(".popup__input_type_url");

  
function renderCards(initialCards) {
  cardsContainer.replaceChildren();

  /*вариант через индекс массива
  for (let i = 0; i < initialCards.length; i++) {
    const item = initialCards[i];
    const cardElement = createCard(item, cardDelete);
    cardsContainer.append(cardElement);
  }
*/
  initialCards.forEach((cardsItem) => {
    const cardElement = createCard(cardsItem, cardDelete, showZoomImage);
    cardsContainer.append(cardElement);
  });
}
renderCards(initialCards);


function handleFormEditProfile(evt) {
  evt.preventDefault();
/*
  const form = evt.target; // текущая форма
  const inputList = Array.from(form.querySelectorAll('.form__input'));

  // Проверяем все поля
  if (hasInvalidInput(inputList)) {
    // Если есть некорректные поля, показываем ошибки
    inputList.forEach((input) => checkInputValidity(form, input));
    return; // прерываем выполнение функции
  }
} */

  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;

  closeModal(popupEditProfile);
}
formEditProfile.addEventListener("submit", handleFormEditProfile);


function addNewCard(evt) {
  evt.preventDefault();
 
  const newCardData = {
    name: newCardName.value,
    link: newCardUrl.value,
  };

  const cardElement = createCard(newCardData, cardDelete,showZoomImage);
  cardsContainer.prepend(cardElement);

  formNewCardPopup .querySelector(".popup__input_type_card-name").value = "";
  formNewCardPopup .querySelector(".popup__input_type_url").value = "";

  closeModal(newCardPopup);
}
formNewCardPopup .addEventListener("submit", addNewCard);


editProfileButton.addEventListener("click", () => {
  openModal(popupEditProfile );
});


addCardButton.addEventListener("click", () => {
  openModal(newCardPopup);
});


document.addEventListener("keydown", closeModalsc);


popups.forEach((popup) => {
  popup.addEventListener("click", (event) => {
    if (
      event.target.classList.contains("popup__close") ||
      event.target.classList.contains("popup")
    ) {
      closeModal(popup);
    }
  });
});
