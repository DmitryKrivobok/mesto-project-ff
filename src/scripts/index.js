import "../styles/index.css";
import { initialCards } from "./cards.js";
import { createCard } from "./cards.js";
import { cardDelete } from "./cards.js";
import { openModal } from "../components/modal";
import { closeModal } from "../components/modal";


function renderCards(initialCards) {
  const cardsContainer = document.querySelector(".places__list");

  cardsContainer.replaceChildren();

  /*вариант через индекс массива
  for (let i = 0; i < initialCards.length; i++) {
    const item = initialCards[i];
    const cardElement = createCard(item, cardDelete);
    cardsContainer.append(cardElement);
  }
*/
  initialCards.forEach((item) => {
    const cardElement = createCard(item, cardDelete);
    cardsContainer.append(cardElement);
  });
}


renderCards(initialCards);



const editButton = document.querySelector(".profile__edit-button");
editButton.addEventListener("click", () => {
  const popup = document.querySelector(".popup");
  openModal(popup);
});

const addButton = document.querySelector(".profile__add-button");
addButton.addEventListener("click", () => {
  const newCardPopup = document.querySelector(".popup_type_new-card");
  openModal(newCardPopup);
});



const popups = document.querySelectorAll(".popup");
popups.forEach((popup) => {
  const closeButton = popup.querySelector(".popup__close");
  closeButton.addEventListener("click", () => {
    closeModal(popup);
  });
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    const openPopup = document.querySelector(".popup_is-opened");
    closeModal(openPopup);
  }
});

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

const formElement = document.querySelector(".popup_type_edit");
const profileInfo = document.querySelector(".profile__info");
const profileName = profileInfo.querySelector(".profile__title");
const profileJob = profileInfo.querySelector(".profile__description");

function handleFormSubmit(evt) {
  evt.preventDefault();

  const nameInput = formElement.querySelector(".popup__input_type_name").value;
  const jobInput = formElement.querySelector(".popup__input_type_description").value;

  profileName.textContent = nameInput;
  profileJob.textContent = jobInput;

  closeModal(formElement);
}

formElement.addEventListener("submit", handleFormSubmit);

const newCardPopup = document.querySelector(".popup_type_new-card");

function addNewCard(evt) {
  evt.preventDefault();

  const newCardName = newCardPopup.querySelector(".popup__input_type_card-name").value;
  const newCardUrl = newCardPopup.querySelector(".popup__input_type_url").value;

  const newCardData = {
    name: newCardName,
    link: newCardUrl,
  };

  const cardElement = createCard(newCardData, cardDelete);

  document.querySelector(".places__list").prepend(cardElement);

  newCardPopup.querySelector(".popup__input_type_card-name").value = "";
  newCardPopup.querySelector(".popup__input_type_url").value = "";

  closeModal(newCardPopup);
}

newCardPopup.addEventListener("submit", addNewCard);
