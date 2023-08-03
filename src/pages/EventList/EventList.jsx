import scss from './EventList.module.scss';
import SelectCategory from '../../components/selectCategory/SelectCategory';
import SelectSortBy from '../../components/selectSortBy/SelectSortBy';

import sprite from '../../images/sprite.svg';

const EventList = () => {
    return(
        <header className={scss.eventList}>
            <div className='container'>
                <div className={scss.wrraper}>

                    <h1 className='visually-hidden'>Event Planner</h1>

                    <ul className={scss.filterList}>
                        <li className={scss.item}>
                            <SelectCategory />
                        </li>
                        <li className={scss.item}>
                            <SelectSortBy />
                        </li>
                        <li className={scss.item}>
                            <button className={scss.buttonEventCreate}>
                                <svg className={scss.buttonEventCreateIcon}>
                                    <use id="plus" href={`${sprite}#plus`} />
                                </svg>
                            </button>
                        </li>
                    </ul>

                </div>
            </div>
        </header>
    );
}

export default EventList;