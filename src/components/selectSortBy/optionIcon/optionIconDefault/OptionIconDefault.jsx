import sprite from '../../../../images/sprite.svg';

import scss from './OptionIconDefault.module.scss';

const OptionIconDefault = () => {
    return (
        <svg className={scss.sortByIcon}>
            <use id="sort-by" href={`${sprite}#sort-by`} />
        </svg>
    );
}

export default OptionIconDefault;