/**
 * @typedef {Object} User
 * @property {string} about - Описание пользователя.
 * @property {string} avatar - Ссылка на аватар пользователя.
 * @property {string} cohort - Когорта пользователя.
 * @property {string} name - Имя пользователя.
 * @property {string} _id - Уникальный идентификатор пользователя.
 */

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


export class Api {

	_baseUrl = '';
	_headers = {
		authorization: '',
		'Content-Type': ''
	};

	/**
	 * Создает экземпляр класса Api.
	 *
	 * @param {Object} options - Опции для настройки экземпляра Api.
	 * @param {string} options.baseUrl - Базовый URL API.
	 * @param {Object} options.headers - Заголовки, включаемые в запросах API.
	 * @param {string} options.headers.authorization - Токен авторизации для аутентификации API.
	 * @param {string} options.headers.Content-Type - Тип содержимого запросов API.
	 */
	constructor(options) {
		// тело конструктора
		this._baseUrl = options.baseUrl;
		this._headers = options.headers;
	}

	/**
	 * Получение массива карточек
	 * @returns {Promise<CardObj[]>}
	 */
	getInitialCards() {
		return fetch(`${this._baseUrl}/cards`, {
			headers: {
				authorization: this._headers.authorization
			}
		})
			.then(this._checkResponse);
	}

	/**
	 * Получение массива карточек
	 * @param {Response} res - ответ от сервера
	 */
	_checkResponse(res) {
		if (res.ok) {
			return res.json();
		}
		return Promise.reject(`Ошибка: ${res.status}`)
	}

	getUserInfo() {
		return fetch(`${this._baseUrl}/users/me`, {
			headers: {
				authorization: this._headers.authorization
			},
		})
			.then(this._checkResponse);
	}

	editUserInfo(name, about) {
		return fetch(`${this._baseUrl}/users/me`, {
			headers: {
				authorization: this._headers.authorization,
				'Content-Type': this._headers["Content-Type"]
			},
			method: 'PATCH',
			body: JSON.stringify({
				name: name,
				about: about
			})
		})
			.then(this._checkResponse);
	}

	addNewCard(name, link) {
		return fetch(`${this._baseUrl}/cards`, {
			headers: {
				authorization: this._headers.authorization,
				'Content-Type': this._headers["Content-Type"]
			},
			method: 'POST',
			body: JSON.stringify({
				name: name,
				link: link,
			})
		})
			.then(this._checkResponse);
	}

	/**
	 * Поставить лайк карточке
	 * @param {string} cardId - id карточки
	 * @returns {Promise<CardObj>} - карточка
	 */
	addLike(cardId) {
		return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
			headers: {
				authorization: this._headers.authorization,
				'Content-Type': this._headers["Content-Type"]
			},
			method: 'PUT'
		})
			.then(this._checkResponse);
	}

	/**
	 * @typedef {Object} DeletionResponse
	 * @property {string} message - Сообщение об удалении
	 */

	/**
	 * Удаление карточки
	 * @returns {Promise<DeletionResponse>} Объект с сообщением об удалении
	 */
	deleteCard(cardId) {
		return fetch(`${this._baseUrl}/cards/${cardId}`, {
			headers: this._headers,
			method: 'DELETE',
		})
			.then(this._checkResponse);
	}

	deleteLike(cardId) {
		return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
			headers: {
				authorization: '09a86537-640a-47a8-8df6-0a0da3b5f840',
			},
			method: 'DELETE',
		})
			.then(this._checkResponse);
	}

	/**
	 * Редактирование аватара
	 * @param {string} avatar - ссылка на картинку с аватаром
	 */
	editAvatar(avatar) {
		return fetch(`${this._baseUrl}/users/me/avatar`, {
			headers: this._headers,
			method: 'PATCH',
			body: JSON.stringify({
				avatar: avatar,
			}),
		})
			.then(this._checkResponse);
	}
}
