import { useSelector } from "react-redux";
import { selectEventsPagination } from '../../redux/selectors';

import EventItem from '../eventItem/EventItem';

import scss from './EventList.module.scss';

const EventList = () => {
    const eventsPagination = useSelector(selectEventsPagination);

    return(
        <ul className={scss.eventList}>
            {!!eventsPagination.length && 
                eventsPagination.map((item) =>
                    <EventItem key={item.id} event={item}/>
                )
            }
        </ul>
    );
}

export default EventList;