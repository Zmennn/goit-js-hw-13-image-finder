
export default function options(searchRequest, numberPage) {
    return {
        image_type: 'photo',
        orientation: 'horizontal',
        per_page=12,
        key='23012527-abace86bcdc7661bfd5472938',
        q=searchRequest,
        page=numberPage
    }
}


