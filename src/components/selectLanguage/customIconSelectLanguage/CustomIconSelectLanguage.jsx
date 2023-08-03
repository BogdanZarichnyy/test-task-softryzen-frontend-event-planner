import { components } from 'react-select';

import sprite from '../../../images/sprite.svg';

import scss from './CustomIconSelectLanguage.module.scss';

const CustomIconSelectLanguage = props => {
    return (
        <components.DropdownIndicator {...props}>
            <svg className={scss.languageIcon}>
                <use id="chevron-down-small" href={`${sprite}#chevron-down-small`} />
            </svg>
        </components.DropdownIndicator>
    );
};

export default CustomIconSelectLanguage;