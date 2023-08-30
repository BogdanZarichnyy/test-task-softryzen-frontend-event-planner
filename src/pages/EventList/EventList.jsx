import { useEffect, useMemo } from 'react';
import { Link, NavLink, useSearchParams } from 'react-router-dom';
import SelectCategory from '../../components/selectCategory/SelectCategory';
import SelectSortBy from '../../components/selectSortBy/SelectSortBy';
import Pagination from '../../components/pagination/Pagination';

import { useSelector, useDispatch } from "react-redux";
import { eventsSelector, eventsListSelector, selectEventsPagination } from '../../redux/selectors';
import { setEventsList, pageEvents } from '../../redux/slices/filterSlice';

import { eventsSearch } from '../../utils/eventsSearch';
import { eventsCategory } from '../../utils/eventsCategory';
import { eventsSortBy } from '../../utils/eventsSortBy';

import sprite from '../../images/sprite.svg';

import scss from './EventList.module.scss';

const EventList = () => {
    const eventsStore = useSelector(eventsSelector);
    const eventsListStore = useSelector(eventsListSelector);
    const eventsStorePagination = useSelector(selectEventsPagination);

    const [urlParams, setUrlParams] = useSearchParams();
    const searchQuery = urlParams.get('search') ?? '';
    const categoryQuery = urlParams.get('category') ?? '';
    const sortByQuery = urlParams.get('sortBy') ?? '';
    const pageQuery = urlParams.get('page') ?? '';

    const dispatch = useDispatch();

    const params = useMemo(
        () => Object.fromEntries([...urlParams]),
        [urlParams]
    );
    
    useEffect(() => {
        dispatch(setEventsList(eventsStore));

        if (!pageQuery) {
            dispatch(pageEvents(1));
        } else {
            dispatch(pageEvents(Number(pageQuery)));
        }

        if (searchQuery) {
            let dataUrlParams = {
                ...(pageQuery ? {page: pageQuery} : null),
                ...(searchQuery ? {search: searchQuery} : null),
                // ...(categoryQuery ? {category: categoryQuery} : null),
                // ...(sortByQuery ? {sortBy: sortByQuery} : null),
            };
            setUrlParams({ ...dataUrlParams });
            dispatch(setEventsList(eventsSearch(eventsStore, searchQuery.toLowerCase())));
        }

        if (categoryQuery){
            let dataUrlParams = {
                ...(pageQuery ? {page: pageQuery} : null),
                // ...(searchQuery ? {search: searchQuery} : null),
                ...(categoryQuery ? {category: categoryQuery} : null),
                // ...(sortByQuery ? {sortBy: sortByQuery} : null),
            };
            setUrlParams({ ...dataUrlParams });
            dispatch(setEventsList(eventsCategory(eventsStore, categoryQuery.toLowerCase())));
        }

        if (sortByQuery) {
            let dataUrlParams = {
                ...(pageQuery ? {page: pageQuery} : null),
                // ...(searchQuery ? {search: searchQuery} : null),
                // ...(categoryQuery ? {category: categoryQuery} : null),
                ...(sortByQuery ? {sortBy: sortByQuery} : null),
            };
            setUrlParams({ ...dataUrlParams });
            dispatch(setEventsList(eventsSortBy(eventsStore, sortByQuery.toLowerCase())));
        }

    }, [params, eventsStore, setUrlParams, dispatch, pageQuery, searchQuery, categoryQuery, sortByQuery]);

    const formatDate = (dateData) => {
        // console.log(dateData);
        const date = dateData.replace(/^(\d{2})(\.)(\d{2})(\.)(\d{4})$/, '$5\-$3\-$1');
        const dateFormat = new Date(date);
        // console.log(dateFormat);
        const day = dateFormat.getDate();
        const month = dateFormat.getMonth() + 1;
        const result = day.toString().padStart(2, '0') + '.' +  month.toString().padStart(2, '0');
        return result;
    }

    const formatTime = (timeData) => {
        // console.log(timeData);
        const time = new Date(timeData);
        const hours = time.getHours();
        const minutes = time.getMinutes();
        // const hours = time.getUTCHours();
        // const minutes = time.getUTCMinutes();
        const result = hours.toString().padStart(2, '0') + ':' + minutes.toString().padStart(2, '0');
        return result;
    }

    return(
        <section className={scss.eventSection}>
            <div className='container'>
                <div className={scss.wrraper}>

                    <h1 className='visually-hidden'>Event Planner</h1>

                    <ul className={scss.filterList}>
                        <li className={scss.filterItem}>
                            <SelectCategory setUrlParams={setUrlParams} />
                        </li>
                        <li className={scss.filterItem}>
                            <SelectSortBy setUrlParams={setUrlParams} />
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
                        {!!eventsStorePagination.length &&
                            eventsStorePagination.map((item) =>
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
                                            <span className={scss.eventDateTime}>{`${formatDate(item.date)} at ${formatTime(item.time)}`}</span>
                                            <span className={scss.eventLocation}>{item.location}</span>
                                        </div>
                                        <div className={scss.eventInfo}>
                                            <h2 className={scss.eventTitle}>{item.title}</h2>
                                            <p className={scss.eventDescription}>{item.description}</p>
                                            
                                            <NavLink className={scss.eventButton} to={`/details/${item.id}`}>More info</NavLink>
                                        </div>
                                    </div>
                                </li>
                            )
                        }
                    </ul>

                    {!!eventsListStore.length && <Pagination items={eventsListStore} />}

                </div>
            </div>
        </section>
    );
}

export default EventList;