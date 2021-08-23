import { processingRequest } from "./index"

const BASE_URL = 'https://pixabay.com/api/'

export default class FetchImg {

    constructor(searchRequest, options) {
        this.searchRequest = searchRequest;
        this.pg = 0
        this.options = options;
    };

    creatingRequest() {

        this.pg += 1;

        const url = new URL(BASE_URL);
        const optionsArr = Object.entries(this.options);
        optionsArr.forEach(el => url.searchParams.set(el[0], el[1]));
        url.searchParams.set("page", this.pg);
        url.searchParams.set("q", this.searchRequest);
        const fet = fetch(url.href);
        processingRequest(fet)
    }
}


export function fetchById(id, { key }) {

    const url = `${BASE_URL}?key=${key}&id=${id}`;

    return fetch(url)
}
