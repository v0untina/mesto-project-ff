import "./../pages/index.css";
import { createCards, addNewCard, deleteCard, likeCard } from "./card";
import { openPopup, fillProfileForm, handleProfileFormSubmit, handleAddFormSubmit } from "./modal";

export const cardTemplate = document.querySelector("#card-template").content;
export const placesList = document.querySelector(".places__list");

export const profileTitle = document.querySelector(".profile__title");
export const profileDescription = document.querySelector(".profile__description");

export const profileAddButton = document.querySelector(".profile__add-button");
export const profileEditButton = document.querySelector(".profile__edit-button");

export const editPopup = document.querySelector(".popup_type_edit");
export const newCardPopup = document.querySelector(".popup_type_new-card");
export const imageContentPopup = document.querySelector(".popup_type_image");


export const editForm = document.forms["edit-profile"];
export const nameInput = editForm.querySelector(".popup__input_type_name");
export const jobInput = editForm.querySelector(".popup__input_type_description");

export const addForm = document.forms["new-place"];
export const textInput = addForm.querySelector(".popup__input_type_card-name");
export const urlInput = addForm.querySelector(".popup__input_type_url");

export const imgSrc = imageContentPopup.querySelector(".popup__image");
export const caption = imageContentPopup.querySelector(".popup__caption");

createCards();

// Обработчики
profileAddButton.addEventListener("click", () => openPopup(newCardPopup));
profileEditButton.addEventListener("click", () => {
  fillProfileForm(profileTitle.textContent, profileDescription.textContent);
  openPopup(editPopup);
});

// Обработчик отправки формы профиля
editForm.addEventListener("submit", handleProfileFormSubmit);
addForm.addEventListener("submit", handleAddFormSubmit);

