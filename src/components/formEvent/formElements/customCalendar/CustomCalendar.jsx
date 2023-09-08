import { useState } from 'react';
import Button from '../../../../components/button/Button';

import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

import sprite from '../../../../images/sprite.svg';

import scss from './CustomCalendar.module.scss';

import { formatDateForm } from '../../../../services/formatData';

const CustomCalendar = ({ setFieldValue, setShowCalendar }) => {
    const [dateCalendar, setDateCalendar] = useState(new Date());

    return (
        <div className={scss.datePiker}>

            <Calendar 
                className={scss.calendar}
                tileClassName={scss.tile}
                defaultValue={dateCalendar}
                // onChange={(date, event) => console.log(date)}
                onClickDay={async (date) => {
                    await setFieldValue('date', formatDateForm(date));
                    setDateCalendar(date);
                }} 
                locale="en-En"
                calendarType="hebrew"
                // minDate={new Date()}
                showNeighboringMonth={false}
                // showFixedNumberOfWeeks={true}
                nextLabel={
                    <svg className={scss.buttonLabelCalendarIcon}>
                        <use id="chevron-right" href={`${sprite}#chevron-right`} />
                    </svg>
                }
                prevLabel={
                    <svg className={scss.buttonLabelCalendarIcon}>
                        <use id="chevron-left" href={`${sprite}#chevron-left`} />
                    </svg>
                }
            />

            <div className={scss.buttonsCalendar}>
                <Button styles={scss.buttonCalendarCancel} text="Cancel" 
                    onClick={() => {
                        setFieldValue('date', '')
                        setShowCalendar(false);
                    }
                }/>
                <Button styles={scss.buttonCalendarChooseDate} text="Choose date" 
                    onClick={() => {
                        setFieldValue('date', formatDateForm(dateCalendar));
                        setShowCalendar(false);
                    }}
                />
            </div>

        </div>
    );
};

export default CustomCalendar;