export function openModal(popup) {
  popup.classList.add("popup_is-opened");
  document.addEventListener("keydown", closePopupEsc);
}

export function closeModal(popup) {
  popup.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", closePopupEsc);
}

export function closeModalsc(event) {
  if (event.key === "Escape") {
    const openPopup = document.querySelector(".popup_is-opened");
    closeModal(openPopup);
  }
}

export function showZoomImage(cardTitle, cardImage) {
  const popupImage = document.querySelector(".popup_type_image");
  const popupZoomImage = popupImage.querySelector(".popup__image");
  const captionPopup = popupImage.querySelector(".popup__caption");
  const imageUrl = cardImage.src;
  const captionText = cardTitle.textContent;
  const imageUrlAlt = cardImage.alt;
  popupZoomImage.src = imageUrl;
  popupZoomImage.alt = imageUrlAlt;
  captionPopup.textContent = captionText;
  openModal(popupImage);
}
