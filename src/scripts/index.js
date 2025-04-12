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
const popupCaption = imagePopup.querySelector(".popup__caption");

const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

function handleImageClick(cardImage) {
  // Установка изображения в попап
  popupImage.src = cardImage.src;
  popupImage.alt = cardImage.alt;
  popupCaption.textContent = cardImage.alt;

  // Открытие попапа с изображением
  openModal(imagePopup);
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
  const originalButtonText = saveButton.textContent;

  // изменение текста кнопки на "Сохранение..."
  saveButton.textContent = "Сохранение...";
  saveButton.disabled = true; // Отключение кнопки

  // запрос на обновление аватара
  updateAvatar(avatarLink)
    .then((updatedUserData) => {
      profileAvatar.style.backgroundImage = `url(${updatedUserData.avatar})`;

      closeModal(editPopupAvatar);
    })
    .catch((error) => {
      console.error("Ошибка обновления аватара:", error);
    })
    .finally(() => {
      saveButton.textContent = originalButtonText;
      saveButton.disabled = false;
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
  const originalButtonText = saveButton.textContent;

  // Меняем текст кнопки на "Сохранение..."
  saveButton.textContent = "Сохранение...";
  saveButton.disabled = true; // Отключаем кнопку

  updateUserData(updatedName, updatedAbout)
    .then((updatedUserData) => {
      // Обновляем данные на странице
      profileTitle.textContent = updatedUserData.name;
      profileDescription.textContent = updatedUserData.about;

      // Закрытие попапа
      closeModal(editPopup);
    })
    .catch((error) => {
      console.error("Ошибка редактирования профиля:", error);
    })
    .finally(() => {
      saveButton.textContent = originalButtonText;
      saveButton.disabled = false;
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
  const originalButtonText = saveButton.textContent;

  // Меняем текст кнопки на "Сохранение..."
  saveButton.textContent = "Сохранение...";
  saveButton.disabled = true; // Отключаем кнопку

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
      // Восстанавливаем текст кнопки и активируем её после завершения операции
      saveButton.textContent = originalButtonText;
      saveButton.disabled = false;
    });
}

let currentUserId = null;

Promise.all([getUserData(), getCards()])
  .then(([userData, cardsData]) => {
    // ID текущего пользователя
    currentUserId = userData._id;
    // Обновление профиля
    profileTitle.textContent = userData.name;
    profileDescription.textContent = userData.about;
    profileAvatar.style.backgroundImage = `url(${userData.avatar})`;

    // Отображаение карточек
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

// Открытие попапа редактирования аватара
avatarContainer.addEventListener("click", () => {
  editAvatarForm.reset();
  openModal(editPopupAvatar);
  clearValidation(editAvatarForm, validationConfig);
});

// Открытие попапа добавления новой карточки
addButton.addEventListener("click", () => {
  openModal(addCardPopup);
  clearValidation(addCardForm, validationConfig);
});

// Открытие попапа редактирования профиля
editButton.addEventListener("click", () => {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
  openModal(editPopup);
  clearValidation(editProfileForm, validationConfig);
});

// Закрытие попапов
document.querySelectorAll(".popup__close").forEach((button) => {
  button.addEventListener("click", () => {
    closeModal(button.closest(".popup"));
  });
});

// Обработчик отправки формы обновления аватара
editAvatarForm.addEventListener("submit", (evt) => {
  handleAvatarFormSubmit(
    evt,
    nameInputAvatar,
    avatarContainer,
    editPopupAvatar
  );
  clearValidation(editAvatarForm, validationConfig);
});

// Обработчик отправки формы редактирования профиля
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

// Обработчик отправки формы добавления карточки
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

// включение валидации вызовом enableValidation
enableValidation(validationConfig);