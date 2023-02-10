import { Card } from './Card.js';
import { FormValidator } from "./FormValidator.js";

const buttonOpenPopupProfile = document.querySelector(".profile__edit-button");
const popupProfile = document.querySelector('.popup-profile')
const buttonOpenProfileAdd = document.querySelector(".profile__add-button")
const buttonCloseProfileAdd = document.querySelector(".popup__close-add");
const buttonsaveProfile = document.querySelector(".popup__save");
const nameProfile = document.querySelector(".profile__title");
const infoProfile = document.querySelector(".profile__paragraph");
const modalAdd = document.querySelector(".popup-add")
const profileForm = popupProfile.querySelector(".popup__form");
const nameInput = document.querySelector(".popup__info_type_name");
const infoInput = document.querySelector(".popup__info_type_job");
const inputCreateCardTitle = document.querySelector(".popup__info_type_name-image");
const inputCreateCardSrc = document.querySelector(".popup__info_type_image");
const buttonCloseProfileForm = document.querySelector(".popup__close");
const elementsNode = document.querySelector('.elements');
const fullPopupCardImgNode = document.querySelector('.popup-full__image');
const fullPopup = document.querySelector('.popup-full');
const closeFullPopup = document.querySelector('.popup-full__close');
const fullPopupCardTitleNode = document.querySelector('.popup-full__title');
const addForm = document.querySelector('.popup__form-add');
const cardElements = document.querySelector('.element__cards');
const overleyPopups = Array.from(document.querySelectorAll(".popup"));

  const validationConfig = {
    inputSelector: '.popup__info',
    submitButtonSelector: '.popup__button',
    activeButtonClass: 'popup__button_valid',
    inactiveButtonClass: 'popup__button_invalid',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__input-error_visible'
  };

const initialCards = [
  {
    name: 'Карачаевск',
    link: './images/karachaevsk.jpg'
  },
  {
    name: 'Гора Эльбрус',
    link: './images/elbrus.jpg'
  },
  {
    name: 'Домбай',
    link: './images/Dombai.jpg'
  },
  {
    name: 'Гора Эльбрус',
    link: './images/elbrus.jpg'
  },
  {
    name: 'Домбай',
    link: './images/Dombai.jpg'
  },
  {
    name: 'Карачаевск',
    link: './images/karachaevsk.jpg'
  },
];
const editProfileFormValidator = new FormValidator(validationConfig, profileForm);
const addFormValidator = new FormValidator(validationConfig, addForm);

editProfileFormValidator.enableValidation();
addFormValidator.enableValidation();

function openPopup(modal) {
  modal.classList.add("popup_opened");
  document.addEventListener('keydown', closeByEscape);
}

function closePopup(modal) {
  modal.classList.remove("popup_opened");
  document.removeEventListener('keydown', closeByEscape);
}
buttonOpenProfileAdd.addEventListener('click', function() {
  openPopup(modalAdd)
  addForm.reset();
  addFormValidator.resetValidation();
});

buttonOpenPopupProfile.addEventListener('click', function() {
  openPopup(popupProfile)
  nameProfile.value = nameInput.textContent;
  infoProfile.value = infoInput.textContent;
  editProfileFormValidator.resetValidation();
});

function handleProfileFormSubmit(a) {
  a.preventDefault();
  nameProfile.textContent = nameInput.value;
  infoProfile.textContent = infoInput.value;
  closePopup(popupProfile);
}

function handleOpenPopup(name, link) {
  fullPopupCardImgNode.setAttribute('src', link);
  fullPopupCardImgNode.setAttribute('alt', name);
  fullPopupCardTitleNode.textContent = name;
  openPopup(fullPopup)
}

function initCards(initialCards) {
  for (const cardInfo of initialCards) {
    renderCard(cardInfo);
  }
};

function renderCard(cardInfo, type = 'append') {
  const card = new Card(cardInfo, '#cardTemplate', handleOpenPopup);
  const cardNode = card.createCardNode();

  if (type === 'append') {
    elementsNode.append(cardNode);
  } else if (type === 'prepend') {
    elementsNode.prepend(cardNode);
  }
}

function closeByEscape(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened')
    closePopup(openedPopup)
  }
}

function addNewCard(event) {
  event.preventDefault();

  const titleName = inputCreateCardTitle.value;
  const srcLink = inputCreateCardSrc.value;

  const cardInfo = {
    name: titleName,
    link: srcLink
  };

  renderCard(cardInfo, 'prepend');
  closePopup(modalAdd);
}

profileForm.addEventListener('submit', handleProfileFormSubmit);
closeFullPopup.addEventListener('click', () => closePopup(fullPopup));
buttonCloseProfileAdd.addEventListener('click', () => closePopup(modalAdd));

overleyPopups.forEach((overley) => {
  overley.addEventListener("click", (evt) => {

    if (evt.target.classList.contains('popup_opened')) {
      closePopup(evt.target);
    }

  });
});

buttonCloseProfileForm.addEventListener('click', () => closePopup(popupProfile));

addForm.addEventListener('submit', addNewCard);

initCards(initialCards);