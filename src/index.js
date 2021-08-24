import formTemplate from "./templates/form.hbs";
import galleryTemplate from "./templates/gallery.hbs";
import cardTemplate from "./templates/card.hbs";
import FetchImg from "./fetchCreate";
import { fetchById } from "./fetchCreate";
import options from "./apiService";
import { onErrorNotification } from './pnotify';
import * as basicLightbox from 'basiclightbox'
import "basiclightbox/dist/basicLightbox.min.css";

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
    formEl.elements.query.value = "";
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

    if (!entries[0].isIntersecting) { return }
    observer.disconnect()

    request.creatingRequest()
}


function createMarkup(data) {

    const markup = cardTemplate(data.hits);
    galleryEl.insertAdjacentHTML('beforeend', markup);

    observer = new IntersectionObserver(onEntry, { threshold: 0.7 });


    // Такое странное решение я сам себе придумал,в чем собственно проблема-
    //IntersectionObserver дает сразу же 2 срабатывания о входе и выходе наблюдаемого
    //элемента, тут это немного проблема-сразу же рисуется 24 страницы вместо 12,
    //подозреваю что он срабатывает на отрисовку  страницы, попробовал его
    //"задержать" и вполне себе помогло, не уверен что это хорошее решение, но лучшего я не нашел( .
    setTimeout(() => observer.observe(galleryEl.lastElementChild), 350);


    galleryEl.addEventListener('click', onGalleryClick)
};




function onGalleryClick(event) {

    if (!event.target.hasAttribute('data-id')) { return };

    const id = (event.target.dataset.id);
    fetchById(id, options)
        .then(res => res.json())
        .then(res => {
            basicLightbox.create(`<img src=${res.hits[0].largeImageURL}>`,
                {
                    onShow: () => bodyEl.classList.add('onOpen'),
                    onClose: () => bodyEl.classList.remove('onOpen')
                }).show()
        })
        .catch(res => onErrorNotification("Картинка не полученна"))
};



