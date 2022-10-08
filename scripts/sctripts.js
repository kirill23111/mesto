let openProfileForm = document.querySelector(".profile__edit-button");
let saveProfile = document.querySelector(".modal__save");
let nameProfile = document.querySelector(".profile__title");
let infoProfile = document.querySelector(".profile__paragraph");
let modal = document.querySelector(".modal");
let form = document.querySelector(".modal__form");
let nameInput = document.querySelector(".modal__name");
let infoInput = document.querySelector(".modal__job");
let closeProfileForm = document.querySelector(".modal__close");


function openProfile() {
  modal.classList.add("modal__opened");
  nameInput.value = nameProfile.textContent;
  infoInput.value = infoProfile.textContent;
}

  openProfileForm.addEventListener('click', openProfile);


function closeProfile() {
  modal.classList.remove("modal__opened");
}

  closeProfileForm.addEventListener('click', closeProfile);


function formSubmitHandler(a) {
  a.preventDefault();
  nameProfile.textContent = nameInput.value;
  infoProfile.textContent = infoInput.value;

  saveProfile.addEventListener('click', closeProfile);
}

  form.addEventListener('submit', formSubmitHandler); 