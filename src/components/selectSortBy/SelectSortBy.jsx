import { useState } from 'react';
import Select from 'react-select';
import CustomIconSelectSortBy from './customIconSelectSortBy/CustomIconSelectSortBy';
import OptionIcon from './optionIcon/OptionIcon';
import OptionIconAscending from './optionIcon/optionIconAscending/OptionIconAscending';
import OptionIconDescending from './optionIcon/optionIconDescending/OptionIconDescending';

import options from '../../assets/options/sortBy';

const SelectSortBy = () => {
    const [currentSortBy, setCurrentSortBy] = useState();
    const [selectIcon, setSelectIcon] = useState(null);

    // useEffect(() => {
    //     const placeholderElement = document.querySelector('.custom-select-sort-by__placeholder');
    //     console.log(placeholderElement);

    //     const controlElement = document.querySelector('.custom-select-sort-by__control');
    //     console.log(controlElement);

    //     if (placeholderElement ) {
    //         controlElement.style.padding = "16px 24px !important;";
    //     }
    // }, []);

    const getValueSortBy = () => {
        return currentSortBy ? options.find(sortBy => sortBy.value === currentSortBy) : '';
    }

    const handlerSelectedOption = (newValue) => {
        console.log(newValue.value);

        if (newValue.value.includes('ascending')) {
            setSelectIcon(true);
        } else if (newValue.value.includes('descending')) {
            setSelectIcon(false);
        } else {
            setSelectIcon(null);
        }

        setCurrentSortBy(newValue.value);
    }

    return(
        <Select 
            className="custom-select-sort-by-container"
            classNamePrefix="custom-select-sort-by"
            value={getValueSortBy()}
            onChange={handlerSelectedOption}
            options={options}
            isSearchable={false}
            placeholder={"Sort by"}
            components={{ 
                DropdownIndicator: 
                    selectIcon === true ? OptionIconAscending
                    :
                    selectIcon === false ? OptionIconDescending
                    :
                    CustomIconSelectSortBy,
                Option: OptionIcon }}
        />
    );
}

export default SelectSortBy;