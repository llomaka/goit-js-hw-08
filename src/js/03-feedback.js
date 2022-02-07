import throttle from 'lodash.throttle';
const STORAGE_KEY = 'feedback-form-state';
const refs = {
  form: document.querySelector('.feedback-form'),
  email: document.forms[0].email,
  message: document.forms[0].message,
};
const storageParams = {};

refs.email.addEventListener('input', throttle(saveInterimInStorage, 500));
refs.message.addEventListener('input', throttle(saveInterimInStorage, 500));
refs.form.addEventListener('submit', onFormSubmit);

console.log(refs.email);
console.log(refs.message);
console.log(storageParams);

const populateInputs = function () {
  if (localStorage.getItem(STORAGE_KEY)) {
    const parsedObject = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (Object.keys(parsedObject).length === 2) {
      refs.email.value = parsedObject.email;
      refs.message.value = parsedObject.message;
      return;
    } else {
      if (parsedObject.hasOwnProperty('email')) {
        refs.email.value = parsedObject.email;
      }
      if (parsedObject.hasOwnProperty('message')) {
        refs.message.value = parsedObject.message;
      }
      return;
    }
  }
}
populateInputs();

const saveInterimInStorage = event => {
  if (event.target.name === 'email') {
    storageParams.email = event.target.value;
  } else {
    storageParams.message = event.target.value.trim();
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(storageParams));
  storageParams = {};
};

const onFormSubmit = event => {
  event.preventDefault();
  console.log(event.currentTarget.elements);
  const {
    elements: { email }
  } = event.currentTarget;
  if (email.value === "") {
    return alert("Поле Email формы должно быть заполнено!");
  }
  console.log(JSON.parse(localStorage.getItem(STORAGE_KEY)));
  console.log('Данные формы отправлены');
  event.currentTarget.reset();
  localStorage.removeItem(STORAGE_KEY);
  storageParams = {};
};
