import { initialCards } from "./cards";
import "./../pages/index.css";
import { cardTemplate,openCardPopup} from "./index";


export function addNewCard(text, src) {
    const card = cardTemplate.cloneNode(true).querySelector(".card");
    const cardTitle = card.querySelector(".card__title");
    const cardImage = card.querySelector(".card__image");
    const likeButton = card.querySelector(".card__like-button");
    const deleteButton = card.querySelector(".card__delete-button");

    cardTitle.textContent = text;
    cardImage.src = src;
    cardImage.alt = text;

    cardImage.addEventListener("click", () => openCardPopup(text, src));
    likeButton.addEventListener("click", (e) => {
        e.stopPropagation();
        likeCard(e.target); 
    });
    deleteButton.addEventListener("click", (e) => {
        e.stopPropagation();
        deleteCard(card);
    });
    renderCard(card,true)
}

export function renderCard(card, prepend = false) {
    const placesList = document.querySelector(".places__list");
    if (prepend) {
        placesList.prepend(card); 
    } else {
        placesList.append(card); 
    }
}

export function deleteCard(cardElement) {
    cardElement.remove();
}

export function likeCard(evt) {
    evt.classList.toggle('card__like-button_is-active');
}