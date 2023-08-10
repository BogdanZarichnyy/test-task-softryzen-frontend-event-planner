import { createSlice, nanoid } from "@reduxjs/toolkit";
import initialData from '../../assets/db/eventList';

const eventsSlice = createSlice({
    name: "contactsSlice",
    initialState: {
        events: initialData,
    },
    reducers: {

        addEvent: {
            reducer(state, action) {
                state.events.push(action.payload);
            },
            prepare(title, description, date, time, location, category, picture, priority, createAt, updateAt) {
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
                state.events = state.events.filter(event => event.id !== action.payload);
            },
            prepare(id) {
                return {
                    payload: id,
                }
            }
        },

        editEvent: {
            reducer(state, action) {
                state.events = state.events.filter(event => event.id !== action.payload);
            },
            prepare(id, title, description, date, time, location, category, picture, priority, createAt, updateAt) {
                return {
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
        },

    }
});

export const { addEvent, deleteEvent, editEvent } = eventsSlice.actions;
export const reducerEvents = eventsSlice.reducer;