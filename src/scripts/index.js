// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу
import '../styles/index.css';
import'./cards.js';
function createCard(cardsItem, cardDelete) {
  const cardTemplate = document.getElementById("card-template");
  const cardElement = cardTemplate.content
    .querySelector(".card")
    .cloneNode(true);

  cardElement.querySelector(".card__title").textContent = cardsItem.name;
  const cardImage = cardElement.querySelector(".card__image");
  cardImage.src = cardsItem.link;
  cardImage.alt = `Изображение ${cardsItem.name}`;

  const deleteButton = cardElement.querySelector(".card__delete-button");
  deleteButton.addEventListener("click", () => {
    cardDelete(cardElement);
  });

  return cardElement;
}

function renderCards(initialCards) {
  const cardsContainer = document.querySelector(".places__list");

  cardsContainer.replaceChildren();

  initialCards.forEach((item) => {
    const cardElement = createCard(item, cardDelete);
    cardsContainer.append(cardElement);
  });
}
/*
    function renderCards(initialCards) {
        const cardsContainer = document.querySelector(".places__list");
      
        cardsContainer.replaceChildren();
    
        for (let i = 0; i < initialCards.length; i++) {
          const item = initialCards[i];
          const cardElement = createCard(item, cardDelete);
          cardsContainer.append(cardElement);
        }
      }
       */

function cardDelete(cardElement) {
  cardElement.remove();
}

renderCards(initialCards);

/*
function openModal() {
  const popup = document.querySelector(".popup");
  popup.classList.add("popup_is-opened");
}

const editButton = document.querySelector(".profile__edit-button"); //работает
editButton.addEventListener("click", openModal);

const addButton = document.querySelector(".profile__add-button");
addButton.addEventListener("click", () => {
  const newCard = document.querySelector(".popup_type_new-card");
  newCard.classList.add("popup_is-opened");
});

const card = document.querySelector(".card__image");
card.addEventListener("click", () => {
  const popupImage = document.querySelector(".popup_type_image");
  popupImage.classList.add("popup_is-opened");
});
*/
function openModal(popup) {
  //const popup = document.querySelector(".popup");
  popup.classList.add("popup_is-opened");
}

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
/*
const card = document.querySelector(".card__image");
card.addEventListener("click", () => {
  const popupImage = document.querySelector(".popup_type_image");
  

  const imageUrl = card.src;
  const captionText = document.querySelector(".card__title");

  const popupImgElement = popupImage.querySelector(".popup__image");
  const captionElement = popupImage.querySelector(".popup__caption");

  popupImgElement.src = imageUrl;
  captionElement.textContent = captionText;
  openModal(popupImage);
});
*/

const zoomImage = document.querySelectorAll(".card__image");
zoomImage.forEach((img) => {
  img.addEventListener("click", () => {
    const popupImage = document.querySelector(".popup_type_image");

    const imageUrl = img.src;
    const card = img.closest(".card");
    const captionText = card.querySelector(".card__title").textContent;

    const popupImgElement = popupImage.querySelector(".popup__image");
    const captionElement = popupImage.querySelector(".popup__caption");

    popupImgElement.src = imageUrl;
    captionElement.textContent = captionText;
    openModal(popupImage);
  });
});

function closeModal(popup) {
  popup.classList.remove("popup_is-opened");
}
const popups = document.querySelectorAll(".popup");
popups.forEach((popup) => {
  const closeButton = popup.querySelector(".popup__close");
  closeButton.addEventListener("click", () => {
    closeModal(popup);
  });
});

document.addEventListener("keydown", function (event) {
  if (event.key === "Escape") {
    const openPopup = document.querySelector(".popup.popup_is-opened");
    closeModal(openPopup);
  }
});

popups.querySelector(".popup_is-opened");
popups.forEach((popup) => {
  popup.addEventListener("click", (event) => {
    if (
      event.target.classList.contains("popup__close") ||
      event.target.classList.contains("popup")
     
    ) {
      // так мы проверим, что юзер кликнул на кнопку или оверлей
      closeModal(popup); // и если это так, закрываем окно, на которое вешаем слушатель (он же на нем сработал)
    }
  });
});
/*
popups.querySelectorAll(".popup").forEach((popup) => {
  popup.addEventListener("click", (event) => {
    if (
      event.target.classList.contains("popup__close") || 
      event.target === popup
    ) {
      closeModal(popup);
    }
  });
});
*/

