export function createCard(cardsItem, cardDelete, showZoomImage) {
  const cardTemplate = document.getElementById("card-template");
  const cardElement = cardTemplate.content
    .querySelector(".card")
    .cloneNode(true);

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
    showZoomImage(cardTitle, cardImage);
  });

  return cardElement;
}

export function cardDelete(cardElement) {
  cardElement.remove();
}
