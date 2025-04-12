import { toggleCardLike, removeLike, deleteCardFromServer } from "./api.js";

// Функция для создания карточки
export function createCard(
  cardData,
  likeCallback,
  deleteCallback,
  handleImageClick,
  currentUserId
) {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");

  // Заполнение карточки данными
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardElement.querySelector(".card__title").textContent = cardData.name;

  // Отображаем количество лайков
  const likesCount = cardElement.querySelector(".card__like-count");
  likesCount.textContent = cardData.likes.length;

  // Обработчик лайка
  const likeButton = cardElement.querySelector(".card__like-button");

  if (cardData.likes.some((like) => like._id === currentUserId)) {
    likeButton.classList.add("card__like-button_is-active");
  } else {
    likeButton.classList.remove("card__like-button_is-active");
  }

  likeButton.addEventListener("click", () => {
    likeCallback(likeButton, cardData._id, likesCount);
  });

  // Обработчик удаления карточки
  const deleteButton = cardElement.querySelector(".card__delete-button");

  if (cardData.owner._id === currentUserId) {
    deleteButton.style.display = "block";
    deleteButton.addEventListener("click", () =>
      deleteCallback(cardElement, cardData._id)
    );
  } else {
    deleteButton.style.display = "none";
  }

  // Обработчик клика по картинке
  cardImage.addEventListener("click", () => handleImageClick(cardImage));

  return cardElement;
}

// Функция для переключения состояния лайка
export function toggleLike(likeButton, cardId, likesCountElement) {
  const isLiked = likeButton.classList.contains("card__like-button_is-active");

  // Сохраняем текущее количество лайков
  const currentLikes = parseInt(likesCountElement.textContent, 10);

  if (isLiked) {
    // Если лайкнут,запрос на удаление
    removeLike(cardId)
      .then((updatedCardData) => {
        likesCountElement.textContent = updatedCardData.likes.length;
        likeButton.classList.remove("card__like-button_is-active");
      })
      .catch((error) => {
        console.error(error);
        alert("Ошибка при удалении лайка.");
      });
  } else {
    // Если не лайкнут,запрос на добавление
    toggleCardLike(cardId)
      .then((updatedCardData) => {
        likesCountElement.textContent = updatedCardData.likes.length;
        likeButton.classList.add("card__like-button_is-active");
      })
      .catch((error) => {
        console.error(error);
        alert("Ошибка при добавлении лайка.");
      });
  }
}

export function deleteCard(cardElement, cardId) {
  // Отправка запроса на удаление карточки с сервера
  deleteCardFromServer(cardId)
    .then(() => {
      cardElement.remove();
    })
    .catch((error) => {
      console.error("Ошибка при удалении карточки:", error);
    });
}
