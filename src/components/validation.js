function showInputError(
  formElement,
  inputElement,
  errorMessage,
  validationConfig
) {
  const errorElement = formElement.querySelector(
    `.${inputElement.name}-input-error`
  );
  inputElement.classList.add(validationConfig.inputErrorClass);
  if (errorElement) {
    errorElement.textContent = errorMessage;
    errorElement.classList.add(validationConfig.errorClass);
  }
}

function hideInputError(formElement, inputElement, validationConfig) {
  const errorElement = formElement.querySelector(
    `.${inputElement.name}-input-error`
  );
  inputElement.classList.remove(validationConfig.inputErrorClass);
  if (errorElement) {
    errorElement.textContent = "";
    errorElement.classList.remove(validationConfig.errorClass);
  }
}

function checkInputValidity(formElement, inputElement, validationConfig) {
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
    inputElement.setCustomValidity("");
  }
  if (!inputElement.validity.valid) {
    showInputError(
      formElement,
      inputElement,
      inputElement.validationMessage,
      validationConfig
    );
  } else {
    hideInputError(formElement, inputElement, validationConfig);
  }
}

function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => !inputElement.validity.valid);
}

function toggleButtonState(inputList, button, validationConfig) {
  if (hasInvalidInput(inputList)) {
    button.classList.add(validationConfig.inactiveButtonClass);
    button.setAttribute("disabled", true);
  } else {
    button.classList.remove(validationConfig.inactiveButtonClass);
    button.removeAttribute("disabled");
  }
}

function setEventListeners(formElement, validationConfig) {
  const inputList = Array.from(
    formElement.querySelectorAll(validationConfig.inputSelector)
  );
  const submitButton = formElement.querySelector(
    validationConfig.submitButtonSelector
  );

  toggleButtonState(inputList, submitButton, validationConfig);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      checkInputValidity(formElement, inputElement, validationConfig);
      toggleButtonState(inputList, submitButton, validationConfig);
    });
  });
}

export function enableValidation(validationConfig) {
  const formElements = Array.from(
    document.querySelectorAll(validationConfig.formSelector)
  );
  formElements.forEach((formElement) => {
    formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    setEventListeners(formElement, validationConfig);
  });
}

export function clearValidation(formElement, validationConfig) {
  const inputElements = formElement.querySelectorAll(
    validationConfig.inputSelector
  );
  inputElements.forEach((input) => {
    hideInputError(formElement, input, validationConfig);
  });
  const inputList = Array.from(formElement.querySelectorAll(".popup__input"));
  const submitButton = formElement.querySelector(".popup__button");
  toggleButtonState(inputList, submitButton, validationConfig);
}
