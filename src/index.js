import formTemplate from "./templates/form.hbs";
import galleryTemplate from "./templates/gallery.hbs";
import cardTemplate from "./templates/card.hbs";
import FetchImg from "./fetchCreate";
import options from "./apiService"


const bodyEl = document.querySelector('body');


bodyEl.innerHTML = formTemplate();
const formEl = document.querySelector('.search-form');
formEl.addEventListener('submit', onSubmit);

function onSubmit(event) {
    event.preventDefault();
    const searchRequest = formEl.elements.query.value;
    new FetchImg(searchRequest, options);

    console.log(FetchImg.turnPages());
}






