
export class FormValidator {
    constructor(config, formElement) {
        this._formElement = formElement;
        this._config = config;
        this._buttonElement = this._formElement.querySelector(this._config.submitButtonSelector);
        this._inputList = Array.from(this._formElement.querySelectorAll(this._config.inputSelector));
    }

 _showInputError = (inputElement, validationMessage) => {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._config.inputErrorClass);
    errorElement.classList.add(this._config.errorClass);
    errorElement.textContent = validationMessage;
  };

  _hideInputError = (inputElement) => {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._config.inputErrorClass);
    errorElement.classList.remove(this._config.errorClass);
    errorElement.textContent = '';
  };

_checkInputValidity = (inputElement) => {
    if (inputElement.validity.valid) {
        this._hideInputError(this._formElement, inputElement, this._config);
    } else {
        this._showInputError(this._formElement, inputElement, this._config);
    }
  };
  
 _hasInvalidInput = () => {
    return this._inputList.some((inputElement) => !inputElement.validity.valid);
  }
  resetValidation() {
    this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement);
    });
    this._toggleButtonState();
  };
  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._buttonElement.classList.add(this._config.inactiveButtonClass);
      this._buttonElement.disabled = true;
    } else {
      this._buttonElement.classList.remove(this._config.inactiveButtonClass);
      this._buttonElement.disabled = false;
    }
  }
_setEventListeners() {
    this._toggleButtonState();
  
    this._formElement.addEventListener('reset', () => {
      setTimeout(() => {
        this._toggleButtonState();
      }, 0);
    });
  
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      })
    })
  };

  enableValidation () { 
    this._setEventListeners();
}
}