import sprite from '../../../../images/sprite.svg';

import scss from './OptionIconDescending.module.scss';

const OptionIconDescending = () => {
    return (
        <svg className={scss.optionIcon}>
            <use id="arrow-down-small" href={`${sprite}#arrow-down-small`} />
        </svg>
    );
};

export default OptionIconDescending;