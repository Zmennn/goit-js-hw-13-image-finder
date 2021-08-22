import formTemplate from "./templates/form.hbs";
import galleryTemplate from "./templates/gallery.hbs";
import cardTemplate from "./templates/card.hbs";
import FetchImg from "./fetchCreate";
import options from "./apiService"
import { onErrorNotification } from './pnotify'


const bodyEl = document.querySelector('body');


bodyEl.innerHTML = formTemplate();
bodyEl.insertAdjacentHTML('beforeend', galleryTemplate());

const formEl = document.querySelector('.search-form');
const galleryEl = document.querySelector('.gallery');

formEl.addEventListener('submit', onSubmit);

function onSubmit(event) {
    event.preventDefault();

    galleryEl.innerHTML = '';

    const searchRequest = formEl.elements.query.value;
    const request = new FetchImg(searchRequest, options);

    request.creatingRequest()
        .then(res => {
            if (!res.ok) {
                throw "Данные не полученны"
            }
            return res
        })
        .then(res => res.json())
        .then(res => {
            if (res.total === 0) {
                throw "Неадекватный ввод, исправьте"
            }
            return res
        })
        .then(res => createMarkup(res))
        .catch(err => onErrorNotification(err))
};

function createMarkup(data) {

    const markup = cardTemplate(data.hits);
    galleryEl.insertAdjacentHTML('beforeend', markup)
};




