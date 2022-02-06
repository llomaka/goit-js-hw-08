import throttle from 'lodash.throttle';
const refs = {
  form: document.querySelector('.feedback-form'),
  email: document.forms[0].email,
  message: document.forms[0].message,
};
const STORAGE_KEY = 'feedback-form-state';
const obj = {};
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
      return;
    } else if (parsedSavedObject.message !== undefined) {
      refs.message.value = parsedSavedObject.message;
      return;
    }
  }
}
populateInputs();
const saveInStorage = object => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(object));
};
const saveEmail = event => {
  obj.email = event.currentTarget.value;
  throttle(saveInStorage(obj), 500);
};
const saveMessage = event => {
  obj.message = event.currentTarget.value.trim();
  throttle(saveInStorage(obj), 500);
};
const onFormSubmit = event => {
  event.preventDefault();
  console.log(JSON.parse(localStorage.getItem(STORAGE_KEY)));
  localStorage.removeItem(STORAGE_KEY);
  console.log('Данные формы отправлены');
  event.currentTarget.reset();
};
refs.email.addEventListener('input', saveEmail);
refs.message.addEventListener('input', saveMessage);
refs.form.addEventListener('submit', onFormSubmit);
