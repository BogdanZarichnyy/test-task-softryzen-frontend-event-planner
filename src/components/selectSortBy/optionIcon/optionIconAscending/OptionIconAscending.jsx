import sprite from '../../../../images/sprite.svg';

import scss from './OptionIconAscending.module.scss';

const OptionIconAscending = () => {
    return (
        <svg className={scss.optionIcon}>
            <use id="arrow-up-small" href={`${sprite}#arrow-up-small`} />
        </svg>
    );
}

export default OptionIconAscending;