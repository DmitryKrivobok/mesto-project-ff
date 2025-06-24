export function openModal(popup) {
  popup.addEventListener("click", (event) => {
    if (
      event.target.classList.contains("popup__close") ||
      event.target.classList.contains("popup")
    ) {
      closeModal(popup);
    }
  });
  popup.classList.add("popup_is-opened");
  document.addEventListener("keydown", closeModalEsc);
}

export function closeModal(popup) {
  popup.classList.remove("popup_is-opened");
  removeListeners(popup);
}

export function closeModalEsc(event) {
  if (event.key === "Escape") {
    const openPopup = document.querySelector(".popup_is-opened");
    closeModal(openPopup);
  }
}

function removeListeners(popup) {
  popup.removeEventListener("click", closeModal);
  document.removeEventListener("keydown", closeModalEsc);
}
