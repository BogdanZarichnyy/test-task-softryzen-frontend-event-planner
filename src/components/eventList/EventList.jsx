import { useSelector } from "react-redux";
import { selectEventsPagination } from '../../redux/selectors';

import EventItem from '../eventItem/EventItem';

import scss from './EventList.module.scss';

const EventList = () => {
    const eventsStorePagination = useSelector(selectEventsPagination);

    return(
        <ul className={scss.eventList}>
            {!!eventsStorePagination.length &&
                eventsStorePagination.map((item) =>
                    <EventItem key={item.id} event={item}/>
                )
            }
        </ul>
    );
}

export default EventList;