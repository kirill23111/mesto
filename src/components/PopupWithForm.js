import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
	// _submitFn = (evt) => {
	// 	evt.preventDefault();
	// 	this._load();
	// 	this._formSubmitFn(this._getInputValues())
	// };
	_submitFn = (evt) => {
		evt.preventDefault();
		this._load();

		Promise.resolve(this._formSubmitFn(this._getInputValues()))
			.then(() => {
				this.close();
			})
			.catch((error) => {
				console.error(error);
			})
			.finally(() => {
				this.loadComplete();
			})
	};
	constructor(selector, formSubmitFn) {
		super(selector);
		this._formSubmitFn = formSubmitFn;
		this._form = this._popup.querySelector('.popup__form');
		this._inputList = this._popup.querySelectorAll('.popup__input');
		this._popupSaveBtn = this._popup.querySelector('.popup__save');
		this._popupSaveBtnText = this._popupSaveBtn.textContent;
	}

	_load(textLoad = 'Сохранение ...') {
		this._popupSaveBtn.textContent = textLoad;
		this._popupSaveBtn.classList.add('popup__button_disabled');
	}

	loadComplete() {
		this._popupSaveBtn.textContent = this._popupSaveBtnText;
		this._popupSaveBtn.classList.remove('popup__button_disabled');
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
		this._popup.addEventListener('submit', this._submitFn);
	}

	close() {
		this._form.reset();
		super.close();
	}

}
