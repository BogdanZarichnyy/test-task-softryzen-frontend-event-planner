import { useState } from 'react';
import Select from 'react-select';
import CustomIconSelectCategory from './customIconSelectCategory/CustomIconSelectCategory';

import options from '../../assets/options/category';

const SelectCategory = () => {
    const [currentCategory, setCurrentCategory] = useState();

    const getValueCategory = () => {
        return currentCategory ? options.find(language => language.value === currentCategory) : '';
    }

    const handlerSelectedOption = (newValue) => {
        console.log(newValue.value);
        // console.log(newValue.label);
        setCurrentCategory(newValue.value);
    }

    return(
        <Select 
            className="custom-select-category-container"
            classNamePrefix="custom-select-category"
            value={getValueCategory()}
            onChange={handlerSelectedOption}
            options={options}
            isSearchable={false}
            placeholder={"Category"}
            components={{ DropdownIndicator: CustomIconSelectCategory }}
        />
    );
}

export default SelectCategory;