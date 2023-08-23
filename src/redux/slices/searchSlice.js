import { createSlice } from "@reduxjs/toolkit";

const searchSlice = createSlice({
    name: "searchSlice",
    initialState: {
        search: '',
        category: '',
        sortBy: '',
        page: 1,
        limit: 6,
    },
    reducers: {

        searchEvents: {
            reducer( state, action) {
                state.search = action.payload;
            },
            prepare(search) {
                return {
                    payload: search,
                }
            }
        },

        categoryEvents: {
            reducer( state, action) {
                state.category = action.payload;
            },
            prepare(category) {
                return {
                    payload: category,
                }
            }
        },

        sortByEvents: {
            reducer( state, action) {
                state.sortBy = action.payload;
            },
            prepare(sortBy) {
                return {
                    payload: sortBy,
                }
            }
        },

        pageEvents: {
            reducer( state, action) {
                // console.log(state.page); // приходить якась бредятина
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

export const { searchEvents, categoryEvents, sortByEvents, pageEvents, limitEvents } = searchSlice.actions;
export const reducerSearch = searchSlice.reducer;