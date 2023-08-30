export const eventsSearch = (events, search) => {
    if (search) {
        return events.filter((item, index, array) => item.title.toLowerCase().includes(search.toLowerCase()));
    } else return events;
}