import { Popup } from "./Popup.js";

class PopupNotice extends Popup {

	_deleteFn = (evt) => {
		evt.preventDefault();
		this._deleteButton.removeEventListener('click', this._deleteFn);
		this._callbackNotice(this._card, this._cardId);
	};

  constructor(popupSelector, { callbackNotice }) {
    super(popupSelector);
    this._deleteButton = this._popup.querySelector('.popup__delete');
    this._callbackNotice = callbackNotice;
  }

  open(card, cardId) {
    this._cardId = cardId;
		this._card = card;
    super.open();
  }

  setEventListeners() {
    this._deleteButton.addEventListener('click', this._deleteFn);
    super.setEventListeners();
  }

	callbackNoticeComplete() {
		this._deleteButton.addEventListener('click', this._deleteFn);
		this.close();
	}
}

export { PopupNotice };
