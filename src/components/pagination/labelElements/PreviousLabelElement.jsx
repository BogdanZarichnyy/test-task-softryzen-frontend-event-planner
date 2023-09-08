import scss from './LabelElement.module.scss';

import sprite from '../../../images/sprite.svg';

const PreviousLabelElement = () => {
    return (
        <svg className={scss.icon}>
            <use id="chevron-left" href={`${sprite}#chevron-left`} />
        </svg>
    );
};

export default PreviousLabelElement;