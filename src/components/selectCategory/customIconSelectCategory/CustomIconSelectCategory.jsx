import { components } from 'react-select';

import sprite from '../../../images/sprite.svg';

import scss from './CustomIconSelectCategory.module.scss';

const CustomIconSelectCategory = props => {
    return (
        <components.DropdownIndicator {...props}>
            <svg className={scss.categoryIcon}>
                <use id="category" href={`${sprite}#category`} />
            </svg>
        </components.DropdownIndicator>
    );
};

export default CustomIconSelectCategory;