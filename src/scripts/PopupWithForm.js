import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
    constructor(selector, formSubmitFn) {
        super(selector);
        this._formSubmitFn = formSubmitFn;
        this._form = this._popup.querySelector('.popup__form');
        this._inputList = this._popup.querySelectorAll('.popup__info');
    }
    
    _getInputValues() {
        this._formValues = {};

        for (const input of this._inputList) {
            this._formValues[input.name] = input.value;
        }

        return this._formValues;
    }

    setEventListeners() {
        super.setEventListeners();
        window.getInputValues = this._getInputValues;
        this._popup.addEventListener('submit', (evt) => {
            evt.preventDefault();
            console.log(this._getInputValues());
            this._formSubmitFn(this._getInputValues());
        });
    }

    close() {
        this._form.reset();
        super.close();
    }
}
