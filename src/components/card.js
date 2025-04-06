import "./../pages/index.css";
import { cardTemplate } from "./index";

export function createCard(text, src, openCardPopup) {
    const cardElement = cardTemplate.cloneNode(true).querySelector(".card");
    const cardTitle = cardElement.querySelector(".card__title");
    const cardImage = cardElement.querySelector(".card__image");
    const likeButton = cardElement.querySelector(".card__like-button");
    const deleteButton = cardElement.querySelector(".card__delete-button");

    cardTitle.textContent = text;
    cardImage.src = src;
    cardImage.alt = text;

    cardImage.addEventListener("click", () => openCardPopup(text, src));
    likeButton.addEventListener("click", (e) => {
        e.stopPropagation();
        toggleLike(e.target);
    });
    deleteButton.addEventListener("click", (e) => {
        e.stopPropagation();
        deleteCard(cardElement);
    });
    
    return cardElement;
}

function deleteCard(cardElement) {
    cardElement.remove();
}

function toggleLike(likeButton) {
    likeButton.classList.toggle('card__like-button_is-active');
}