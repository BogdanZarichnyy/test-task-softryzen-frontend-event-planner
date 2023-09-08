import { useEffect, useState } from 'react';
import { components } from 'react-select';

import OptionIconAscending from './optionIconAscending/OptionIconAscending';
import OptionIconDescending from './optionIconDescending/OptionIconDescending';
import OptionIconDefault from './optionIconDefault/OptionIconDefault';


const OptionIcon = props => {
    const [isAscending, setIsAscending] = useState(null);
    
    useEffect(() => {
        if (props.data.value.includes('ascending')) {
            setIsAscending(true);
        } else if (props.data.value.includes('descending')) {
            setIsAscending(false);
        } else {
            setIsAscending(null);
        }
    }, [props.data.value]);

    return (
        <components.Option {...props}>
            {props.data.label}
            {isAscending === true ? <OptionIconAscending />
                :
                isAscending === false ? <OptionIconDescending />
                :
                <OptionIconDefault />
            }
        </components.Option>
    );
};

export default OptionIcon;