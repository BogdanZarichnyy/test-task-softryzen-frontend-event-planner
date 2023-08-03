import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import SelectCategory from '../../components/selectCategory/SelectCategory';
import SelectSortBy from '../../components/selectSortBy/SelectSortBy';
import Button from '../../components/button/Button';
import Pagination from '../../components/pagination/Pagination';

import db from '../../assets/db/eventList';

import sprite from '../../images/sprite.svg';

import scss from './EventList.module.scss';

const EventList = () => {
    const [eventList, setEventList] = useState([]);

    useEffect(() => {
        setEventList(db);
    }, []);

    const showMoreInfo = (eventId) => {
        console.log('showMoreInfo eventId', eventId);
    }

    return(
        <section className={scss.eventSection}>
            <div className='container'>
                <div className={scss.wrraper}>

                    <h1 className='visually-hidden'>Event Planner</h1>

                    <ul className={scss.filterList}>
                        <li className={scss.filterItem}>
                            <SelectCategory />
                        </li>
                        <li className={scss.filterItem}>
                            <SelectSortBy />
                        </li>
                        <li className={scss.filterItem}>
                            <Link className={scss.eventCreate} to='/create'>
                                <svg className={scss.eventCreateIcon}>
                                    <use id="plus" href={`${sprite}#plus`} />
                                </svg>
                                <span className={scss.buttonText}>Add new event</span>
                            </Link>
                        </li>
                    </ul>

                    <h2 className={scss.title}>My events</h2>

                    <ul className={scss.eventList}>
                        {!!eventList.length &&
                            eventList.map((item) => 
                                <li className={scss.eventItem} key={item.id}>
                                    <div className={scss.eventRating}>
                                        <span className={scss.eventCategory}>{item.category}</span>
                                        {
                                            item.priority === 'High' ? <span className={scss.eventPriorityHigh}>{item.priority}</span>
                                            :
                                            item.priority === 'Medium' ? <span className={scss.eventPriorityMedium}>{item.priority}</span>
                                            :
                                            <span className={scss.eventPriorityLow}>{item.priority}</span>
                                        }
                                    </div>
                                    {item.picture ?
                                        <img className={scss.eventPicture} src={item.picture} alt={item.title} title={item.title} width="272"/>
                                        :
                                        <svg className={scss.eventDefaultImage}>
                                            <use id="default" href={`${sprite}#default`} />
                                        </svg>
                                    }
                                    <div className={scss.eventPositionInfo}>
                                        <div className={scss.eventArea}>
                                            <span className={scss.eventDateTime}>{`${item.date} at ${item.time}`}</span>
                                            <span className={scss.eventLocation}>{item.location}</span>
                                        </div>
                                        <div className={scss.eventInfo}>
                                            <h2 className={scss.eventTitle}>{item.title}</h2>
                                            <p className={scss.eventDescription}>{item.description}</p>
                                            <Button styles={scss.eventButton} onClick={() => showMoreInfo(item.id)} text="More info"/>
                                        </div>
                                    </div>
                                </li>
                            )
                        }
                    </ul>

                    <Pagination />

                </div>
            </div>
        </section>
    );
}

export default EventList;