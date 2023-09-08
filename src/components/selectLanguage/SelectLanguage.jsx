import { useState } from 'react';
import Select from 'react-select';
import CustomIconSelectLanguage from './customIconSelectLanguage/CustomIconSelectLanguage';

import options from '../../assets/options/language';

const SelectLanguage = () => {
    const [currentLanguage, setCurrentLanguage] = useState(options[0].value);

    const getValueLanguage = () => {
        return currentLanguage ? options.find(language => language.value === currentLanguage) : options[0].label;
    }

    const handlerSelectedOption = (newValue) => {
        setCurrentLanguage(newValue.value);
    }

    return(
        <Select 
            className="custom-select-language-container"
            classNamePrefix="custom-select-language"
            value={getValueLanguage()}
            onChange={handlerSelectedOption}
            options={options}
            isSearchable={false}
            components={{ DropdownIndicator: CustomIconSelectLanguage }}
        />
    );
};

export default SelectLanguage;