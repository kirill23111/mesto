const buttonOpenPopupProfile = document.querySelector(".profile__edit-button");
const popupProfile = document.querySelector('.popup-profile')
const buttonOpenProfileAdd = document.querySelector(".profile__add-button")
const buttonCloseProfileAdd = document.querySelector(".popup__close-add");
const buttonsaveProfile = document.querySelector(".popup__save");
const nameProfile = document.querySelector(".profile__title");
const infoProfile = document.querySelector(".profile__paragraph");
const modalAdd = document.querySelector(".popup-add")
const profileForm = document.querySelector(".popup__form");
const nameInput = document.querySelector(".popup__info_type_name");
const infoInput = document.querySelector(".popup__info_type_job");
const inputCreateCardTitle = document.querySelector(".popup__info_type_name-image");
const inputCreateCardSrc = document.querySelector(".popup__info_type_image");
const buttonCloseProfileForm = document.querySelector(".popup__close");
const elementsNode = document.querySelector('.elements');
const fullPopupCardImgNode = document.querySelector('.popup-full__image')
const fullPopupCardTitleNode = document.querySelector('.popup-full__title')
const addForm = document.querySelector('.popup__form-add')

function openPopup(modal) {
  modal.classList.add("popup_opened");
  document.addEventListener('keydown', closeByEscape); 
}

function closePopup(modal) {
  modal.classList.remove("popup_opened");
  document.removeEventListener('keydown', closeByEscape);
}

buttonOpenPopupProfile.addEventListener('click', () =>  {
  nameInput.value = nameProfile.textContent;
  infoInput.value = infoProfile.textContent;

  openPopup(popupProfile)
});

buttonCloseProfileForm.addEventListener('click', () => closePopup(popupProfile));

function handleProfileFormSubmit(a) {
  a.preventDefault();
  nameProfile.textContent = nameInput.value;
  infoProfile.textContent = infoInput.value;

  closePopup(popupProfile);
}

profileForm.addEventListener('submit', handleProfileFormSubmit);


buttonOpenProfileAdd.addEventListener('click', function (evt) {
  evt.preventDefault();
  openPopup(modalAdd);
  // openPopup(addForm, validationConfig);
});
buttonCloseProfileAdd.addEventListener('click', () => closePopup(modalAdd));

const overleyPopups = Array.from(document.querySelector(".popup"));
overleyPopups.forEach((overleyPopups) => {
  overleyPopups.addEventListener("click", (evt) => {

    if (evt.target.classList.contains('popup_opened')) {
      closePopup(evt.target);
    }

  });
});    

function initCards(cardsInfo) {
  for (const cardInfo of cardsInfo) {
    renderCard(cardInfo);
  }
}

function renderCard(cardInfo, type = 'append') {
  const cardNode = createCardNode(cardInfo);
  
  if (type === 'append') {
    elementsNode.append(cardNode);
  } else if (type === 'prepend') {
    elementsNode.prepend(cardNode);
  }
}
const cardTemplate = document.querySelector('#cardTemplate').content;

// возвращает узел (в браузере ничего не появляется)
function createCardNode(cardInfo) {
  const elementNode = cardTemplate.querySelector('.element').cloneNode(true);;
  const imageNode = elementNode.querySelector('.element__image');
  const nameNode = elementNode.querySelector('.element__name');
  const likeNode = elementNode.querySelector('.element__like');
  const trashNode =  elementNode.querySelector('.element__trash');

  trashNode.addEventListener('click', () => {
    elementNode.remove();
  });

  nameNode.textContent = cardInfo.title;
  imageNode.src = cardInfo.imgSrc;
  imageNode.alt = cardInfo.title;
  imageNode.title = cardInfo.title;

  imageNode.addEventListener('click', () => {
    fullPopupCardImgNode.src = cardInfo.imgSrc;
    fullPopupCardTitleNode.textContent = cardInfo.title;
    fullPopupCardTitleNode.alt = cardInfo.title;

    openPopup(fullPopup)
  });

  likeNode.addEventListener('click', () => {
    likeNode.classList.toggle('element__like_active');
  });

  return elementNode;
}
const fullPopup = document.querySelector('.popup-full')
const closeFullPopup = document.querySelector('.popup-full__close')

closeFullPopup.addEventListener('click', () => closePopup(fullPopup));

function closeByEscape(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened')
    closePopup(openedPopup)
  }
}


const cardsInfo = [
  {
    title: 'Карачаевск',
    imgSrc: './images/karachaevsk.jpg'
  },
  {
    title: 'Гора Эльбрус',
    imgSrc: './images/elbrus.jpg'
  },
  {
  title: 'Домбай',
    imgSrc: './images/Dombai.jpg'
  },
  {
    title: 'Гора Эльбрус',
    imgSrc: './images/elbrus.jpg'
  },
  {
   title: 'Домбай',
   imgSrc: './images/Dombai.jpg'
  },
  {
    title: 'Карачаевск',
    imgSrc: './images/karachaevsk.jpg'
  },
];
const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__info',
  submitButtonSelector: '.popup__button',
  activeButtonClass: 'popup__button_valid',
  inactiveButtonClass: 'popup__button_invalid',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_visible'
};



const addNewCard = (event) => {
  event.preventDefault();

  const titleName = inputCreateCardTitle.value;
  const srcLink = inputCreateCardSrc.value;

  const cardInfo = {
    title: titleName,
    imgSrc: srcLink
  };

  renderCard(cardInfo, 'prepend');
  closePopup(modalAdd);
  addForm.reset();
};

addForm.addEventListener('submit', addNewCard);

initCards(cardsInfo);
enableValidation(validationConfig);