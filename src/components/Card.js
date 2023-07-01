/**
 * @typedef {Object} CardObj
 * @property {User[]} likes - Массив пользователей, поставивших лайк карточке.
 * @property {string} _id - Уникальный идентификатор карточки.
 * @property {string} name - Название карточки.
 * @property {string} link - Ссылка на изображение карточки.
 * @property {Object} owner - Информация об авторе карточки.
 * @property {string} owner.name - Имя автора карточки.
 * @property {string} owner.about - Описание автора карточки.
 * @property {string} owner.avatar - Ссылка на аватар автора карточки.
 * @property {string} owner._id - Уникальный идентификатор автора карточки.
 * @property {string} owner.cohort - Когорта автора карточки.
 * @property {string} createdAt - Дата создания карточки.
 */

export class Card {

	/**
	 * @param {CardObj} data - Данные карточки
	 * @param {string} selectorTemplate - selector шаблона
	 * @param {string} userId - id текущего пользователя
	 * @param {Object} handleActions - Объект с функциями
	 * @param {function} handleActions.handleCardClick - Функция, срабатывающая при клике на картинке
	 * @param {function} handleActions.handleCardLike - Функция, срабатывающая при лайке карточки
	 * @param {function} handleActions.handleCardDeleteLike - Функция, срабатывающая при удалении лайка карточки
	 * @param {function} handleActions.handleCardDelete - Функция, срабатывающая при удалении карточки
	 */
	constructor(data, selectorTemplate, userId, handleActions) {
		this._link = data.link;
		this._name = data.name;
		this._alt = data.name;
		this._selectorTemplate = selectorTemplate;
		this._handleCardClick = handleActions.handleCardClick;
		this._handleCardLike = handleActions.handleCardLike;
		this._handleCardDeleteLike = handleActions.handleCardDeleteLike;
		this._handleCardDelete = handleActions.handleCardDelete;
		this._userId = userId;
		this._cardId = data._id;
		this._cardOwnerId = data.owner._id;
		this._likes = data.likes;
		this._cardObj = data;
	}

	_getTemplate() {
		return document.querySelector(this._selectorTemplate).content.querySelector('.element').cloneNode(true);
	}

	createCardNode() {
		this._elementNode = this._getTemplate();
		this._imageNode = this._elementNode.querySelector('.element__image');
		this._nameNode = this._elementNode.querySelector('.element__name');
		this._btnLikeNode = this._elementNode.querySelector('.element__like');
		this._countLikeNode = this._elementNode.querySelector('.element__like_number')
		this._trashNode = this._elementNode.querySelector('.element__trash');
		this._imageNode.src = this._link;
		this._imageNode.alt = this._name;
		this._nameNode.textContent = this._name;

		this.renderLike(this._cardObj);
		this._renderTrash(this._trashNode);
		this._addEventListeneres();

		return this._elementNode;
	}

	/**
	 * @param {HTMLElement} trashNode - узел с корзиной
	 */
	_renderTrash(trashNode) {
		if (!this._isMyCard()) trashNode.outerHTML = '';
	}

	_addEventListeneres() {
		this._trashNode.addEventListener('click', this._trashClick);
		this._imageNode.addEventListener('click', this._imgClick);
		this._btnLikeNode.addEventListener('click', this._likeClick);
	}

	_imgClick = () => {
		this._handleCardClick(this._name, this._link);
	}

	_likedCard() {
		return !!this._likes.find((userLike) => userLike._id === this._userId);
	}

	_likeClick = () => {
		this._likeLoad();

		if (this._likedCard()) {
			this._handleCardDeleteLike(this._cardId);
		} else {
			this._handleCardLike(this._cardId);
		}
	}

	_likeLoad() {
		this._btnLikeNode.removeEventListener('click', this._likeClick);
	}

	likeLoadComplete() {
		this._btnLikeNode.addEventListener('click', this._likeClick);
	}

	/**
	 * Рендеринг количества лайков
	 * @param {CardObj} cardObj - объект с информацией о карточке
	 */
	renderLike(cardObj) {
		this._cardObj = cardObj;
		this._likes = cardObj.likes;

		this._countLikeNode.textContent = this._likes.length === 0 ? 0 : this._likes.length;

		if (this._likedCard()) {
			this._btnLikeNode.classList.add('element__like_active');
		} else {
			this._btnLikeNode.classList.remove('element__like_active');
		}
	}


	_isMyCard() {
		return this._cardOwnerId === this._userId;
	}

	_trashClick = () => {
		this._handleCardDelete(this, this._cardId);
	}

	deleteCard = () => {
		this._elementNode.remove();
		this._elementNode = null;
	}
};
