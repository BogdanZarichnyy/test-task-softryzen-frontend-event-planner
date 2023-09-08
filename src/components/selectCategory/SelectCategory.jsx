import { useState } from 'react';
import Select from 'react-select';
import CustomIconSelectCategory from './customIconSelectCategory/CustomIconSelectCategory';

import options from '../../assets/options/category';

const SelectCategory = ({ setUrlParams }) => {
    const [currentCategory, setCurrentCategory] = useState();

    const getValueCategory = () => {
        if (currentCategory === 'All') {
            return 'Category';
        }
        return currentCategory ? options.find(language => language.value === currentCategory) : '';
    }

    const handlerSelectedOption = (newValue) => {
        // console.log(newValue.value);
        // console.log(newValue.label);

        let dataUrlParams = {
            page: 1,
            ...(newValue.value !== 'All' ? {category: newValue.value} : null),
        };
        setUrlParams({ ...dataUrlParams });

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
            placeholder="Category"
            components={{ DropdownIndicator: CustomIconSelectCategory }}
        />
    );
};

export default SelectCategory;