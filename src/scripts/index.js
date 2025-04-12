import "../pages/index.css";
import { createCard, toggleLike, deleteCard } from "../components/card.js";
import { openModal, closeModal } from "../components/modal.js";
import { enableValidation, clearValidation } from "../components/validation.js";
import {
  getUserData,
  getCards,
  updateUserData,
  addCard,
  updateAvatar,
} from "../components/api.js";

// Инициализация элементов DOM
const editButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");
const cardListContainer = document.querySelector(".places__list");
const editPopup = document.querySelector(".popup_type_edit");
const addCardPopup = document.querySelector(".popup_type_new-card");
const editProfileForm = document.querySelector(
  '.popup__form[name="edit-profile"]'
);
const nameInput = editProfileForm.querySelector(".popup__input_type_name");
const jobInput = editProfileForm.querySelector(
  ".popup__input_type_description"
);
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileAvatar = document.querySelector(".profile__image");
const addCardForm = document.querySelector('.popup__form[name="new-place"]');
const editPopupAvatar = document.querySelector(".popup_type_avatar");
const editAvatarForm = document.querySelector(
  '.popup__form[name="update-avatar"]'
);
const nameInputAvatar = editAvatarForm.querySelector(
  ".popup__input_type_avatar-url"
);
const avatarContainer = document.querySelector(".profile__avatar-container");
const imagePopup = document.querySelector(".popup_type_image");
const popupImage = imagePopup.querySelector(".popup__image");
const popupImageCaption = imagePopup.querySelector(".popup__caption");

const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

function handleImageClick(cardImage) {
  popupImage.src = cardImage.src;
  popupImage.alt = cardImage.alt;
  popupImageCaption.textContent = cardImage.alt;
  openModal(imagePopup);
}

// Функция для изменения состояния кнопки отправки формы
function setSubmitButtonState(button, isLoading, defaultText = "Сохранить", loadingText = "Сохранение...") {
  button.textContent = isLoading ? loadingText : defaultText;
  button.disabled = isLoading;
}

// Обработчик для формы редактирования аватара
export function handleAvatarFormSubmit(
  evt,
  avatarInput,
  profileAvatar,
  editPopupAvatar
) {
  evt.preventDefault();

  const avatarLink = avatarInput.value;
  const saveButton = evt.target.querySelector(".popup__button");

  setSubmitButtonState(saveButton, true);

  updateAvatar(avatarLink)
    .then((updatedUserData) => {
      profileAvatar.style.backgroundImage = `url(${updatedUserData.avatar})`;
      const avatarImg = document.querySelector('.profile__image');
      if (avatarImg) {
        avatarImg.style.backgroundImage = `url(${updatedUserData.avatar})`;
      }
      
      evt.target.reset();
      closeModal(editPopupAvatar);
    })
    .catch((error) => {
      console.error("Ошибка обновления аватара:", error);
    })
    .finally(() => {
      setSubmitButtonState(saveButton, false);
    });
}

// Обработчик для формы редактирования профиля
export function handleFormSubmit(
  evt,
  nameInput,
  aboutInput,
  profileTitle,
  profileDescription,
  editPopup
) {
  evt.preventDefault();

  const updatedName = nameInput.value;
  const updatedAbout = aboutInput.value;
  const saveButton = evt.target.querySelector(".popup__button");

  setSubmitButtonState(saveButton, true);

  updateUserData(updatedName, updatedAbout)
    .then((updatedUserData) => {
      profileTitle.textContent = updatedUserData.name;
      profileDescription.textContent = updatedUserData.about;
      closeModal(editPopup);
    })
    .catch((error) => {
      console.error("Ошибка редактирования профиля:", error);
    })
    .finally(() => {
      setSubmitButtonState(saveButton, false);
    });
}

// Обработчик для формы добавления новой карточки
export function handleAddCardFormSubmit(
  evt,
  addCardForm,
  cardListContainer,
  createCard,
  deleteCard,
  handleImageClick,
  addCardPopup,
  toggleLike,
  currentUserId
) {
  evt.preventDefault();

  const cardNameInput = addCardForm.querySelector(
    ".popup__input_type_card-name"
  );
  const cardLinkInput = addCardForm.querySelector(".popup__input_type_url");

  const newCardData = {
    name: cardNameInput.value,
    link: cardLinkInput.value,
  };

  const saveButton = addCardForm.querySelector(".popup__button");

  setSubmitButtonState(saveButton, true);

  addCard(newCardData)
    .then((newCard) => {
      const cardElement = createCard(
        newCard,
        toggleLike,
        (cardElement, cardId) => deleteCard(cardElement, cardId),
        handleImageClick,
        currentUserId
      );

      cardListContainer.prepend(cardElement);
      addCardForm.reset();
      closeModal(addCardPopup);
    })
    .catch((error) => {
      console.error("Ошибка добавления карточки:", error);
    })
    .finally(() => {
      setSubmitButtonState(saveButton, false);
    });
}

let currentUserId = null;

Promise.all([getUserData(), getCards()])
  .then(([userData, cardsData]) => {
    currentUserId = userData._id;
    profileTitle.textContent = userData.name;
    profileDescription.textContent = userData.about;
    profileAvatar.style.backgroundImage = `url(${userData.avatar})`;

    cardsData.forEach((cardData) => {
      const cardElement = createCard(
        cardData,
        toggleLike,
        (cardElement, cardId) => deleteCard(cardElement, cardId),
        handleImageClick,
        currentUserId
      );
      cardListContainer.append(cardElement);
    });
  })
  .catch((error) => {
    console.error("Ошибка загрузки данных:", error);
  });

// Остальной код остается без изменений
avatarContainer.addEventListener("click", () => {
  editAvatarForm.reset();
  openModal(editPopupAvatar);
  clearValidation(editAvatarForm, validationConfig);
});

addButton.addEventListener("click", () => {
  openModal(addCardPopup);
  clearValidation(addCardForm, validationConfig);
});

editButton.addEventListener("click", () => {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
  openModal(editPopup);
  clearValidation(editProfileForm, validationConfig);
});

document.querySelectorAll(".popup__close").forEach((button) => {
  button.addEventListener("click", () => {
    closeModal(button.closest(".popup"));
  });
});

editAvatarForm.addEventListener("submit", (evt) => {
  handleAvatarFormSubmit(
    evt,
    nameInputAvatar,
    avatarContainer,
    editPopupAvatar
  );
  clearValidation(editAvatarForm, validationConfig);
});

editProfileForm.addEventListener("submit", (evt) => {
  handleFormSubmit(
    evt,
    nameInput,
    jobInput,
    profileTitle,
    profileDescription,
    editPopup
  );
  clearValidation(editProfileForm, validationConfig);
});

addCardForm.addEventListener("submit", (evt) => {
  handleAddCardFormSubmit(
    evt,
    addCardForm,
    cardListContainer,
    createCard,
    deleteCard,
    handleImageClick,
    addCardPopup,
    toggleLike,
    currentUserId
  );
  clearValidation(addCardForm, validationConfig);
});

enableValidation(validationConfig);