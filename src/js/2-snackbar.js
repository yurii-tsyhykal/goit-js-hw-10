import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const refs = {
  formEl: document.querySelector('.form'),
  delayInput: document.querySelector('[name="delay"]'),
  inputFulf: document.querySelector('input[name="state"][value="fulfilled"]'),
  //   inputRej: document.querySelector('[value="rejected"]'),
  submitBtn: document.querySelector('[type="submit"]'),
};

refs.formEl.addEventListener('submit', onSubmitForm);

function onSubmitForm(e) {
  e.preventDefault();

  const delay = Number(refs.delayInput.value);

  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (refs.inputFulf.checked) {
        resolve(delay);
      } else {
        reject(delay);
      }
    }, delay);
  });

  promise
    .then(delay =>
      iziToast.success({
        title: 'OK',
        titleSize: 16,
        titleColor: '#fff',
        message: `Fulfilled promise in ${delay}ms`,
        theme: 'dark',
        messageSize: 16,
        messageColor: '#fff',
        position: 'topRight',
        backgroundColor: '#59a10d',
        timeout: 5000,
        backgroundColor: '#59a10d',
      })
    )
    .catch(delay =>
      iziToast.error({
        title: 'Error',
        titleSize: 16,
        titleColor: '#fff',
        message: `Rejected promise in ${delay}ms`,
        messageSize: 16,
        messageColor: '#fff',
        position: 'topRight',
        backgroundColor: '#ef4040',
        color: '#fff',
        timeout: 5000,
        theme: 'dark',
      })
    );
}
