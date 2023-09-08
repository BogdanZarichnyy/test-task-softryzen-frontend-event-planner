import { createSlice } from "@reduxjs/toolkit";

const filterSlice = createSlice({
    name: "filterSlice",
    initialState: {
        eventsList: [],
        // search: '',
        // category: '',
        // sortBy: '',
        page: 1,
        limit: 6,
    },
    reducers: {

        setEventsList: {
            reducer( state, action) {
                state.eventsList = action.payload;
            },
            prepare(eventsList) {
                return {
                    payload: eventsList,
                }
            }
        },

        // searchEvents: {
        //     reducer( state, action) {
        //         state.search = action.payload;
        //     },
        //     prepare(search) {
        //         return {
        //             payload: search,
        //         }
        //     }
        // },

        // categoryEvents: {
        //     reducer( state, action) {
        //         state.category = action.payload;
        //     },
        //     prepare(category) {
        //         return {
        //             payload: category,
        //         }
        //     }
        // },

        // sortByEvents: {
        //     reducer( state, action) {
        //         state.sortBy = action.payload;
        //     },
        //     prepare(sortBy) {
        //         return {
        //             payload: sortBy,
        //         }
        //     }
        // },

        pageEvents: {
            reducer( state, action) {
                state.page = action.payload;
            },
            prepare(page) {
                return {
                    payload: page,
                }
            }
        },

        limitEvents: {
            reducer( state, action) {
                state.limit = action.payload;
            },
            prepare(limit) {
                return {
                    payload: limit,
                }
            }
        }
    }
});

// export const { setEventsList, searchEvents, categoryEvents, sortByEvents, pageEvents, limitEvents } = filterSlice.actions;
export const { setEventsList, pageEvents, limitEvents } = filterSlice.actions;
export const reducerFilter = filterSlice.reducer;