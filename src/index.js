import formTemplate from "./templates/form.hbs";
import galleryTemplate from "./templates/gallery.hbs";
import cardTemplate from "./templates/card.hbs";
import FetchImg from "./fetchCreate";
import { fetchById } from "./fetchCreate";
import options from "./apiService";
import { onErrorNotification } from './pnotify';
import * as basicLightbox from 'basiclightbox';

let observer = {};
let request = {};





const bodyEl = document.querySelector('body');


bodyEl.insertAdjacentHTML('beforeend', formTemplate());
bodyEl.insertAdjacentHTML('beforeend', galleryTemplate());

const formEl = document.querySelector('.search-form');
const galleryEl = document.querySelector('.gallery');

formEl.addEventListener('submit', onSubmit);

function onSubmit(event) {
    event.preventDefault();

    galleryEl.innerHTML = '';

    const searchRequest = formEl.elements.query.value;
    request = new FetchImg(searchRequest, options);

    request.creatingRequest()
};


export function processingRequest(promise) {
    promise.then(res => {
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

            if (res.hits.length === 0) {
                observer.unobserve(galleryEl.lastElementChild)
                throw "Это все картинки для данного запроса"
            }

            return res
        })
        .then(res => createMarkup(res))
        .catch(err => onErrorNotification(err))
}


function onEntry(entries) {
    entries.forEach((item) => {
        if (item.isIntersecting) {
            request.creatingRequest()
        }
    })
}


function createMarkup(data) {

    const markup = cardTemplate(data.hits);
    galleryEl.insertAdjacentHTML('beforeend', markup);

    observer = new IntersectionObserver(onEntry, { threshold: 0.7 });
    setTimeout(() => observer.observe(galleryEl.lastElementChild), 250);

    galleryEl.addEventListener('click', onGalleryClick)
};




function onGalleryClick(event) {
    console.log(event.target.hasAttribute('data'));
    const id = (event.target.dataset.id);
    fetchById(id, options)
        .then(res => res.json())
        // .then(res => console.log(res.hits[0].largeImageURL))
        .then(res => {
            basicLightbox.create(`
		<img width="1400" height="900" src=${res.hits[0].largeImageURL}>
	`, { className: 'modal-position' }).show()
        })
        .catch(res => console.log(res))

}




// instance.show()