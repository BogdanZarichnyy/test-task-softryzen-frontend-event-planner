import { useState } from 'react';
import Select from 'react-select';
import CustomIconSelectLanguage from './customIconSelectLanguage/CustomIconSelectLanguage';

const options = [
    { value: 'EN', label: 'EN' },
    { value: 'UK', label: 'UK' },
];

const SelectLanguage = () => {
    const [currentLanguage, setCurrentLanguage] = useState('EN');

    const getValueLanguage = () => {
        return currentLanguage ? options.find(language => language.value === currentLanguage) : 'EN';
    }

    const handlerSelectedOption = (newValue) => {
        console.log(newValue.value);
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
}

export default SelectLanguage;