import moment from 'moment';
export function convertTimeScope(model) {
    let searchTimeSpan = '';
    switch (model) {
        case 'Last 24h': searchTimeSpan = `&numericFilters=created_at_i>${moment().subtract(1, 'days').toDate().getTime() / 1000}`; break;
        case 'Past Week': searchTimeSpan = `&numericFilters=created_at_i>${moment().subtract(1, 'weeks').toDate().getTime() / 1000}`; break;
        case 'Past Month': searchTimeSpan = `&numericFilters=created_at_i>${moment().subtract(1, 'months').toDate().getTime() / 1000}`; break;
        case 'Past Year': searchTimeSpan = `&numericFilters=created_at_i>${moment().subtract(1, 'years').toDate().getTime() / 1000}`; break;
    }
    return searchTimeSpan;
}


export function convertHighlightedText(model) {
    const prefixReplace = model.replace(new RegExp('\u003cem\u003e', 'g'), '<b style="background:yellow;">');
    return prefixReplace.replace(new RegExp('\u003c/em\u003e', 'g'), '</b>');
}