
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
      return;
    } else if (parsedSavedObject.message !== undefined) {
      refs.message.value = parsedSavedObject.message;
      return;
    }
  }
}
populateInputs();

const saveInterimInStorage = event => {
  const storageParams = {};
  if (event.currentTarget.name === 'email') {
  storageParams.email = event.currentTarget.value.trim();
  } else {
  storageParams.message = event.currentTarget.value.trim();
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(storageParams));
};
const onFormSubmit = event => {
  event.preventDefault();
  localStorage.removeItem(STORAGE_KEY);
  console.log('Данные формы отправлены');
  event.currentTarget.reset();
}
refs.email.addEventListener('input', saveInterimInStorage);
refs.message.addEventListener('input', saveInterimInStorage);
refs.form.addEventListener('submit', onFormSubmit);
