import throttle from 'lodash.throttle';
const STORAGE_KEY = 'feedback-form-state';
const refs = {
  form: document.querySelector('.feedback-form'),
  email: document.forms[0].email,
  message: document.forms[0].message,
};

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
  let email = '';
  let message = '';
  if (event.target.name === 'email') {
    email = event.target.value;
    if (localStorage.getItem(STORAGE_KEY)) {
      if (JSON.parse(localStorage.getItem(STORAGE_KEY)).hasOwnProperty('message')) {
        message = JSON.parse(localStorage.getItem(STORAGE_KEY)).message;
        localStorage.setItem(STORAGE_KEY, JSON.stringify({ email, message }));
        return;
      }
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ email }));
  }
  else {
    message = event.target.value.trim();
    if (localStorage.getItem(STORAGE_KEY)) {
      if (JSON.parse(localStorage.getItem(STORAGE_KEY)).hasOwnProperty('email')) {
        email = JSON.parse(localStorage.getItem(STORAGE_KEY)).email;
        localStorage.setItem(STORAGE_KEY, JSON.stringify({ email, message }));
        return;
      }
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ message }));
  }
};

const onFormSubmit = event => {
  event.preventDefault();
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
};

refs.email.addEventListener('input', throttle(saveInterimInStorage, 500));
refs.message.addEventListener('input', throttle(saveInterimInStorage, 500));
refs.form.addEventListener('submit', onFormSubmit);