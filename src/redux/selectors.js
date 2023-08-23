import { createSelector } from "@reduxjs/toolkit";

export const eventsSelector = state => state.events.events;

export const searchSelector = state => state.search.search;
export const categorySelector = state => state.search.category;
export const sortBySelector = state => state.search.sortBy;

export const pageSelector = state => state.search.page;
export const limitSelector = state => state.search.limit;

export const selectEventsSearch = createSelector([eventsSelector, searchSelector, limitSelector], (events, search, limit) => {
    if (search) {
        // return events.filter(event => (event.title.toLowerCase().includes(search.toLowerCase())));
        return events.filter((item, index, array) => item.title.toLowerCase().includes(search.toLowerCase()) & index <= limit);
    } else return events;
});

// export const eventsSelectorLimit = createSelector([eventsSelector, limitSelector, pageSelector], (events, limit, page) => {
//     // const skip = (parseInt(page) - 1) * parseInt(limit);
//     const skip = (parseInt(page)) * parseInt(limit);
//     return events.filter((item, index, array) => index >= skip & index < (limit + skip));
// });

export const eventsSelectorLimit = createSelector([eventsSelector, searchSelector, limitSelector, pageSelector], (events, search, limit, page) => {
    const skip = (parseInt(page) - 1) * parseInt(limit);
    // const skip = (parseInt(page)) * parseInt(limit);
    if (search) {
        return events.filter((item, index, array) => index >= skip & index < (limit + skip) & item.title.toLowerCase().includes(search.toLowerCase()));
    } else
    return events.filter((item, index, array) => index >= skip & index < (limit + skip));
});