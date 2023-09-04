import { useEffect, useState, useCallback } from 'react';
import { NavLink, useParams, useNavigate } from "react-router-dom";
import Button from '../../components/button/Button';

import { useSelector, useDispatch } from "react-redux";
import { deleteEvent } from '../../redux/slices/eventsSlice';
import { eventsSelector } from '../../redux/selectors';

import { formatDate, formatTime} from '../../services/formatData';

import sprite from '../../images/sprite.svg';

import scss from './EventDetails.module.scss';

import constants from '../../assets/constants/resolutionPoints';

const EventDetails = () => {
    const [eventItem, setEventItem] = useState();
    const { eventId } = useParams();

    const eventsStore = useSelector(eventsSelector);
    const dispatch = useDispatch();

    const [isLandscape, setIsLandscape] = useState(true);
    const [dimensions, setDimensions] = useState({ 
        // height: window.innerHeight,
        width: window.innerWidth
    });
    const navigate = useNavigate();

    const handlerResize = useCallback(() => {
        setDimensions({
            // height: window.innerHeight,
            width: window.innerWidth
        });
    }, []);

    useEffect(() => {
        window.addEventListener('resize', handlerResize);

        return () => {
            window.removeEventListener('resize', handlerResize);
        }
    }, [handlerResize]);

    useEffect(() => {
        if (dimensions.width < constants.TABLET_RESOLUTION_POINT) {
            setIsLandscape(false);
        } else {
            setIsLandscape(true);
        }
    }, [dimensions.width, setIsLandscape]);

    useEffect(() => {
        const eventItem = eventsStore.filter((item) => item.id.toString() === eventId)[0];
        setEventItem(eventItem);
    }, []);

    const handlerEventDelete = (eventItemId) => {
        dispatch(deleteEvent(eventItemId));
        navigate('/');
    }

    return (
        <section className={scss.eventDetails}>
            <div className='container'>
                <div className={scss.wrraper}>

                    <NavLink className={scss.linkBack} to="/">
                        <svg className={scss.linkBackIcon}>
                            <use id="arrow-left" href={`${sprite}#arrow-left`} />
                        </svg>
                        Back
                    </NavLink>

                    <div className={scss.details}>

                        <h2 className={scss.title}>Galery Opening</h2>

                        {eventItem &&
                            <div className={scss.detailsInfo}>
                                {eventItem.picture ?
                                    <img className={scss.eventPicture} src={eventItem.picture} alt={eventItem.title} title={eventItem.title} width="272"/>
                                    :
                                    <div className={scss.eventDefaultImage}>
                                        {isLandscape ?
                                            <svg className={scss.eventDefaultImageIcon}>
                                                <use id="default-landscape" href={`${sprite}#default-landscape`} />
                                            </svg>
                                            :
                                            <svg className={scss.eventDefaultImageIcon}>
                                                <use id="default" href={`${sprite}#default`} />
                                            </svg>
                                        }
                                    </div>
                                }
                                <div className={scss.eventInfo}>
                                    <p className={scss.eventDescription}>{eventItem.description}</p>
                                    <span className={scss.eventRating}>
                                        <span className={scss.eventCategory}>{eventItem.category}</span>
                                        {
                                            eventItem.priority === 'High' ? <span className={scss.eventPriorityHigh}>{eventItem.priority}</span>
                                            :
                                            eventItem.priority === 'Medium' ? <span className={scss.eventPriorityMedium}>{eventItem.priority}</span>
                                            :
                                            <span className={scss.eventPriorityLow}>{eventItem.priority}</span>
                                        }
                                        <span className={scss.eventLocation}>{eventItem.location}</span>
                                        <span className={scss.eventDateTime}>{`${formatDate(eventItem.date)} at ${formatTime(eventItem.time, 12)}`}</span>
                                    </span>
                                    <div className={scss.actions}>
                                        <NavLink className={scss.eventEdit} to={`/edit/${eventId}`}>Edit</NavLink>
                                        <Button styles={scss.buttonEdit} text="Delete event" onClick={() => handlerEventDelete(eventItem.id)}/>
                                    </div>
                                </div>
                            </div>
                        }

                    </div>
                    
                </div>
            </div>
        </section>
    );
}

export default EventDetails;