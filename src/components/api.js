const apiSettings = {
    group: 'wff-cohort-35',
    accessToken: 'cfe95dc6-b954-4a9f-a787-16df5abb597c',
    basePath: 'https://nomoreparties.co/v1/'
};
  
  // Проверка статуса ответа сервера
  const handleServerResponse = response => {
    return response.ok ? response.json() : Promise.reject(`Сервер ответил: ${response.status}`);
  };
  
  // Управление карточками пользователя
  export const getCards = () => {
    const cardsEndpoint = apiSettings.basePath + apiSettings.group + '/cards';
    
    return fetch(cardsEndpoint, {
      headers: {
        Authorization: apiSettings.accessToken
      }
    }).then(handleServerResponse);
  };
  
  // Удаление существующей карточки
  export const deleteCardFromServer = cardIdentifier => {
    const deleteEndpoint = apiSettings.basePath + apiSettings.group + '/cards/' + cardIdentifier;
    
    return fetch(deleteEndpoint, {
      method: 'DELETE',
      headers: {
        Authorization: apiSettings.accessToken
      }
    }).then(handleServerResponse);
  };
  
  // Получение профильных данных
  export const getUserData = () => {
    const profileEndpoint = apiSettings.basePath + apiSettings.group + '/users/me';
    
    return fetch(profileEndpoint, {
      headers: {
        Authorization: apiSettings.accessToken
      }
    }).then(handleServerResponse);
  };
  
  // Обновление информации о пользователе
  export const updateUserData = (userName, userDescription) => {
    const profileUpdateEndpoint = apiSettings.basePath + apiSettings.group + '/users/me';
    
    return fetch(profileUpdateEndpoint, {
      method: 'PATCH',
      headers: {
        Authorization: apiSettings.accessToken,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: userName,
        about: userDescription
      })
    }).then(handleServerResponse);
  };
  
  // Создание новой карточки
  export const addCard = cardInfo => {
    const cardCreationEndpoint = apiSettings.basePath + apiSettings.group + '/cards';
    
    return fetch(cardCreationEndpoint, {
      method: 'POST',
      headers: {
        Authorization: apiSettings.accessToken,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(cardInfo)
    }).then(handleServerResponse);
  };
  
  // Обновление аватара профиля
  export const updateAvatar = imageUrl => {
    const avatarUpdateEndpoint = apiSettings.basePath + apiSettings.group + '/users/me/avatar';
    
    return fetch(avatarUpdateEndpoint, {
      method: 'PATCH',
      headers: {
        Authorization: apiSettings.accessToken,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        avatar: imageUrl
      })
    }).then(handleServerResponse);
  };
  
  // Лайк записи
  export const toggleCardLike = cardId => {
    const likeEndpoint = apiSettings.basePath + apiSettings.group + '/cards/likes/' + cardId;
    
    return fetch(likeEndpoint, {
      method: 'PUT',
      headers: {
        Authorization: apiSettings.accessToken
      }
    }).then(handleServerResponse);
  };
  
  // Снятие лайка
  export const removeLike = cardId => {
    const unlikeEndpoint = apiSettings.basePath + apiSettings.group + '/cards/likes/' + cardId;
    
    return fetch(unlikeEndpoint, {
      method: 'DELETE',
      headers: {
        Authorization: apiSettings.accessToken
      }
    }).then(handleServerResponse);
  };
