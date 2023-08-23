import { createSlice, nanoid, current  } from "@reduxjs/toolkit";
import initialData from '../../assets/db/eventList';

const eventsSlice = createSlice({
    name: "eventsSlice",
    initialState: {
        events: initialData,
    },
    reducers: {

        createEvent: {
            reducer(state, action) {
                state.events = [...current(state.events), action.payload];
            },
            prepare({ title, description, date, time, location, category, picture, priority, createAt, updateAt }) {
                return {
                    payload: {
                        id: nanoid(),
                        title,
                        description,
                        date,
                        time,
                        location,
                        category,
                        picture,
                        priority,
                        createAt,
                        updateAt,
                    }
                }
            }
        },

        deleteEvent: {
            reducer(state, action) {
                state.events = current(state.events).filter(event => event.id !== action.payload);
            },
            prepare(id) {
                return {
                    payload: id,
                }
            }
        },

        editEvent: {
            reducer(state, action) {
                state.events = [...current(state.events).filter(event => event.id !== action.payload.id), action.payload];
            },
            prepare({ id, title, description, date, time, location, category, picture, priority, createAt, updateAt }) {
                return {
                    payload: {
                        id,
                        title,
                        description,
                        date,
                        time,
                        location,
                        category,
                        picture,
                        priority,
                        createAt,
                        updateAt,
                    }
                }
            }
        },

    }
});

export const { createEvent, deleteEvent, editEvent } = eventsSlice.actions;
export const reducerEvents = eventsSlice.reducer;