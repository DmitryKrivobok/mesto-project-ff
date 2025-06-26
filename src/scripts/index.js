import "../styles/index.css";
import { initialCards } from "./cards.js";
import { createCard } from "../components/card.js";
import { cardDelete } from "../components/card.js";
import { openModal } from "../components/modal.js";
import { closeModal } from "../components/modal.js";

const popups = document.querySelectorAll(".popup");
const cardsContainer = document.querySelector(".places__list");
const newCardPopup = document.querySelector(".popup_type_new-card");
const formNewCardPopup = newCardPopup.querySelector('form[name="new-place"]');
const popupImage = document.querySelector(".popup_type_image");
const popupZoomImage = popupImage.querySelector(".popup__image");
const captionPopup = popupImage.querySelector(".popup__caption");

const popupEditProfile = document.querySelector(".popup_type_edit");
const formEditProfile = popupEditProfile.querySelector('form[name="edit-profile"]');
const profileInfo = document.querySelector(".profile__info");
const profileName = profileInfo.querySelector(".profile__title");
const profileJob = profileInfo.querySelector(".profile__description");
const nameInput = formEditProfile.querySelector(".popup__input_type_name");
const jobInput = formEditProfile.querySelector(".popup__input_type_description");
const editProfileButton = document.querySelector(".profile__edit-button");

const addCardButton = document.querySelector(".profile__add-button");
const newCardName = formNewCardPopup.querySelector(".popup__input_type_card-name");
const newCardUrl = formNewCardPopup.querySelector(".popup__input_type_url");


function renderCards(initialCards) {
  cardsContainer.replaceChildren();
  initialCards.forEach((cardsItem) => {
    const cardElement = createCard(cardsItem, cardDelete, showZoomImage);
    cardsContainer.append(cardElement);
  });
}
renderCards(initialCards);


function handleFormEditProfile(evt) {
  evt.preventDefault();
 
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

  const cardElement = createCard(newCardData, cardDelete, showZoomImage);
  cardsContainer.prepend(cardElement);

  newCardName.value = "";
  newCardUrl.value = "";

  closeModal(newCardPopup);
}
formNewCardPopup.addEventListener("submit", addNewCard);


function showZoomImage(cardTitle, cardImage) {
  const imageUrl = cardImage.src;
  const captionText = cardTitle.textContent;
  const imageUrlAlt = cardImage.alt;
  popupZoomImage.src = imageUrl;
  popupZoomImage.alt = imageUrlAlt;
  captionPopup.textContent = captionText;
  openModal(popupImage);
}


editProfileButton.addEventListener("click", () => {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  openModal(popupEditProfile);
});

addCardButton.addEventListener("click", () => {
  newCardName.value = "";
  newCardUrl.value = "";
  openModal(newCardPopup);
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
