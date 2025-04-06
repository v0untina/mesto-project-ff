import "./../pages/index.css";
import { createCard } from "./card";
import { initialCards } from "./cards";
import { openPopup, closePopup, setupPopupCloseListeners } from "./modal";

export const cardTemplate = document.querySelector("#card-template").content;
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileAddButton = document.querySelector(".profile__add-button");
const profileEditButton = document.querySelector(".profile__edit-button");
const editPopup = document.querySelector(".popup_type_edit");
const newCardPopup = document.querySelector(".popup_type_new-card");
const imageContentPopup = document.querySelector(".popup_type_image");
const editForm = document.forms["edit-profile"];
const nameInput = editForm.querySelector(".popup__input_type_name");
const jobInput = editForm.querySelector(".popup__input_type_description");
const addForm = document.forms["new-place"];
const textInput = addForm.querySelector(".popup__input_type_card-name");
const placeCardUrlInput = addForm.querySelector(".popup__input_type_url");
const popupImageElement = imageContentPopup.querySelector(".popup__image");
const popupCaptionElement = imageContentPopup.querySelector(".popup__caption");

export function openCardPopup(text, src) {
  popupImageElement.src = src;
  popupImageElement.alt = text;
  popupCaptionElement.textContent = text;
  openPopup(imageContentPopup);
}

function renderCard(cardElement, prepend = false) {
  const placesList = document.querySelector(".places__list");
  if (prepend) {
    placesList.prepend(cardElement);
  } else {
    placesList.append(cardElement);
  }
}

function createInitialCards() {
  initialCards.forEach(cardData => {
    const cardElement = createCard(cardData.name, cardData.link, openCardPopup);
    renderCard(cardElement);
  });
}

function fillProfileForm(name, job) {
  nameInput.value = name;
  jobInput.value = job;
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  closePopup(editPopup);
}

function handleAddFormSubmit(evt) {
  evt.preventDefault();
  const cardElement = createCard(textInput.value, placeCardUrlInput.value, openCardPopup);
  renderCard(cardElement, true);
  closePopup(newCardPopup);
  evt.target.reset();
}

setupPopupCloseListeners();
createInitialCards();

profileAddButton.addEventListener("click", () => {
  addForm.reset();
  openPopup(newCardPopup);
});

profileEditButton.addEventListener("click", () => {
  fillProfileForm(profileTitle.textContent, profileDescription.textContent);
  openPopup(editPopup);
});

editForm.addEventListener("submit", handleProfileFormSubmit);
addForm.addEventListener("submit", handleAddFormSubmit);