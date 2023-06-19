
import { Card } from '../components/Card.js';
import { FormValidator } from "../components/FormValidator.js";
import { Popup } from "../components/Popup.js";
import { Section } from "../components/Section.js";
import { PopupWithForm } from '../components/PopupWithForm.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { UserInfo } from '../components/UserInfo.js';
import '../pages/index.css';

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

  const validationConfig = {
    inputSelector: '.popup__info',
    submitButtonSelector: '.popup__button',
    activeButtonClass: 'popup__button_valid',
    inactiveButtonClass: 'popup__button_invalid',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__input-error_visible'
  };
import karachaevsk from '../images/karachaevsk.jpg';
import elbrus from '../images/elbrus.jpg';
import dombai from '../images/Dombai.jpg';
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
  avatar: ".profile__avatar",
});

editProfileFormValidator.enableValidation();
addFormValidator.enableValidation();

buttonOpenProfileAdd.addEventListener('click', function() {
  modalAddPopup.open();
  addForm.reset();
  addFormValidator.resetValidation();
});

buttonOpenPopupProfile.addEventListener('click', function() {
  const {name, about} = userInfo.getUserInfo();
  nameInput.value = name;
  infoInput.value = about;
  editProfile.open();
});

function handleProfileFormSubmit() {
  editProfile.close();
  userInfo.setUserInfo ({
    name: nameInput.value,
    about: infoInput.value
  })
  editProfileFormValidator.resetValidation();
}

const handleCardClick = (name, link) => {
  openImagePopup(name, link)
}
function createCardNode(cardInfo) {
  const newCard = new Card(cardInfo, '#cardTemplate', openImagePopup);
  return newCard.createCardNode();
}

function formAddNewCard(cardInfo) {
  const card = createCardNode(cardInfo);
  // const cardNode = card.createCardNode();

  cardsSection.addItem(card);

  modalAddPopup.close();
}

const cardsSection = new Section({
  items: initialCards,
  renderer: (cardInfo) => {
    const card = createCardNode(cardInfo);
    // const cardNode = card.createCardNode();

    cardsSection.addItem(card);
}}, '.elements');

cardsSection.renderItems();

const fullPopup = new PopupWithImage('.popup-full');
const modalAddPopup = new PopupWithForm(".popup-add", formAddNewCard);
const editProfile = new PopupWithForm(".popup-profile", handleProfileFormSubmit);


function openImagePopup(name, link) {
  fullPopup.open({ link, name });
}
fullPopup.setEventListeners();
modalAddPopup.setEventListeners();
editProfile.setEventListeners();