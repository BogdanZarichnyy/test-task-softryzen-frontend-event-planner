export const eventsCategory = (events, category) => {
    if (category) {
        return events.filter((item, index, array) => item.category.toLowerCase() === category.toLowerCase());
    } else return events;
}