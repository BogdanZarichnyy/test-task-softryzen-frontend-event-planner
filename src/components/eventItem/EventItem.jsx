import { NavLink } from 'react-router-dom';

import { formatDate, formatTime} from '../../services/formatData';

import sprite from '../../images/sprite.svg';

import scss from './EventItem.module.scss';

const EventItem = ({ event }) => {
    return(
        <li className={scss.eventItem}>
            <div className={scss.eventRating}>
                <span className={scss.eventCategory}>{event.category}</span>
                {
                    event.priority === 'High' ? <span className={scss.eventPriorityHigh}>{event.priority}</span>
                    :
                    event.priority === 'Medium' ? <span className={scss.eventPriorityMedium}>{event.priority}</span>
                    :
                    <span className={scss.eventPriorityLow}>{event.priority}</span>
                }
            </div>
            {event.picture ?
                <img className={scss.eventPicture} src={event.picture} alt={event.title} title={event.title} width="272"/>
                :
                <svg className={scss.eventDefaultImage}>
                    <use id="default" href={`${sprite}#default`} />
                </svg>
            }
            <div className={scss.eventPositionInfo}>
                <div className={scss.eventArea}>
                    <span className={scss.eventDateTime}>{`${formatDate(event.date)} at ${formatTime(event.time)}`}</span>
                    <span className={scss.eventLocation}>{event.location}</span>
                </div>
                <div className={scss.eventInfo}>
                    <h2 className={scss.eventTitle}>{event.title}</h2>
                    <p className={scss.eventDescription}>{event.description}</p>
                    
                    <NavLink className={scss.eventButton} to={`/details/${event.id}`}>More info</NavLink>
                </div>
            </div>
        </li>
    )
}

export default EventItem;