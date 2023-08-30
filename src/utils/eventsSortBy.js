export const eventsSortBy = (events, sortBy) => {
    if (sortBy === 'by name ascending') {
        return [...events].sort((prevEvent, event) => prevEvent.title.localeCompare(event.title));
    } else if (sortBy === 'by name descending') {
        return [...events].sort((prevEvent, event) => event.title.localeCompare(prevEvent.title));
    } else if (sortBy === 'by date ascending') {
        // return [...events].sort((prevEvent, event) => {
        //     const prevEventDateFormat = prevEvent.date.replace(/^(\d{2})(\.)(\d{2})(\.)(\d{4})$/, '$5\-$3\-$1');
        //     const eventDateFormat = event.date.replace(/^(\d{2})(\.)(\d{2})(\.)(\d{4})$/, '$5\-$3\-$1');
        //     const prevDate = new Date(prevEventDateFormat);
        //     const date = new Date(eventDateFormat);
        //     return prevDate - date;
        // });
        return [...events].sort((prevEvent, event) => {
            const prevDate = new Date(prevEvent.time);
            const date = new Date(event.time);
            return prevDate - date;
        });
    } else if (sortBy === 'by date descending') {
        // return [...events].sort((prevEvent, event) => {
        //     const prevEventDateFormat = prevEvent.date.replace(/^(\d{2})(\.)(\d{2})(\.)(\d{4})$/, '$5\-$3\-$1');
        //     const eventDateFormat = event.date.replace(/^(\d{2})(\.)(\d{2})(\.)(\d{4})$/, '$5\-$3\-$1');
        //     const prevDate = new Date(prevEventDateFormat);
        //     const date = new Date(eventDateFormat);
        //     return date - prevDate;
        // });
        return [...events].sort((prevEvent, event) => {
            const prevDate = new Date(prevEvent.time);
            const date = new Date(event.time);
            return date - prevDate;
        });
    } else if (sortBy === 'by priority ascending') {
        return [
            ...events.filter((item, index, array) => item.priority === 'Low'),
            ...events.filter((item, index, array) => item.priority === 'Medium'),
            ...events.filter((item, index, array) => item.priority === 'High'),
        ];
    } else if (sortBy === 'by priority descending') {
        return [
            ...events.filter((item, index, array) => item.priority === 'High'),
            ...events.filter((item, index, array) => item.priority === 'Medium'),
            ...events.filter((item, index, array) => item.priority === 'Low'),
        ];
    } else {
        return events;
    }
}