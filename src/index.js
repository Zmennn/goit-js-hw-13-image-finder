import formTemplate from "./templates/form.hbs";
import galleryTemplate from "./templates/gallery.hbs";
import cardTemplate from "./templates/card.hbs";
import fetchCountries from "./fetchCountries";



const bodyEl = document.querySelector('body');



const searchRequest = "cat";
const numberPage = 1;






// let url = new URL('https://google.com/search');
// const arr = Object.entries(options(searchRequest, numberPage));
// arr.forEach(el => url.searchParams.set(el[0], el[1]));
// console.log(url);





bodyEl.innerHTML = formTemplate();
const formEl = document.querySelector('.search-form');
formEl.addEventListener('submit', onSubmit);

function onSubmit(event) {
    event.preventDefault();


}



