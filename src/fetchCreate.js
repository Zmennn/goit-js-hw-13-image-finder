
export default class FetchImg {

    constructor(searchRequest, options) {
        this.searchRequest = searchRequest;
        this.pg = 0
        this.options = options;

    };


    creatingRequest() {

        this.pg += 1;

        const url = new URL('https://p1ixabay.com/api/');
        const optionsArr = Object.entries(this.options);
        optionsArr.forEach(el => url.searchParams.set(el[0], el[1]));
        url.searchParams.set("page", this.pg);
        url.searchParams.set("q", this.searchRequest);
        return fetch(url.href)
    }
}


