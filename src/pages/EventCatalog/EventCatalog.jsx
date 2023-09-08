import Filter from '../../components/filter/Filter';
import EventList from '../../components/eventList/EventList';
import Pagination from '../../components/pagination/Pagination';

import { useSelector } from "react-redux";
import { eventsListSelector } from '../../redux/selectors';

import scss from './EventCatalog.module.scss';

const EventCatalog = () => {
    const eventsListStore = useSelector(eventsListSelector);

    return (
        <section className={scss.eventSection}>
            <div className='container'>
                <div className={scss.wrraper}>

                    <h1 className='visually-hidden'>Event Planner</h1>

                    <Filter />

                    <h2 className={scss.title}>My events</h2>

                    <EventList />

                    {!!eventsListStore.length 
                        ? <Pagination count={eventsListStore.length} />
                        : <div className={scss.noResult}>Not found events</div>
                    }

                </div>
            </div>
        </section>
    );
};

export default EventCatalog;