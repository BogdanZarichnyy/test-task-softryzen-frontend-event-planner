import { useState } from 'react';
// import { Link, NavLink, useSearchParams } from 'react-router-dom';
import Select from 'react-select';
import CustomIconSelectCategory from './customIconSelectCategory/CustomIconSelectCategory';

import options from '../../assets/options/category';

const SelectCategory = ({ setUrlParams, urlParams, params }) => {
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
        if (newValue.value === 'All') {
            const pageQuery = urlParams.get('page');
            const searchQuery = urlParams.get('search');
            // const categoryQuery = urlParams.get('category');
            const sortByQuery = urlParams.get('sortBy');
            let dataUrlParams = {
                ...(pageQuery ? {page: pageQuery} : null),
                ...(searchQuery ? {search: searchQuery} : null),
                // ...(categoryQuery ? {category: categoryQuery} : null),
                ...(sortByQuery ? {sortBy: sortByQuery} : null),
            };
            setUrlParams({ ...dataUrlParams });
        } else {
            setUrlParams({ ...params, category: newValue.value });
        }
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