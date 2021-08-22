import { processingRequest } from "./index"
export default class FetchImg {

    constructor(searchRequest, options) {
        this.searchRequest = searchRequest;
        this.pg = 0
        this.options = options;

    };


    creatingRequest() {

        this.pg += 1;
        console.log(this.pg);
        const url = new URL('https://pixabay.com/api/');
        const optionsArr = Object.entries(this.options);
        optionsArr.forEach(el => url.searchParams.set(el[0], el[1]));
        url.searchParams.set("page", this.pg);
        url.searchParams.set("q", this.searchRequest);
        const fet = fetch(url.href);
        processingRequest(fet)
    }
}


