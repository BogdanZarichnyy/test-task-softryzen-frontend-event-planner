export const setDefaultSortEventslist = (events) => {
    return [...events].sort((prevEvent, event) => prevEvent.id - event.id);
}