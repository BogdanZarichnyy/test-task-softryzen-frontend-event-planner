import { useState } from 'react';

import TimePicker from 'rc-time-picker';
import 'rc-time-picker/assets/index.css';

import sprite from '../../../../images/sprite.svg';

import scss from './CustomTimePicker.module.scss';

import { getEditTimeForTimePicker, getTimeForTimePicker } from '../../../../services/formatData';

const CustomTimePicker = ({ values, setFieldValue, setFieldTouched, placeholder }) => {
    const [showTimePicker, setShowTimePicker] = useState(false);
    const [isValue, setIsValue] = useState(false);

    return (
        <div className={scss.wrraperTimePicker}
            onClick={() => {
                setShowTimePicker(!showTimePicker);

            }}
        >
            <TimePicker 
                showSecond={false}
                defaultOpenValue={values.time !== '' ? getEditTimeForTimePicker(values.time) : getTimeForTimePicker() }
                defaultValue={null}
                className={scss.timePicker}
                open={showTimePicker}
                onChange={async (value) => {
                    await setFieldValue('time', value._d); // *._d Moment
                    setFieldTouched('time');
                    setShowTimePicker(true);
                    setIsValue(true);
                }}
                format="hh:mm a"
                placeholder={placeholder}
                use12Hours
                inputReadOnly
                value={values.time ? getTimeForTimePicker(values.time) : null}
                name="time"
                id="time"
            />
            {showTimePicker ?
                <svg className={[scss.buttonTimePickerIcon, (showTimePicker || isValue) && scss.buttonTimePickerIconIsActive].join(" ")}>
                    <use id="chevron-up-small" href={`${sprite}#chevron-up-small`} />
                </svg>
                :
                <svg className={[scss.buttonTimePickerIcon, (showTimePicker || isValue) && scss.buttonTimePickerIconIsActive].join(" ")}>
                    <use id="chevron-down-small" href={`${sprite}#chevron-down-small`} />
                </svg>
            }
        </div>
    );
};

export default CustomTimePicker;