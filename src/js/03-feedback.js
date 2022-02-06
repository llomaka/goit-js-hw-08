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
    } else if (parsedSavedObject.email !== undefined) {
      refs.email.value = parsedSavedObject.email;
    } else if (parsedSavedObject.message !== undefined) {
      refs.message.value = parsedSavedObject.message;
    }
  }
}
populateInputs();
const saveInterimInStorage = event => {
  const storageParams = {};
  if (localStorage.getItem(STORAGE_KEY)) {
    const storageObj = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (storageObj.email !== undefined) {
      storageParams.email = storageObj.email;
    } else if (storageObj.message !== undefined) {
      storageParams.message = storageObj.message;
    }
  }
  if (event.currentTarget.name === 'email') {
  storageParams.email = event.currentTarget.value;
  } else {
  storageParams.message = event.currentTarget.value.trim();
  }
  throttle(localStorage.setItem(STORAGE_KEY, JSON.stringify(storageParams)), 500);
};
const onFormSubmit = event => {
  event.preventDefault();
  console.log(JSON.parse(localStorage.getItem(STORAGE_KEY)));
  localStorage.removeItem(STORAGE_KEY);
  console.log('Данные формы отправлены');
  event.currentTarget.reset();
};
refs.email.addEventListener('input', saveInterimInStorage);
refs.message.addEventListener('input', saveInterimInStorage);
refs.form.addEventListener('submit', onFormSubmit);
