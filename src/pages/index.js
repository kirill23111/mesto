import { Card } from '../components/Card.js';
import { FormValidator } from "../components/FormValidator.js";
import { Popup } from "../components/Popup.js";
import { Section } from "../components/Section.js";
import { PopupWithForm } from '../components/PopupWithForm.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { UserInfo } from '../components/UserInfo.js';
import karachaevsk from '../images/karachaevsk.jpg';
import elbrus from '../images/elbrus.jpg';
import dombai from '../images/Dombai.jpg';
import '../pages/index.css';
import { Api } from '../components/API.js';
import { PopupNotice } from '../components/PopupNotice.js';
// import { config } from 'webpack';

const buttonOpenPopupProfile = document.querySelector(".profile__edit-button");
const buttonOpenProfileAdd = document.querySelector(".profile__add-button")
const buttonCloseProfileAdd = document.querySelector(".popup__close-add");
const buttonsaveProfile = document.querySelector(".popup__save");
const nameProfile = document.querySelector(".profile__title");
const infoProfile = document.querySelector(".profile__paragraph");
const profileForm = document.querySelector(".popup__form");
const nameInput = document.querySelector(".popup__info_type_name");
const infoInput = document.querySelector(".popup__info_type_job");
const inputCreateCardTitle = document.querySelector(".popup__info_type_name-image");
const inputCreateCardSrc = document.querySelector(".popup__info_type_image");
const buttonCloseProfileForm = document.querySelector(".popup__close");
const elementsNode = document.querySelector('.elements');
const fullPopupCardImgNode = document.querySelector('.popup-full__image');
const closeFullPopup = document.querySelector('.popup-full__close');
const fullPopupCardTitleNode = document.querySelector('.popup-full__title');
const addForm = document.querySelector('.popup__form-add');
const cardElements = document.querySelector('.element__cards');
const overleyPopups = Array.from(document.querySelectorAll(".popup"));
const elementsList = document.querySelector('.elements__list');
const profileNewAvatarButton = document.querySelector(".profile__image_button");
const deleteCardButton = document.querySelector(".element__trash")

const api = new Api({
	baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-69',
	headers: {
		authorization: '09a86537-640a-47a8-8df6-0a0da3b5f840',
		'Content-Type': 'application/json'
	}
});

const validationConfig = {
	inputSelector: '.popup__info',
	submitButtonSelector: '.popup__button',
	activeButtonClass: 'popup__button_valid',
	inactiveButtonClass: 'popup__button_invalid',
	inputErrorClass: 'popup__input_type_error',
	errorClass: 'popup__input-error_visible'
};

const initialCards = [
	{ name: 'Карачаевск', link: karachaevsk },
	{ name: 'Гора Эльбрус', link: elbrus },
	{ name: 'Домбай', link: dombai },
	{ name: 'Карачаевск', link: karachaevsk },
	{ name: 'Гора Эльбрус', link: elbrus },
	{ name: 'Домбай', link: dombai },
];

const editProfileFormValidator = new FormValidator(validationConfig, profileForm);
const addFormValidator = new FormValidator(validationConfig, addForm);

const userInfo = new UserInfo({
	name: ".profile__title",
	about: ".profile__paragraph",
	avatar: ".profile__image",
});

editProfileFormValidator.enableValidation();
addFormValidator.enableValidation();

buttonOpenProfileAdd.addEventListener('click', function () {
	modalAddPopup.open();
	addForm.reset();
	addFormValidator.resetValidation();
});

buttonOpenPopupProfile.addEventListener('click', function () {
	const { name, about } = userInfo.getUserInfo();
	nameInput.value = name;
	infoInput.value = about;
	editProfile.open();
});

profileNewAvatarButton.addEventListener("click", () => {

	avatarPopup.open();

});

function handleProfileFormSubmit() {
	const { name, about } = { name: nameInput.value, about: infoInput.value };

	api.editUserInfo(name, about)
		.then(userUpdated => {
			editProfile.loadComplete();
			userInfo.setUserInfo(userUpdated);
			editProfileFormValidator.resetValidation();
		});
}

const handleCardClick = (name, link) => {
	openImagePopup(name, link)
}


function createCardNode(cardInfo) {
	const userId = userInfo.getUserInfo()?._id;
	const card = new Card(cardInfo, '#cardTemplate', userId, {
		handleCardClick: (name, link) => {
			fullPopup.open({ name: name, link: link });
		},
		handleCardLike: (cardId) => {
			api.addLike(cardId)
				.then(cardObj => {
					card.renderLike(cardObj);
					card.likeLoadComplete();
				});
		},
		handleCardDeleteLike: (cardId) => {
			api.deleteLike(cardId)
				.then(cardObj => {
					card.renderLike(cardObj);
					card.likeLoadComplete();
				});
		},
		handleCardDelete: (cardNode, cardId) => {
			popupNotice.open(cardNode, cardId);
		},
	});
	return card.createCardNode();
}

function formAddNewCard(cardObj) {
	api.addNewCard(cardObj.name, cardObj.link)
		.then(cardInfo => {
			const cardNode = createCardNode(cardInfo);
			cardsSection.addItem(cardNode);

			modalAddPopup.loadComplete();
		});
}

const cardsSection = new Section({
	items: [],
	renderer: (cardInfo) => {
		const cardNode = createCardNode(cardInfo);

		cardsSection.addItem(cardNode);
	}
}, '.elements');

// cardsSection.renderItems();

function handleAvatarFormSubmit({ avatar }) {
	api.editAvatar(avatar)
		.then(userUpdated => {
			userInfo.setUserAvatar(userUpdated.avatar);

			avatarPopup.loadComplete();
		});
}

const fullPopup = new PopupWithImage('.popup-full');
const modalAddPopup = new PopupWithForm(".popup-add", formAddNewCard);
const editProfile = new PopupWithForm(".popup-profile", handleProfileFormSubmit);
const avatarPopup = new PopupWithForm(".popup-avatar", handleAvatarFormSubmit);
// const popupNotice = new PopupNotice('.popup_notice', ());
const popupNotice = new PopupNotice('.popup_notice', {
	callbackNotice: (card, cardId) => {
		api.deleteCard(cardId)
		.then(() => {
			card.deleteCard();
			popupNotice.close();
		});
	}
});
popupNotice.setEventListeners();

const popupDeleteCard = document.querySelector(".popup-deleteCard");

fullPopup.setEventListeners();
modalAddPopup.setEventListeners();
editProfile.setEventListeners();
avatarPopup.setEventListeners();

Promise.all([api.getUserInfo(), api.getInitialCards()])
	.then(([user, cards]) => {
		userInfo.setUserInfo(user);
		userInfo.setUserAvatar(user.avatar);

		for (const card of cards) {
			const cardNode = createCardNode(card);
			cardsSection.addItem(cardNode, 'append');
		}
	})
