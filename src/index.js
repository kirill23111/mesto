
import { Card } from './scripts/Card.js';
import { FormValidator } from "./scripts/FormValidator.js";
import { Popup } from "./scripts/Popup.js";
import { Section } from "./scripts/Section.js";
import { PopupWithForm } from './scripts/PopupWithForm.js';
import { UserInfo } from './scripts/UserInfo.js';

console.log('Hello, World!') 

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
  // const initialCards = [
  //   {
  //     name: 'Карачаевск',
  //     link: './images/karachaevsk.jpg'
  //   },
  //   {
  //     name: 'Гора Эльбрус',
  //     link: './images/elbrus.jpg'
  //   },
  //   {
  //     name: 'Домбай',
  //     link: './images/Dombai.jpg'
  //   },
  //   {
  //     name: 'Гора Эльбрус',
  //     link: './images/elbrus.jpg'
  //   },
  //   {
  //     name: 'Домбай',
  //     link: './images/Dombai.jpg'
  //   },
  //   {
  //     name: 'Карачаевск',
  //     link: './images/karachaevsk.jpg'
  //   },
  // ];
  const initialCards = [
    {
      name: "Архыз",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
    },
    {
      name: "Челябинская область",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
    },
    {
      name: "Иваново",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
    },
    {
      name: "Камчатка",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
    },
    {
      name: "Холмогорский район",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
    },
    {
      name: "Байкал",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
    },
  ]; 
const editProfileFormValidator = new FormValidator(validationConfig, profileForm);
const addFormValidator = new FormValidator(validationConfig, addForm);


editProfileFormValidator.enableValidation();
addFormValidator.enableValidation();

buttonOpenProfileAdd.addEventListener('click', function() {
  modalAddPopup.open();
  addForm.reset();
  addFormValidator.resetValidation();
});

buttonOpenPopupProfile.addEventListener('click', function() {
  popupProfile.open(); 
  nameProfile.value = nameInput.textContent;
  infoProfile.value = infoInput.textContent;
  editProfileFormValidator.resetValidation();
});

function handleProfileFormSubmit(a) {
  a.preventDefault();
  nameProfile.textContent = nameInput.value;
  infoProfile.textContent = infoInput.value;
  popupProfile.close();
}

function handleOpenPopup(name, link) {
  fullPopupCardImgNode.setAttribute('src', link);
  fullPopupCardImgNode.setAttribute('alt', name);
  fullPopupCardTitleNode.textContent = name;
  fullPopup.open();
}

function formAddNewCard(cardInfo) {
  const card = new Card(cardInfo, '#cardTemplate', handleOpenPopup);
  const cardNode = card.createCardNode();

  cardsSection.addItem(cardNode);

  modalAddPopup.close();
}

const cardsSection = new Section({
  items: initialCards,
  renderer: (cardInfo) => {
    const card = new Card(cardInfo, '#cardTemplate', handleOpenPopup);
    const cardNode = card.createCardNode();

    cardsSection.addItem(cardNode);
}}, '.elements');

cardsSection.renderItems();

const fullPopup = new Popup('.popup-full');
const modalAddPopup = new PopupWithForm(".popup-add", formAddNewCard);
const popupProfile = new Popup(".popup-profile");

fullPopup.setEventListeners();
modalAddPopup.setEventListeners();
popupProfile.setEventListeners();

profileForm.addEventListener('submit', handleProfileFormSubmit);
