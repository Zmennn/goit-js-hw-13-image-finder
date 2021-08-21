


export default class FetchImg {

    constructor(searchRequest, options) {
        this.searchRequest = searchRequest;
        this.pg = 0;
        this.options = options;
        this.turnPages()
    };

    turnPages() {
        this.pg += 1;
        const result = this.creatingRequest(this.pg)
        console.log(result, "in");
        return result
    };

    creatingRequest(pageNumber) {
        const url = new URL('https://pixabay.com/api/');
        const optionsArr = Object.entries(this.options);
        optionsArr.forEach(el => url.searchParams.set(el[0], el[1]));
        url.searchParams.set("page", pageNumber);
        url.searchParams.set("q", this.searchRequest);
        return fetch(url.href).then(res => res)
    }
}


