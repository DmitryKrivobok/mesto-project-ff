import { deleteCard, likeCard } from "./api";

export function createCard(
  cardsItem,
  cardDelete,
  showZoomImage,
  userId,
  showlikeCard
) {
  const cardTemplate = document.getElementById("card-template");
  const cardElement = cardTemplate.content
    .querySelector(".card")
    .cloneNode(true);

  cardElement.dataset.cardId = cardsItem._id;

  const cardTitle = cardElement.querySelector(".card__title");
  const cardImage = cardElement.querySelector(".card__image");
  cardTitle.textContent = cardsItem.name;
  cardImage.src = cardsItem.link;
  cardImage.alt = `Изображение ${cardsItem.name}`;

  const deleteButton = cardElement.querySelector(".card__delete-button");
  if (cardsItem.owner._id === userId) {
    deleteButton.classList.remove("hidden");
  } else {
    deleteButton.classList.add("hidden");
  }

  const id = cardElement.dataset.cardId;
  deleteButton.addEventListener("click", () => {
    cardDelete(cardElement, id);
  });

 
  const likeButton = cardElement.querySelector(".card__like-button");
  const likeCountElement = cardElement.querySelector(".like_count");

  likeCountElement.textContent = cardsItem.likes.length;

  if (cardsItem.likes.some(user => user._id === userId)) {
    likeButton.classList.add("card__like-button_is-active");
  }

  likeButton.addEventListener("click", () => {
    showlikeCard(id, likeButton, likeCountElement);
  });

  cardImage.addEventListener("click", () => {
    showZoomImage(cardTitle, cardImage);
  });

  return cardElement;
}

export function cardDelete(cardElement, id) {
  deleteCard(id)
    .then(() => {
      cardElement.remove();
    })
    .catch((err) => {
      console.error(err);
    });
}
