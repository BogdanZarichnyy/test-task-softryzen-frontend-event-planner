import { useState } from 'react';
import Select from 'react-select';
import CustomIconSelectSortBy from './customIconSelectSortBy/CustomIconSelectSortBy';
import OptionIcon from './optionIcon/OptionIcon';

const options = [
    { value: 'by name ascending', label: 'by name' },
    { value: 'by name descending', label: 'by name' },
    { value: 'by data ascending', label: 'by data' },
    { value: 'by data descending', label: 'by data' },
    { value: 'by priority ascending', label: 'by priority' },
    { value: 'by priority descending', label: 'by priority' },
];

const SelectSortBy = () => {
    const [currentSortBy, setCurrentSortBy] = useState();

    const getValueSortBy = () => {
        return currentSortBy ? options.find(sortBy => sortBy.value === currentSortBy) : '';
    }

    const selectedOption = (newValue) => {
        // console.log(newValue.value);
        const result = options.find((typeSort) => typeSort.value === newValue.value)[0];
        console.log(result);
        setCurrentSortBy(newValue.value);
    }

    return(
        <Select 
            className="custom-select-sort-by-container"
            classNamePrefix="custom-select-sort-by"
            value={getValueSortBy()}
            onChange={selectedOption}
            options={options}
            isSearchable={false}
            placeholder={"Sort by"}
            components={{ DropdownIndicator: CustomIconSelectSortBy, Option: OptionIcon }}
        />
    );
}

export default SelectSortBy;