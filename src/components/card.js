import { initialCards } from "./cards";
import "./../pages/index.css";
import { cardTemplate, placesList, imgSrc, caption,imageContentPopup} from "./index";
import { openPopup } from "./modal";


export function addNewCard(text, src,bool) {
    const card = cardTemplate.cloneNode(true).querySelector(".card");
    const cardTitle = card.querySelector(".card__title");
    const cardImage = card.querySelector(".card__image");
    const likeButton = card.querySelector(".card__like-button");
    const deleteButton = card.querySelector(".card__delete-button");
    
    cardTitle.textContent = text;
    cardImage.src = src;
    cardImage.alt = text;

    card.addEventListener("click", () => openCardPopup(text, src));
    likeButton.addEventListener("click", likeCard);
    deleteButton.addEventListener("click", () => deleteCard(card));
    
    if (bool){
        placesList.prepend(card);
    }
    else{
        placesList.append(card);
    }
}

export function openCardPopup(text, src) {
    imgSrc.src = src;
    imgSrc.alt = text
    caption.textContent = text

    openPopup(imageContentPopup)
}

export function createCards() {
    initialCards.forEach(element => {
        addNewCard(element.name, element.link);
    });
}

export function deleteCard(cardElement) {
    cardElement.remove();
}

export function likeCard(evt) {
    evt.target.classList.toggle('card__like-button_is-active');
}