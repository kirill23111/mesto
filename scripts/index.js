let openProfileForm = document.querySelector(".profile__edit-button");
let saveProfile = document.querySelector(".popup__save");
let nameProfile = document.querySelector(".profile__title");
let infoProfile = document.querySelector(".profile__paragraph");
let modal = document.querySelector(".popup");
let form = document.querySelector(".popup__form");
let nameInput = document.querySelector(".popup__info_type_name");
let infoInput = document.querySelector(".popup__info_type_job");
let closeProfileForm = document.querySelector(".popup__close");


function openProfile() {
  modal.classList.add("popup_opened");
  nameInput.value = nameProfile.textContent;
  infoInput.value = infoProfile.textContent;
}

  openProfileForm.addEventListener('click', openProfile);


function closeProfile() {
  modal.classList.remove("popup_opened");
}

  closeProfileForm.addEventListener('click', closeProfile);


function formSubmitHandler(a) {
  a.preventDefault();
  nameProfile.textContent = nameInput.value;
  infoProfile.textContent = infoInput.value;

  saveProfile.addEventListener('click', closeProfile);
}

  form.addEventListener('submit', formSubmitHandler); 