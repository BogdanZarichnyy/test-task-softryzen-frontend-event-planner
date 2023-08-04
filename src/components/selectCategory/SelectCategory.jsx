import { useState } from 'react';
import Select from 'react-select';
import CustomIconSelectCategory from './customIconSelectCategory/CustomIconSelectCategory';

// const options = [
//     { value: 'by name', label: 'by name ascending' },
//     { value: 'by name', label: 'by name descending' },
//     { value: 'by data', label: 'by data ascending' },
//     { value: 'by data', label: 'by data descending' },
//     { value: 'by priority', label: 'by priority ascending' },
//     { value: 'by priority', label: 'by priority descending' },
// ];

const options = [
    // { value: 'Category', label: 'Category' },
    { value: 'All', label: 'All' },
    { value: 'Art', label: 'Art' },
    { value: 'Music', label: 'Music' },
    { value: 'Business', label: 'Business' },
    { value: 'Conference', label: 'Conference' },
    { value: 'Workshop', label: 'Workshop' },
    { value: 'Party', label: 'Party' },
    { value: 'Sport', label: 'Sport' },
];

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