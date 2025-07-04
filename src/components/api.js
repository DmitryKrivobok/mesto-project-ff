const config = {
  baseUrl: "https://nomoreparties.co/v1/wff-cohort-41",
  headers: {
    authorization: "40b7199b-31bd-42c9-938c-9fddd6d20107",
    "Content-Type": "application/json",
  },
};

const getResponseData = (res) => {
  if (!res.ok) {
    return Promise.reject(`Ошибка: ${res.status}`);
  }
  return res.json();
};

export const updatedUserInfo = (name, about) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({ name, about }),
  }).then(getResponseData);
};

export const addCard = (name, link) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify(name, link),
  }).then(getResponseData);
};

export const getUserInfo = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: "GET",
    headers: config.headers,
  }).then(getResponseData);
};

export const getInitialCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    method: "GET",
    headers: config.headers,
  }).then(getResponseData);
};

export const likeCard = (id) => {
  return fetch(`${config.baseUrl}/cards/likes/${id}`, {
    method: "PUT",
    headers: config.headers,
  }).then(getResponseData);
};

export const unlikeCard = (id) => {
  return fetch(`${config.baseUrl}//cards/likes/${id}`, {
    method: "DELETE",
    headers: config.headers,
  }).then(getResponseData);
};

export const updatedUserAvatar = (avatarUrl) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({ avatar: avatarUrl }),
  }).then(getResponseData);
};

export const deleteCard = (id) => {
  return fetch(`${config.baseUrl}//cards/${id}`, {
    method: "DELETE",
    headers: config.headers,
  }).then(getResponseData);
};
