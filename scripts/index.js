const cardTemplate = document.querySelector("#card-template").content;
const placesList = document.querySelector(".places__list");

function createCard(cardData, deleteCardHandler) {
    const card = cardTemplate.cloneNode(true).querySelector(".card");
    const cardTitle = card.querySelector(".card__title");
    const cardImage = card.querySelector(".card__image");
    const deleteButton = card.querySelector(".card__delete-button");

    cardTitle.textContent = cardData.name;
    cardImage.src = cardData.link;
    cardImage.alt = cardData.name;

    deleteButton.addEventListener("click", deleteCardHandler);

    return card;
}

function deleteCard(event) {
    const card = event.target.closest(".card");
    card.remove();
}

initialCards.forEach(cardData => {
    const cardElement = createCard(cardData, deleteCard);
    placesList.append(cardElement);
});