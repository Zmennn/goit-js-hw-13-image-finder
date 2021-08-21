import formTemplate from "./templates/form.hbs";
import galleryTemplate from "./templates/gallery.hbs";
import cardTemplate from "./templates/card.hbs";
import FetchImg from "./fetchCreate";
import options from "./apiService"
import { error } from "@pnotify/core";


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
                Promise.reject(res)
            }
            return res
        })
        .then(res => res.json())
        .then(res => createMarkup(res))
        .catch(err => console.log("err", err))
}

function createMarkup(data) {

    const markup = cardTemplate(data.hits);
    galleryEl.insertAdjacentHTML('beforeend', markup)
}




