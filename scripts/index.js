// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

function createCard(cardsItem, cardDelete) {

  const cardTemplate = document.getElementById("card-template");
  const cardElement = cardTemplate.content.querySelector(".card").cloneNode(true);


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

function cardDelete(cardElement) {
  cardElement.remove();
}

renderCards(initialCards);

