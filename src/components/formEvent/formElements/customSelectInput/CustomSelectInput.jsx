import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

import sprite from '../../../../images/sprite.svg';

import scss from './CustomSelectInput.module.scss';

const CustomSelectInput = ({ options, setFieldValue, setFieldTouched, name, values, placeholder }) => {
    return (
        <Dropdown
            options={options}
            controlClassName={scss.inputDropdown}
            placeholderClassName={scss.placeholderDropdown}
            menuClassName={scss.menuDropdown}
            arrowOpen={
                <svg className={scss.buttonInputDropdwonIcon}>
                    <use id="chevron-up-small" href={`${sprite}#chevron-up-small`} />
                </svg>
            }
            arrowClosed={
                <svg className={scss.buttonInputDropdwonIcon}>
                    <use id="chevron-down-small" href={`${sprite}#chevron-down-small`} />
                </svg>
            }
            onChange={(newValue) => {
                setFieldValue(name, newValue.value);
                setFieldTouched(name);
            }} 
            value={values} 
            placeholder={placeholder}
        />
    );
};

export default CustomSelectInput;