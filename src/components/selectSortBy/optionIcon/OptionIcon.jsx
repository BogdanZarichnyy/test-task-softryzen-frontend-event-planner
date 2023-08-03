import { useEffect } from 'react';
import { components } from 'react-select';

import sprite from '../../../images/sprite.svg';

import scss from './OptionIcon.module.scss';

const OptionIcon = props => {
    
    useEffect(() => {
        console.log(props);
    }, []);

    return (
        <components.Option {...props}>
            {props.data.label}
            <svg className={scss.optionIcon}>
                <use id="arrow-up-small" href={`${sprite}#arrow-up-small`} />
            </svg>
            {/* {props.data.value.include('ascending') ?
                <svg className={scss.optionIcon}>
                    <use id="arrow-up-small" href={`${sprite}#arrow-up-small`} />
                </svg>
                :
                <svg className={scss.optionIcon}>
                    <use id="arrow-up-small" href={`${sprite}#arrow-up-small`} />
                </svg>
            } */}
        </components.Option>
    );
}

export default OptionIcon;