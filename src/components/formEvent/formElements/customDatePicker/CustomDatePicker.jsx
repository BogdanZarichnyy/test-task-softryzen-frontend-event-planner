import { useState } from 'react';
import InputMask from 'react-input-mask';
import { Field } from 'formik';

import CustomCalendar from '../customCalendar/CustomCalendar';

import sprite from '../../../../images/sprite.svg';

import scss from './CustomDatePicker.module.scss';

import validationDatePickerInputMask from '../../../../validation/formInputDatePickerMask';

const CustomDatePicker = ({ values, setFieldValue, setFieldTouched, handleChange, placeholder }) => {
    const [showCalendar, setShowCalendar] = useState(false);

    return (
        <>
            <InputMask 
                mask="99/99/9999"
                    onChange={ async (event) => {
                        try {
                            const value = event.target.value || "";
                            const newValue = await validationDatePickerInputMask(value);
                            await setFieldValue("date", newValue);
                            setFieldTouched("date");
                            handleChange(event);
                        } catch (error) {
                            console.log(error);
                        }
                    }}
                    value={values.date}
                >
                {(inputProps) => 
                    <Field {...inputProps} 
                        className={scss.inputDatePiker} 
                        type="text" name="date" placeholder={placeholder} id="date"
                    />
                }
            </InputMask>

            <button className={[scss.buttonInputDatePiker, showCalendar && scss.isOpenCalendar].join(" ")} 
                type="button" 
                onClick={() => setShowCalendar(!showCalendar)}
            >
                {showCalendar ?
                    <svg className={scss.buttonInputResetIcon}>
                        <use id="chevron-up-small" href={`${sprite}#chevron-up-small`} />
                    </svg>
                    :
                    <svg className={scss.buttonInputResetIcon}>
                        <use id="chevron-down-small" href={`${sprite}#chevron-down-small`} />
                    </svg>
                }
            </button>

            {showCalendar && 
                <CustomCalendar 
                    setFieldValue={setFieldValue}
                    setShowCalendar={setShowCalendar}
                />
            }
        </>
    );
};

export default CustomDatePicker;