import { Card } from '../components/Card.js';
import { FormValidator } from "../components/FormValidator.js";
import { Popup } from "../components/Popup.js";
import { Section } from "../components/Section.js";
import { PopupWithForm } from '../components/PopupWithForm.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { UserInfo } from '../components/UserInfo.js';
import '../pages/index.css';
import { Api } from '../components/API.js';
import { PopupNotice } from '../components/PopupNotice.js';
import {
	buttonOpenPopupProfile,
	buttonOpenProfileAdd,
	profileForm,
	nameInput,
	addForm,
	infoInput,
	profileNewAvatarButton,
	validationConfig
} from "../utils/constants.js"


const api = new Api({
	baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-69',
	headers: {
		authorization: '09a86537-640a-47a8-8df6-0a0da3b5f840',
		'Content-Type': 'application/json'
	}
});

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
	// addFormValidator.resetValidation();
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
				})
				.finally(() => {
					card.likeLoadComplete();
				})
		},
		handleCardDeleteLike: (cardId) => {
			api.deleteLike(cardId)
				.then(cardObj => {
					card.renderLike(cardObj);
				})
				.finally(() => {
					card.likeLoadComplete();
				});
		},
		handleCardDelete: (cardNode, cardId) => {
			popupNotice.open(cardNode, cardId);
		},
	});
	return card.createCardNode();
}
const popupNotice = new PopupNotice('.popup_notice', {
	callbackNotice: (card, cardId) => {

		api.deleteCard(cardId)
			.then(() => {
				card.deleteCard();
			})
			.finally(() => {
				popupNotice.callbackNoticeComplete();
			});
	}
});
function formAddNewCard(cardObj) {
	api.addNewCard(cardObj.name, cardObj.link)
		.then(cardInfo => {
			const cardNode = createCardNode(cardInfo);
			cardsSection.addItem(cardNode);
		})
		.finally(() => {
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

function handleAvatarFormSubmit({ avatar }) {
	api.editAvatar(avatar)
		.then(userUpdated => {
			userInfo.setUserAvatar(userUpdated.avatar);
		})
		.finally(() => {
			avatarPopup.loadComplete();
		});
}

const fullPopup = new PopupWithImage('.popup-full');
const avatarPopup = new PopupWithForm(".popup-avatar", handleAvatarFormSubmit);
const modalAddPopup = new PopupWithForm(".popup-add", formAddNewCard);
const editProfile = new PopupWithForm(".popup-profile", handleProfileFormSubmit);

function handleProfileFormSubmit(inputValues) {
	const { name, about } = inputValues;

	api.editUserInfo(name, about)
		.then(userUpdated => {
			userInfo.setUserInfo(userUpdated);
			editProfileFormValidator.resetValidation();
		})
		.finally(() => {
			editProfile.loadComplete();
		});
}

// const popupNotice = new PopupNotice('.popup_notice', ());

popupNotice.setEventListeners();

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
	});
