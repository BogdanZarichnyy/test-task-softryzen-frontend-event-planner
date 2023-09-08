import scss from './LabelElement.module.scss';

import sprite from '../../../images/sprite.svg';

const NextLabelElement = () => {
    return (
        <svg className={scss.icon}>
            <use id="chevron-right" href={`${sprite}#chevron-right`} />
        </svg>
    );
};

export default NextLabelElement;