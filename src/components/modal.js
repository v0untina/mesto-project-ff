import "./../pages/index.css";
import { profileTitle, profileDescription, editPopup, newCardPopup,
    nameInput, jobInput, textInput, urlInput} from "./index.js";
import { addNewCard } from "./card.js";

export function openPopup(popup) {
  popup.classList.add("popup_is-animated")
  popup.classList.add("popup_is-opened");
  document.addEventListener("keydown", closeByEscape);
}

export function closePopup(popup) {
  popup.classList.add("popup_is-animated")
  popup.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", closeByEscape);
}

function closeByEscape(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_is-opened");
    closePopup(openedPopup);
  }
}

export function setupPopupCloseListeners() {
  const popups = document.querySelectorAll(".popup");
  
  popups.forEach((popup) => {
    popup.addEventListener("mousedown", (evt) => {
      if (evt.target.classList.contains("popup_is-opened") || 
          evt.target.classList.contains("popup__close")) {
        closePopup(popup);
      }
    });
  });
}

setupPopupCloseListeners();

export function handleFormSubmit(evt) {
  evt.preventDefault();
}

export function fillProfileForm(name, job) {
    const nameInput = editPopup.querySelector(".popup__input_type_name");
    const jobInput = editPopup.querySelector(".popup__input_type_description");
    
    nameInput.value = name;
    jobInput.value = job;
}
  
export function handleProfileFormSubmit(evt) {
    evt.preventDefault();
    
    profileTitle.textContent = nameInput.value;
    profileDescription.textContent = jobInput.value;
    
    closePopup(editPopup);
}

export function handleAddFormSubmit(evt) {
    evt.preventDefault();

    addNewCard(textInput.value, urlInput.value,true);
    
    closePopup(newCardPopup);
    evt.target.reset();

} 
