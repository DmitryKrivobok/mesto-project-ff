import { openModal } from "../components/modal";

export const initialCards = [
    {
      name: "Архыз",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
    },
    {
      name: "Челябинская область",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
    },
    {
      name: "Иваново",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
    },
    {
      name: "Камчатка",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
    },
    {
      name: "Холмогорский район",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
    },
    {
      name: "Байкал",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
    }
];

export function createCard(cardsItem, cardDelete) {
  const cardTemplate = document.getElementById("card-template");
  const cardElement = cardTemplate.content.querySelector(".card").cloneNode(true);

  const cardTitle = cardElement.querySelector(".card__title");
  const cardImage = cardElement.querySelector(".card__image");
  cardTitle.textContent = cardsItem.name;
  cardImage.src = cardsItem.link;
  cardImage.alt = `Изображение ${cardsItem.name}`;

  const deleteButton = cardElement.querySelector(".card__delete-button");
  deleteButton.addEventListener("click", () => {
    cardDelete(cardElement);
  });

  const likeButton = cardElement.querySelector(".card__like-button");
  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("card__like-button_is-active");
  });

  cardImage.addEventListener("click", () => {
    const popupImage = document.querySelector(".popup_type_image");
    const imageUrl = cardImage.src;
    const captionText = cardTitle.textContent;

    const popupZoomImage = popupImage.querySelector(".popup__image");
    const captionPopup = popupImage.querySelector(".popup__caption");

    popupZoomImage.src = imageUrl;
    captionPopup.textContent = captionText;

    openModal(popupImage);
  });
  
  return cardElement;
}

export function cardDelete(cardElement) {
  cardElement.remove();
}