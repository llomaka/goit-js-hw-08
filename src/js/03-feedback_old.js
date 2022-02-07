import throttle from 'lodash.throttle';
const refs = {
  form: document.querySelector('.feedback-form'),
  email: document.forms[0].email,
  message: document.forms[0].message,
};
const STORAGE_KEY = 'feedback-form-state';

const populateInputs = function () {
  const savedObject = localStorage.getItem(STORAGE_KEY);
  if (savedObject) {
    const parsedSavedObject = JSON.parse(savedObject);
    if (Object.keys(parsedSavedObject).length === 2) {
      refs.email.value = parsedSavedObject.email;
      refs.message.value = parsedSavedObject.message;
      return;
    } else if (parsedSavedObject.hasOwnProperty('email')) {
      refs.email.value = parsedSavedObject.email;
    } else if (parsedSavedObject.hasOwnProperty('message')) {
      refs.message.value = parsedSavedObject.message;
    }
  }
}
populateInputs();

const storageParams = {};

const saveInterimInStorage = event => {
  if (localStorage.getItem(STORAGE_KEY)) {
    const storageObj = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (storageObj.hasOwnProperty('email')) {
      storageParams.email = storageObj.email;
    }
    if (storageObj.hasOwnProperty('message')) {
      storageParams.message = storageObj.message;
    }
  }
  if (event.target.name === 'email') {
    storageParams.email = event.target.value;
  } else {
    storageParams.message = event.target.value.trim();
  }
  throttle(localStorage.setItem(STORAGE_KEY, JSON.stringify(storageParams)), 500);
};

const onFormSubmit = event => {
  event.preventDefault();
  console.log(JSON.parse(localStorage.getItem(STORAGE_KEY)));
  console.log('Данные формы отправлены');
  event.currentTarget.reset();
  localStorage.removeItem(STORAGE_KEY);
  storageParams = {};
};

refs.email.addEventListener('input', saveInterimInStorage);
refs.message.addEventListener('input', saveInterimInStorage);
refs.form.addEventListener('submit', onFormSubmit);
