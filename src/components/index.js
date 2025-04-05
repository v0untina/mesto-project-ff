import "../pages/index.css"
import { initialCards } from "./cards";

const cardTemplate = document.querySelector("#card-template").content;
const placesList = document.querySelector(".places__list");

function createCard(){
    initialCards.forEach(element => {
        const card = cardTemplate.cloneNode(true).querySelector(".card");
        const cardTitle = card.querySelector(".card__title");
        const cardImage = card.querySelector(".card__image");
        const deleteButton = card.querySelector(".card__delete-button");
        cardTitle.textContent = element.name;
        cardImage.src = element.link;
        deleteButton.addEventListener("click", ()=>{
            card.remove()
        })
        placesList.append(card)
    });
}


createCard()

