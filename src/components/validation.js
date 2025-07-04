function showInputError(
  popupForm,
  inputElement,
  errorMessage,
  validationConfig
) {
  const errorElement = popupForm.querySelector(
    `.${inputElement.name}-input-error`
  );
  inputElement.classList.add(validationConfig.inputErrorClass);
  if (errorElement) {
    errorElement.textContent = errorMessage;
    errorElement.classList.add(validationConfig.errorClass);
  }
}

function hideInputError(popupForm, inputElement, validationConfig) {
  const errorElement = popupForm.querySelector(
    `.${inputElement.name}-input-error`
  );
  inputElement.classList.remove(validationConfig.inputErrorClass);
  if (errorElement) {
    errorElement.textContent = "";
    errorElement.classList.remove(validationConfig.errorClass);
  }
}

function checkInputValidity(popupForm, inputElement, validationConfig) {
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
    inputElement.setCustomValidity("");
  }
  if (!inputElement.validity.valid) {
    showInputError(
      popupForm,
      inputElement,
      inputElement.validationMessage,
      validationConfig
    );
  } else {
    hideInputError(popupForm, inputElement, validationConfig);
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

function setEventListeners(popupForm, validationConfig) {
  const inputList = Array.from(
    popupForm.querySelectorAll(validationConfig.inputSelector)
  );
  const submitButton = popupForm.querySelector(
    validationConfig.submitButtonSelector
  );

  toggleButtonState(inputList, submitButton, validationConfig);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      checkInputValidity(popupForm, inputElement, validationConfig);
      toggleButtonState(inputList, submitButton, validationConfig);
    });
  });
}

export function enableValidation(validationConfig) {
  const formElements = Array.from(
    document.querySelectorAll(validationConfig.formSelector)
  );
  formElements.forEach((popupForm) => {
    setEventListeners(popupForm, validationConfig);
  });
}

export function clearValidation(popupForm, validationConfig) {
  const inputElements = popupForm.querySelectorAll(
    validationConfig.inputSelector
  );
  inputElements.forEach((input) => {
    hideInputError(popupForm, input, validationConfig);
  });

  const submitButton = popupForm.querySelector(
    validationConfig.submitButtonSelector
  );
  submitButton.classList.add(validationConfig.inactiveButtonClass);
}
