import "../styles/index.css";
import { initialCards } from "./cards.js";
import { createCard } from "../components/card.js";
import { cardDelete } from "../components/card.js";
import { openModal } from "../components/modal.js";
import { closeModal } from "../components/modal.js";
import { clearValidation } from "../components/validation.js";
import { enableValidation } from "../components/validation.js";
import {
  addCard,
  getInitialCards,
  getUserInfo,
  updatedUserAvatar,
  updatedUserInfo,
  likeCard,
  unlikeCard,
} from "../components/api.js";


const popups = document.querySelectorAll(".popup");
const cardsContainer = document.querySelector(".places__list");
const newCardPopup = document.querySelector(".popup_type_new-card");
const formNewCardPopup = newCardPopup.querySelector('form[name="new-place"]');
const popupImage = document.querySelector(".popup_type_image");
const popupZoomImage = popupImage.querySelector(".popup__image");
const captionPopup = popupImage.querySelector(".popup__caption");

const popupEditProfile = document.querySelector(".popup_type_edit");
const formEditProfile = popupEditProfile.querySelector('form[name="edit-profile"]');
const profileImage = document.querySelector(".profile__image");
const profileInfo = document.querySelector(".profile__info");
const profileName = profileInfo.querySelector(".profile__title");
const profileJob = profileInfo.querySelector(".profile__description");
const nameInput = formEditProfile.querySelector(".popup__input_type_name");
const jobInput = formEditProfile.querySelector(".popup__input_type_description");
const editProfileButton = document.querySelector(".profile__edit-button");

const addCardButton = document.querySelector(".profile__add-button");
const newCardName = formNewCardPopup.querySelector(".popup__input_type_card-name");
const newCardUrl = formNewCardPopup.querySelector(".popup__input_type_url");

const formElement = document.querySelector(".popup__form");
const submitButton = formElement.querySelector(".popup__button");

let userId;

const popupEditAvatar = document.querySelector(".popup_type_avatar");
const avatarInput = popupEditAvatar.querySelector(".popup__input_type_url")
const formEditAvatar = popupEditAvatar.querySelector('form[name="avatar"]');

const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_inactive",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__input-error_active",
};


function handleFormEditProfile(evt) {
  evt.preventDefault();

  submitButton.textContent = "Сохранение...";
  submitButton.disabled = true;

  const name = nameInput.value;
  const about = jobInput.value;

  updatedUserInfo(name, about)
    .then((updatedUser) => {
      profileName.textContent = updatedUser.name;
      profileJob.textContent = updatedUser.about;
      closeModal(popupEditProfile);
    })
    .catch((error) => {
      console.error(error);
    })
    .finally(() => {
      submitButton.textContent = "Сохранить";
      submitButton.disabled = false;
    });
}
formEditProfile.addEventListener("submit", handleFormEditProfile);

function addNewCard(evt) {
  evt.preventDefault();

  submitButton.textContent = "Сохранение...";
  submitButton.disabled = true;

  const newCardData = {
    name: newCardName.value,
    link: newCardUrl.value,
  };

  addCard(newCardData)
    .then((data) => {
      const cardElement = createCard(
        data,
        cardDelete,
        showZoomImage,
        userId,
        showlikeCard
      );
      cardsContainer.prepend(cardElement);

      newCardName.value = "";
      newCardUrl.value = "";

      closeModal(newCardPopup);
    })
    .catch((error) => {
      console.error(error);
    })
    .finally(() => {
      submitButton.textContent = "Сохранить";
      submitButton.disabled = false;
    });
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
  clearValidation(popupEditProfile, validationConfig);

  submitButton.classList.add(validationConfig.inactiveButtonClass);
  submitButton.setAttribute("disabled", true);
  openModal(popupEditProfile);
});

addCardButton.addEventListener("click", () => {
  newCardName.value = "";
  newCardUrl.value = "";
  clearValidation(newCardPopup, validationConfig);

  submitButton.classList.add(validationConfig.inactiveButtonClass);
  submitButton.setAttribute("disabled", true);
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

enableValidation(validationConfig);

function showlikeCard(id, likeButton, likeCountElement) {
  const isLiked = likeButton.classList.contains("card__like-button_is-active");

  if (isLiked) {
    unlikeCard(id)
      .then((result) => {
        likeCountElement.textContent = result.likes.length;
        likeButton.classList.remove("card__like-button_is-active");
      })
      .catch((error) => {
        console.error(error);
      });
  } else {
    likeCard(id)
      .then((result) => {
        likeCountElement.textContent = result.likes.length;
        likeButton.classList.add("card__like-button_is-active");
      })
      .catch((error) => {
        console.error(error);
      });
  }
}

Promise.all([getUserInfo(), getInitialCards()])
  .then(([userData, cardsArray]) => {
    userId = userData._id;
    profileImage.style.backgroundImage = `url(${userData.avatar})`;
    profileName.textContent = userData.name;
    profileJob.textContent = userData.about;

    cardsContainer.replaceChildren();

    cardsArray.forEach((cardsItem) => {
      const cardElement = createCard(
        cardsItem,
        cardDelete,
        showZoomImage,
        userId,
        showlikeCard
      );
      cardsContainer.appendChild(cardElement);
    });
  })
  .catch((error) => console.error(error));

profileImage.addEventListener("click", () => {
  const inputAvatar = popupEditAvatar.querySelector(".popup__input_type_url");
  inputAvatar.value = "";
  clearValidation(popupEditAvatar, validationConfig);
  openModal(popupEditAvatar);
});

function changeAvatar(evt) {
  evt.preventDefault();

  submitButton.textContent = "Сохранение...";
  submitButton.disabled = true;

  const avatarUrl = avatarInput.value;

  updatedUserAvatar(avatarUrl)
    .then((updatedUser) => {
      profileImage.src = updatedUser.avatar;
      closeModal(popupEditAvatar);
    })
    .catch((error) => {
      console.error(error);
    })
    .finally(() => {
      submitButton.textContent = "Сохранить";
      submitButton.disabled = false;
    });
}
formEditAvatar.addEventListener("submit", changeAvatar);
