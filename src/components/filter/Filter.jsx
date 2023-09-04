import { useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import SelectCategory from '../../components/selectCategory/SelectCategory';
import SelectSortBy from '../../components/selectSortBy/SelectSortBy';

import { useSelector, useDispatch } from "react-redux";
import { eventsSelector } from '../../redux/selectors';
import { setEventsList, pageEvents } from '../../redux/slices/filterSlice';

import { eventsSearch } from '../../utils/eventsSearch';
import { eventsCategory } from '../../utils/eventsCategory';
import { eventsSortBy } from '../../utils/eventsSortBy';

import sprite from '../../images/sprite.svg';

import scss from './Filter.module.scss';

const Filter = () => {
    const eventsStore = useSelector(eventsSelector);

    const [urlParams, setUrlParams] = useSearchParams();
    const searchQuery = urlParams.get('search') ?? '';
    const categoryQuery = urlParams.get('category') ?? '';
    const sortByQuery = urlParams.get('sortBy') ?? '';
    const pageQuery = urlParams.get('page') ?? '';

    const dispatch = useDispatch();
    
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

    }, [eventsStore, setUrlParams, dispatch, pageQuery, searchQuery, categoryQuery, sortByQuery]);

    return(
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
    );
}

export default Filter;