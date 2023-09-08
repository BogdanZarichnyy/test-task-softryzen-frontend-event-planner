import { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import FormEvent from '../../components/formEvent/FormEvent';

import { useSelector } from "react-redux";
import { eventsSelector, eventsListSelector } from '../../redux/selectors';

import sprite from '../../images/sprite.svg';

import scss from './EventEdit.module.scss';

const EventEdit = () => {
    const [eventItem, setEventItem] = useState();
    const eventsStore = useSelector(eventsSelector);
    const { eventId } = useParams();

    useEffect(() => {
        const eventItem = eventsStore.filter((item) => item.id.toString() === eventId)[0];
        setEventItem(eventItem);
    }, []);

    return (
        <section className={scss.eventEdit}>
            <div className='container'>
                <div className={scss.wrraper}>

                    <NavLink className={scss.linkBack} to={`/details/${eventId}`}>
                        <svg className={scss.linkBackIcon}>
                            <use id="arrow-left" href={`${sprite}#arrow-left`} />
                        </svg>
                        Back
                    </NavLink>

                    <h2 className={scss.title}>Edit event</h2>

                    {eventItem && <FormEvent textForButton="Save" action="editEvent" initialValues={eventItem} />}

                </div>
            </div>
        </section>
    );
};

export default EventEdit;