// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

function createCard(cardsItem, cardDelete) {

  const cardTemplate = document.getElementById("card-template").content.cloneNode(true);

  cardTemplate.querySelector(".card__title").textContent = cardsItem.name;
  const cardImage = cardTemplate.querySelector(".card__image");
  cardImage.src = cardsItem.link;

  const deleteButton = cardTemplate.querySelector(".card__delete-button");
  deleteButton.addEventListener("click", () => {
    cardDelete(cardsItem);
  });

  return cardTemplate;
}

function renderCards(initialCards) {
  const cardsContainer = document.querySelector(".places__list");

  cardsContainer.textContent = "";

  initialCards.forEach((item) => {
    const cardsElement = createCard(item, cardDelete);
    cardsContainer.append(cardsElement);
  });
}

// @todo: Функция удаления карточки
function cardDelete(cardsItem) {
  const index = initialCards.indexOf(cardsItem);
  if (index > -1) {
    initialCards.splice(index, 1);
    renderCards(initialCards);
  }
}

// @todo: Вывести карточки на страницу
renderCards(initialCards);
