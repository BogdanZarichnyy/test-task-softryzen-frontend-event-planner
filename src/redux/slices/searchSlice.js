import { createSlice } from "@reduxjs/toolkit";

const searchSlice = createSlice({
    name: "searchSlice",
    initialState: {
        search: '',
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

        pageEvents: {
            reducer( state, action) {
                console.log(state.page); // приходить якась бредятина
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

export const { searchEvents, pageEvents, limitEvents } = searchSlice.actions;
export const reducerSearch = searchSlice.reducer;