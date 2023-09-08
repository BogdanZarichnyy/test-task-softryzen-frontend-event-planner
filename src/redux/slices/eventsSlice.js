import { createSlice, nanoid, current  } from "@reduxjs/toolkit";
import initialData from '../../assets/db/eventList';

const eventsSlice = createSlice({
    name: "eventsSlice",
    initialState: {
        events: initialData,
        // page: 1,
        // limit: 6,
    },
    reducers: {

        setEvents: {
            reducer( state, action) {
                state.events = action.payload;
            },
            prepare(events) {
                return {
                    payload: events,
                }
            }
        },

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
                console.log(action.payload);
                console.log(action.payload.id);
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

        // setPageEvents: {
        //     reducer( state, action) {
        //         state.page = action.payload;
        //     },
        //     prepare(page) {
        //         return {
        //             payload: page,
        //         }
        //     }
        // },

        // setLimitEvents: {
        //     reducer( state, action) {
        //         state.limit = action.payload;
        //     },
        //     prepare(limit) {
        //         return {
        //             payload: limit,
        //         }
        //     }
        // }

    }
});

export const { setEvents, createEvent, deleteEvent, editEvent } = eventsSlice.actions;
// export const { setEvents, createEvent, deleteEvent, editEvent, setPageEvents, setLimitEvents } = eventsSlice.actions;
export const reducerEvents = eventsSlice.reducer;