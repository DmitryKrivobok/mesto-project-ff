import "../styles/index.css";
import { initialCards } from "./cards.js";
import { createCard } from "../components/card.js";
import { cardDelete } from "../components/card.js";
import { openModal } from "../components/modal.js";
import { closeModal } from "../components/modal.js";

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
const formElement = document.querySelector(".popup__form");
const inputElement = formElement.querySelector(".popup__input");


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


editProfileButton.addEventListener("click", () => {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
clearValidation(popupEditProfile);
  openModal(popupEditProfile);
});

addCardButton.addEventListener("click", () => {
  clearValidation(newCardPopup);
  openModal(newCardPopup);
});


function showZoomImage(cardTitle, cardImage) {
  const imageUrl = cardImage.src;
  const captionText = cardTitle.textContent;
  const imageUrlAlt = cardImage.alt;
  popupZoomImage.src = imageUrl;
  popupZoomImage.alt = imageUrlAlt;
  captionPopup.textContent = captionText;
  openModal(popupImage);
}


//показываем сообщение об ошибке
function showInputError(formElement, inputElement, errorMessage) {
  const errorElement = formElement.querySelector(
    `.${inputElement.name}-input-error`
  );
  inputElement.classList.add("form__input_type_error");
  if (errorElement) {
    errorElement.textContent = errorMessage;
    errorElement.classList.add("form__input-error_active");
  }
}

//скрывваем сообщение об ошибке
function hideInputError(formElement, inputElement) {
  const errorElement = formElement.querySelector(
    `.${inputElement.name}-input-error`
  );
  inputElement.classList.remove("form__input_type_error");
  if (errorElement) {
    errorElement.textContent = "";
    errorElement.classList.remove("form__input-error_active");
  }
}

//валидация инпутов
function checkInputValidity(formElement, inputElement) {
  const regex = /^[A-Za-zА-Яа-яЁё\s-]+$/;

  inputElement.setCustomValidity("");

  if (inputElement.value === "") {
    inputElement.setCustomValidity("Вы пропустили это поле.");
  } else {
    // if (!regex.test(inputElement.value)) {
    //   inputElement.setCustomValidity(
    //     "Допустимы латинские и кириллические буквы, знаки дефиса и пробелы."
    //   );
    // }
    // if (inputElement.type === "url") {
    //   if (!inputElement.validity.valid) {
    //     inputElement.setCustomValidity("Введите адрес сайта.");
    //   }
    // }
  }
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
}


//проверка наличия невалидных инпутов
function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => !inputElement.validity.valid);
}

//управление состоянием кнопки
function toggleButtonState(inputList, button) {
  if (hasInvalidInput(inputList)) {
    button.classList.add("popup__button_inactive");
    button.setAttribute("disabled", true);
  } else {
    button.classList.remove("popup__button_inactive");
    button.removeAttribute("disabled");
  }
}

//установка обработчика для каждого поля
function setEventListeners(formElement) {
  const inputList = Array.from(formElement.querySelectorAll(".popup__input"));
  const submitButton = formElement.querySelector(".popup__button");

  toggleButtonState(inputList, submitButton);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      checkInputValidity(formElement, inputElement);
      toggleButtonState(inputList, submitButton);
    });
  });
}

//валидация всех форм на странице
function enableValidation() {
  const formElements = Array.from(document.querySelectorAll(".popup__form"));
  formElements.forEach((formElement) => {
    formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    setEventListeners(formElement);
  });
}

enableValidation();

  const validationConfig = {
    formSelector: '.popup__form',              
    inputSelector: '.popup__input',            
    submitButtonSelector: '.popup__button',      
    inactiveButtonClass: 'popup__button_disabled', 
    inputErrorClass: 'popup__input_type_error',  
    errorClass: 'popup__error_visible'            
  }


  export function clearValidation(formElement) {
    const inputElements = formElement.querySelectorAll('.popup__input');
    inputElements.forEach((input) => {
      hideInputError(formElement, input);
    });
  }

