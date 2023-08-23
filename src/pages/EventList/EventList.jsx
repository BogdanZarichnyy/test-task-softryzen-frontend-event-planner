import { useEffect, useMemo } from 'react';
import { Link, NavLink, useSearchParams } from 'react-router-dom';
import SelectCategory from '../../components/selectCategory/SelectCategory';
import SelectSortBy from '../../components/selectSortBy/SelectSortBy';
import Pagination from '../../components/pagination/Pagination';

import { useSelector, useDispatch } from "react-redux";
import { eventsSelectorLimit, selectEventsSearch } from '../../redux/selectors';
// import { eventsSelectorLimit, selectEventsSearch, pageSelector, searchSelector, categorySelector, sortBySelector } from '../../redux/selectors';
import { searchEvents, pageEvents, categoryEvents, sortByEvents } from '../../redux/slices/searchSlice';

import sprite from '../../images/sprite.svg';

import scss from './EventList.module.scss';

const EventList = () => {
    const eventsStore = useSelector(selectEventsSearch);
    const eventsStoreLimit = useSelector(eventsSelectorLimit);

    // const eventsStorePage = useSelector(pageSelector);
    // const eventsStoreSearch = useSelector(searchSelector);
    // const eventsStoreCategory = useSelector(categorySelector);
    // const eventsStoreSortBy = useSelector(sortBySelector);

    const [urlParams, setUrlParams] = useSearchParams();
    const pageQuery = urlParams.get('page') ?? '';
    const searchQuery = urlParams.get('search') ?? '';
    const categoryQuery = urlParams.get('category') ?? '';
    const sortByQuery = urlParams.get('sortBy') ?? '';

    const dispatch = useDispatch();
    // const navigate = useNavigate();

    const params = useMemo(
        () => Object.fromEntries([...urlParams]),
        [urlParams]
    );

    const { page, search, category, sortBy } = params;
    
    console.log('page', page);
    console.log('search', search);
    console.log('category', category);
    console.log('sortBy', sortBy);

    useEffect(() => {
        if (!pageQuery) {
            setUrlParams({ ...params, page: 1 });
            dispatch(pageEvents(1));
        } else {
            setUrlParams({ ...params, page: Number(pageQuery) });
            dispatch(pageEvents(Number(pageQuery)));
        }
        
        if (!searchQuery) {
            setUrlParams({ ...params });
            dispatch(searchEvents(''));
        } else {
            setUrlParams({ ...params, search: searchQuery });
            dispatch(searchEvents(searchQuery.toLowerCase()));
        }

        if (!categoryQuery) {
            setUrlParams({ ...params });
            dispatch(categoryEvents(''));
        } else {
            setUrlParams({ ...params, category: categoryQuery });
            dispatch(categoryEvents(categoryQuery.toLowerCase()));
        }

        if (!sortByQuery) {
            setUrlParams({ ...params });
            dispatch(sortByEvents(''));
        } else {
            setUrlParams({ ...params, sortBy: sortByQuery });
            dispatch(sortByEvents(sortByQuery.toLowerCase()));
        }

    }, [params, setUrlParams, dispatch,  pageQuery, searchQuery, categoryQuery, sortByQuery]);

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
                            <SelectCategory setUrlParams={setUrlParams} urlParams={urlParams} params={params} />
                        </li>
                        <li className={scss.filterItem}>
                            <SelectSortBy setUrlParams={setUrlParams} urlParams={urlParams} params={params} />
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
                        {!!eventsStoreLimit.length &&
                            eventsStoreLimit.map((item) =>
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

                    {/* <Pagination items={eventsStore} urlParams={urlParams} setUrlParams={setUrlParams} /> */}
                    <Pagination items={eventsStore} />

                </div>
            </div>
        </section>
    );
}

export default EventList;