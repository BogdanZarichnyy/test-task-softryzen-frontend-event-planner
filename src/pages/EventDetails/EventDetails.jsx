import { useEffect, useState, useCallback } from 'react';
import { NavLink, useParams, useNavigate } from "react-router-dom";
import Button from '../../components/button/Button';

import sprite from '../../images/sprite.svg';

import scss from './EventDetails.module.scss';

import db from '../../assets/db/eventList';
import constants from '../../assets/constants/resolutionPoints';

const EventDetails = () => {
    const [eventList, setEventList] = useState([]);
    // const [eventItem, setEventItem] = useState();
    const { eventId } = useParams();
    // console.log('eventId', eventId);

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
        setEventList(db);
    }, []);

    const handlerEventEdit = () => {
        console.log('handlerEventEdit');
        navigate('/');
    }

    return(
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

                        {eventList[eventId-1] &&
                            <div className={scss.detailsInfo}>
                                {eventList[eventId-1].picture ?
                                    <img className={scss.eventPicture} src={eventList[eventId-1].picture} alt={eventList[eventId-1].title} title={eventList[eventId-1].title} width="272"/>
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
                                    <p className={scss.eventDescription}>{eventList[eventId-1].description}</p>
                                    <span className={scss.eventRating}>
                                        <span className={scss.eventCategory}>{eventList[eventId-1].category}</span>
                                        {
                                            eventList[eventId-1].priority === 'High' ? <span className={scss.eventPriorityHigh}>{eventList[eventId-1].priority}</span>
                                            :
                                            eventList[eventId-1].priority === 'Medium' ? <span className={scss.eventPriorityMedium}>{eventList[eventId-1].priority}</span>
                                            :
                                            <span className={scss.eventPriorityLow}>{eventList[eventId-1].priority}</span>
                                        }
                                        <span className={scss.eventLocation}>{eventList[eventId-1].location}</span>
                                        <span className={scss.eventDateTime}>{`${eventList[eventId-1].date} at ${eventList[eventId-1].time} am`}</span>
                                    </span>
                                    <div className={scss.actions}>
                                        <NavLink className={scss.eventEdit} to={`/edit/${eventId}`}>Edit</NavLink>
                                        <Button styles={scss.buttonEdit} text="Delete event" onClick={handlerEventEdit}/>
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