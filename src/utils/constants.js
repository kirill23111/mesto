const buttonOpenPopupProfile = document.querySelector(".profile__edit-button");
const buttonOpenProfileAdd = document.querySelector(".profile__add-button")
const profileForm = document.querySelector(".popup__form");
const nameInput = document.querySelector(".popup__info_type_name");
const infoInput = document.querySelector(".popup__info_type_job");
const addForm = document.querySelector('.popup__form-add');
const profileNewAvatarButton = document.querySelector(".profile__image_button");
const validationConfig = {
	inputSelector: '.popup__info',
	submitButtonSelector: '.popup__button',
	activeButtonClass: 'popup__button_valid',
	inactiveButtonClass: 'popup__button_invalid',
	inputErrorClass: 'popup__input_type_error',
	errorClass: 'popup__input-error_visible'
};

export {
  buttonOpenPopupProfile,
  buttonOpenProfileAdd,
  profileForm,
  nameInput,
  addForm,
  infoInput,
  profileNewAvatarButton,
  validationConfig,
};
