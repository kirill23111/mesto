const openProfileForm = document.querySelector(".profile__edit-button");
const openProfileAdd = document.querySelector(".profile__add-button")
const formAdd = document.querySelector(".popup__form-add")
const closeProfileAdd = document.querySelector(".popup__close-add");
const saveProfile = document.querySelector(".popup__save");
const nameProfile = document.querySelector(".profile__title");
const infoProfile = document.querySelector(".profile__paragraph");
const modal = document.querySelector(".popup");
const modalAdd = document.querySelector(".popup-add")
const form = document.querySelector(".popup__form");
const nameInput = document.querySelector(".popup__info_type_name");
const infoInput = document.querySelector(".popup__info_type_job");
const inputCreateCardTitle = document.querySelector(".popup__info_type_name-image");
const inputCreateCardSrc = document.querySelector(".popup__info_type_image");
const closeProfileForm = document.querySelector(".popup__close");
const elementsNode = document.querySelector('.elements');
const cardTemplate = document.querySelector('#cardTemplate');

function openProfile() {
  modal.classList.add("popup_opened");
  nameInput.value = nameProfile.textContent;
  infoInput.value = infoProfile.textContent;
}

function closeProfile() {
  modal.classList.remove("popup_opened");
}

function formSubmitHandler(a) {
  a.preventDefault();
  nameProfile.textContent = nameInput.value;
  infoProfile.textContent = infoInput.value;

  closeProfile();
}

function openAdd() {
  modalAdd.classList.add("popup_opened-add");
  nameInput.value = nameProfile.textContent;
  infoInput.value = infoProfile.textContent;
}

function closeAdd() {
  modalAdd.classList.remove("popup_opened-add");
}

openProfileAdd.addEventListener('click', openAdd);
closeProfileAdd.addEventListener('click', closeAdd);


// Эта функция рендерит карточки в браузере
// cardsInfo - массив с объектами, в которых хранится информация о карточках
// whereToInsertNode - узел, куда будем вставлять(рендерить) карточки-узлы
function initRenderCards(cardsInfo) {
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

// возвращает узел (в браузере ничего не появляется)
function createCardNode(cardInfo) {
  const cardTemplateFragment = cardTemplate.content.cloneNode(true);
  const elementNode = cardTemplateFragment.querySelector('.element');
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

  const fullPopup = document.querySelector('.popup-full')
  const fullClose = document.querySelector('.popup-full__close')
  const fullPopupCardImgNode = document.querySelector('.popup-full__image')
  const fullPopupCardTitleNode = document.querySelector('.popup-full__title')

  imageNode.addEventListener('click', () => {
    fullPopup.classList.add('popup-full_active');
    fullPopupCardImgNode.src = cardInfo.imgSrc;
    fullPopupCardTitleNode.textContent = cardInfo.title;
  });
  function closeFullPopup() {
    fullPopup.classList.remove('popup-full_active');
  }
  
  fullClose.addEventListener('click', closeFullPopup);

  likeNode.addEventListener('click', () => {
  
    if (likeNode.classList.contains('element__like_active')) {
      likeNode.classList.remove('element__like_active');
    } else { 
      likeNode.classList.add('element__like_active');
    }

  });

  return elementNode;
}

openProfileForm.addEventListener('click', openProfile);
closeProfileForm.addEventListener('click', closeProfile);
form.addEventListener('submit', formSubmitHandler);

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


const addNewCard = (event) => {
  event.preventDefault();

  const titleName = inputCreateCardTitle.value;
  const srcLink = inputCreateCardSrc.value;

  const cardInfo = {
    title: titleName,
    imgSrc: srcLink
  };

  renderCard(cardInfo, 'prepend');
  formAdd.reset();
  closeAdd();
};

formAdd.addEventListener('submit', addNewCard);

initRenderCards(cardsInfo);