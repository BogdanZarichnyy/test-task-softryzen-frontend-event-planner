import { createSelector } from "@reduxjs/toolkit";

export const eventsSelector = state => state.events.events;

export const eventsListSelector = state => state.filter.eventsList;

// export const searchSelector = state => state.filter.search;
// export const categorySelector = state => state.filter.category;
// export const sortBySelector = state => state.filter.sortBy;

export const pageSelector = state => state.filter.page;
export const limitSelector = state => state.filter.limit;

// export const pageSelector = state => state.events.page;
// export const limitSelector = state => state.events.limit;

export const selectEventsPagination = createSelector([eventsListSelector, pageSelector, limitSelector], (eventsList, page, limit) => {
    const skip = (parseInt(page) - 1) * parseInt(limit);
    return eventsList.filter((item, index, array) => index >= skip & index < (limit + skip));
});