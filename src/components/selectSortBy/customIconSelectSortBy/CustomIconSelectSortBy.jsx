import { components } from 'react-select';

import sprite from '../../../images/sprite.svg';

import scss from './CustomIconSelectSortBy.module.scss';

const CustomIconSelectSortBy = props => {
    return (
        <components.DropdownIndicator {...props}>
            <svg className={scss.sortByIcon}>
                <use id="sort-by" href={`${sprite}#sort-by`} />
            </svg>
        </components.DropdownIndicator>
    );
};

export default CustomIconSelectSortBy;