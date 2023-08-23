import React, { useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { Field, Form, Formik, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import InputMask from 'react-input-mask';

import Button from '../../components/button/Button';

import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

// import DatePicker from "react-datepicker";
// import 'react-datepicker/dist/react-datepicker.css';

import TimePicker from 'rc-time-picker';
import 'rc-time-picker/assets/index.css';

import moment from 'moment';

import { useDispatch } from "react-redux";
import { createEvent, editEvent } from '../../redux/slices/eventsSlice';

import sprite from '../../images/sprite.svg';

import scss from './FormEvent.module.scss';

import optionCategory from '../../assets/options/category';
import priorityOptions from '../../assets/options/priority';

const initialDataForFormCreate = {
    title: '',
    description: '',
    date: '',
    time: '',
    location: '',
    category: '',
    picture: '',
    priority: '',
    createAt: new Date(),
    updateAt: new Date(),
}

const FormEvent = ({ textForButton, action = "createEvent", initialValues = initialDataForFormCreate }) => {
    const [showCalendar, setShowCalendar] = useState(false);
    const [dateCalendar, setDateCalendar] = useState(new Date());
    const [showTimePicker, setShowTimePicker] = useState(false);
    const [isValue, setIsValue] = useState(false);

    // const [isSubmitForm, setIsSubmitForm] = useState(true);
    // const [isSubmitForm, setIsSubmitForm] = useState(false);
    const { eventId } = useParams();

    const categoryOptions = optionCategory.map((item) => item.value);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handlerCreateEvent = (values, actions) => {
        // console.log(values);
        
        if (action === "createEvent") {
            dispatch(createEvent(values));
            actions.setSubmitting(false);
            actions.resetForm();
            navigate('/');
        } else if (action === "editEvent" & eventId !== null) {
            const event = {
                ...values,
                id: eventId
            };
            dispatch(editEvent(event));
            actions.setSubmitting(false);
            actions.resetForm();
            navigate(`/details/${eventId}`);
        }
    }

    // const handlerIsDataSubmit = (dataForm) => {
    //     console.log('dataForm', dataForm);
    //     // const submitDataForm = Object.keys(dataForm)
    //     //     .filter((item) => item === 'createAt' ? null : item === 'updateAt' ? null : item === 'picture' ? null : item);
    //     // // console.log(submitDataForm);

    //     // const ddd = dataForm.title & dataForm.description & dataForm.date & dataForm.time & dataForm.location & dataForm.category & dataForm.priority;
    //     // console.log('ddd', ddd);

    //     const submitDataForm = Object.values(dataForm);
    //     console.log('submitDataForm', submitDataForm);

    //     // for (const param of submitDataForm) {
    //     //     if (!dataForm[param]) {
    //     //         setIsSubmitForm(true);
    //     //     } else setIsSubmitForm(false);
    //     // }
    // }

    const handlerToggleCalendar = () => {
        setShowCalendar(!showCalendar);
    }

    const handlerCloseCalendar = () => {
        setShowCalendar(false);
    }
    
    const handlerCloseChooseDate = (setFieldValue) => {
        setFieldValue('date', formatDate(dateCalendar));
        setShowCalendar(false);
    }

    const formatDate = (date) => {
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        const result = day.toString().padStart(2, '0') + '.' + month.toString().padStart(2, '0') + '.' + year;
        return result;
    }

    const getEditTimeForTimePicker = (value = new Date()) => {
        const date = new Date(value);
        const hours = date.getHours();
        const minutes = date.getMinutes();
        // const result = moment().hour(hours).minute(minutes).utc();
        const result = moment().hour(hours).minute(minutes).utcOffset(0);
        return result;
    }

    const getTimeForTimePicker = (value = new Date()) => {
        const date = new Date(value);
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const result = moment().hour(hours).minute(minutes);
        return result;
    }

    return(
        <Formik 
            initialValues={initialValues}
            onSubmit={handlerCreateEvent}
            validateOnMount={true}
            validationSchema={Yup.object().shape({
                title: Yup.string()
                    .max(30, "Must be at most 30 characters")
                    .matches(/^(?! )(?!-)[a-zA-Z\d\s-]+$/, "Invalid input")
                    // .optional()
                    // .nullable(''),
                    .nonNullable(),
                description: Yup.string()
                    .max(300, "Must be at most 300 characters")
                    // .optional()
                    // .nullable(''),
                    .nonNullable(),
                date: Yup.string()
                    .nonNullable(),
                // date: Yup.date(),
                //     .min(new Date()),
                time: Yup.date()
                    .nonNullable(),
                    // .optional()
                    // .nullable(''),
                location: Yup.string()
                    .max(30, "Must be at most 30 characters")
                    .matches(/^(?! )(?!-)[a-zA-Z\d\s-]+$/, "Invalid input")
                    .nonNullable(),
                    // .optional()
                    // .nullable(''),
                category: Yup.mixed().oneOf(categoryOptions)
                    // .optional()
                    // .nullable(''),
                    .nonNullable(),
                picture: Yup.string()
                    // .url()
                    // .matches(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/, "Invalid input")
                    .optional()
                    .nullable(''),
                priority: Yup.mixed().oneOf(priorityOptions)
                    .nonNullable(),
                    // .optional()
                    // .nullable(''),
                createAt: Yup.date(),
                updateAt: Yup.date(),
            })}
        >
        {(props) => {
            const { values, errors, touched, handleChange, setFieldTouched, setFieldValue } = props;
            // const { values, errors, touched, handleChange, setFieldTouched, setFieldValue, dirty, isValid, isSubmitting , isValidating, isInitialValid, validateOnMount } = props;
            // console.log('validateOnMount', validateOnMount);
            // console.log('isValidating', isValidating);
            // console.log(touched.constructor);
            return (
                <Form className={scss.form}>
                    <div className={scss.formContainer}>
                        
                        <label className={scss.labelInput} htmlFor="title">Title
                            <Field 
                                onChange={event => {
                                    // console.log(event.target.value);
                                    // setFieldValue('title', event.target.value);
                                    setFieldTouched('title');
                                    handleChange(event);
                                    // handlerIsDataSubmit(values);
                                }}
                                className={[scss.input, errors.title && touched.title && scss.inputInvalid].join(" ")} 
                                type="text" name="title" placeholder=" " />
                            <button className={scss.buttonInputReset} type="button" onClick={() => setFieldValue('title', '')}>
                                <svg className={[scss.buttonInputResetIcon, errors.title && touched.title && scss.buttonResetIconInvalid].join(" ")}>
                                    <use id="cross-small" href={`${sprite}#cross-small`} />
                                </svg>
                            </button>
                            <ErrorMessage name="title" component="span" className={scss.errorFeedback} />
                        </label>

                        <label className={[scss.labelInput, scss.labelInputTitle].join(" ")} htmlFor="description">Description
                            <Field as="textarea"
                                onChange={(event) => {
                                    // setFieldValue('title', event.target.value);
                                    setFieldTouched('description');
                                    handleChange(event);
                                }}
                                className={[scss.inputArea, errors.description && touched.description && scss.inputInvalid].join(" ")} 
                                type="text" name="description" placeholder=" " />
                            <button className={scss.buttonInputReset} type="button" onClick={() => setFieldValue('description', '')}>
                                <svg className={[scss.buttonInputResetIcon, errors.description && touched.description && scss.buttonResetIconInvalid].join(" ")}>
                                    <use id="cross-small" href={`${sprite}#cross-small`} />
                                </svg>
                            </button>
                            <ErrorMessage name="description" component="span" className={scss.errorFeedback} />
                        </label>

                        <label className={scss.labelInput} htmlFor="date">Select date
                            <InputMask 
                                mask="99/99/9999"
                                    onChange={ async (event) => {
                                        try {
                                            // console.log(event.target.value);
                                            const value = event.target.value || "";
                                            const newValue = await value
                                                .replace(/^(__\/__\/____)$/, '\r$1')
                                                .replace(/^(_)(.+)$/, '$1\\_\/__\/____')
                                                // .replace(/^(_)(.{1})(\/__\/____)$/, '$1\\_$3')
                                                .replace(/^(00)(\/__\/____)$/, '\\01$2')
                                                .replace(/^(3{1})([2-9]{1})(\/__\/____)$/, '$1\\1$3')
                                                .replace(/^([4-9]{1})(_)(\/__\/____)$/, `\\0$1$3`)
                                                .replace(/^(\d{2}\/)(_)(.{1})(\/____)$/, '$1$2\\_$4')
                                                .replace(/^(\d{2}\/)(00)(\/____)$/, '$1\\01$3')
                                                .replace(/^(\d{2}\/)(1)([3-9]{1})(\/____)$/, '$1$2\\2$4')
                                                .replace(/^(\d{2}\/)([2-9]{1})(_)(\/____)$/, '$1\\0$2$4')
                                                .replace(/^(\d{1}\/)(_)(.{2})(\/)(.{4})$/, '$1$2\\_$4\\____')
                                                .replace(/^(\d{2}\/)(_)(.{1})(\/)(.{4})$/, '$1$2\\_$4\\____')
                                                .replace(/^(\d{2}\/\d{1})(_)(\/)(.{4})$/, '$1$2$3\\____')
                                                .replace(/^(\d{2}\/\d{2}\/)(_)(.{3})$/, '$1\\____')
                                                .replace(/^(\d{2}\/\d{2}\/)(0|1|[3-9]{1})(_)(__)$/, '$1\\20$4')
                                                .replace(/^(\d{2}\/\d{2}\/\d{1})(_)(.{2})$/, '$1\\___')
                                                .replace(/^(\d{2}\/\d{2}\/\d{2})(_)(.)$/, '$1$2\\_')
                                                .replace(/^(\d{2}\/)(\d{2}\/)(\d{4})$/, '$1$2$3');

                                            await setFieldValue("date", newValue);

                                            // await setFieldTouched('date');
                                            // handleChange(event);
                                        } catch (error) {
                                            console.log(error);
                                        }
                                    }}
                                    value={values.date}
                                >
                                {(inputProps) => <Field {...inputProps} 
                                    className={[scss.input, scss.inputDatePiker].join(" ")} 
                                    type="text" name="date" placeholder="Select Date" id="date"/>}
                            </InputMask>
                            <button className={[scss.buttonInputReset, scss.buttonInputDatePiker, showCalendar && scss.isOpenCalendar].join(" ")} type="button" onClick={handlerToggleCalendar}>
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
                                <div className={scss.datePiker}>
                                    <Calendar 
                                        className={scss.calendar}
                                        tileClassName={scss.tile}
                                        defaultValue={dateCalendar}
                                        // onChange={(date, event) => console.log(date)}
                                        onClickDay={async (date) => {
                                            await setFieldValue('date', formatDate(date));
                                            // setFieldValue('date', date);
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
                                                handlerCloseCalendar();
                                            }
                                        }/>
                                        <Button styles={scss.buttonCalendarChooseDate} text="Choose date" 
                                            onClick={() => handlerCloseChooseDate(setFieldValue)}
                                        />
                                    </div>
                                </div>
                            }
                        </label>
 
                        {/* <label className={scss.labelInput} htmlFor="time">Select time
                            <InputMask 
                                mask="99:99 aa"
                                    onChange={ async (event) => {
                                        try {
                                            // console.log(event.target.value);
                                            const value = event.target.value || "";
                                            const newValue = await value
                                                .replace(/^(__:__\s__)$/, '\r$1')
                                                .replace(/^(_)(.{1})(:__\s__)$/, '$1\\_$3')
                                                .replace(/^(1{1})([3-9]{1})(:__\s__)$/, '$1\\2$3')
                                                .replace(/^([2-9]{1})(_)(:__\s__)$/, '\\0$1$3')
                                                .replace(/^(\d{2}:)(_)(.{1})(\s__)$/, '$1$2\\_$4')
                                                .replace(/^(\d{2}:)([6-9]{1})(_)(\s__)$/, '$1\\0$2$4')
                                                .replace(/^(\d{2}:\d{2}\s)(_)(.{1})$/, '$1$2\\_')
                                                // .replace(/^(\d{2}:\d{2}\s)(a)(_)$/, '$1$2\\m')
                                                // .replace(/^(\d{2}:\d{2}\s)(A)(_)$/, '$1$2\\M')
                                                // .replace(/^(\d{2}:\d{2}\s)(p)(_)$/, '$1$2\\m')
                                                // .replace(/^(\d{2}:\d{2}\s)(P)(_)$/, '$1$2\\M')
                                                // .replace(/^(\d{2}:\d{2}\s)(a|p)(.{1})$/, '$1$2\\m')
                                                // .replace(/^(\d{2}:\d{2}\s)(A|P)(.{1})$/, '$1$2\\M')
                                                .replace(/^(\d{2}:\d{2}\s)(a|A)(.{1})$/, '$1\\am')
                                                .replace(/^(\d{2}:\d{2}\s)(p|P)(.{1})$/, '$1\\pm')
                                                // .replace(/^(\d{2}:\d{2}\s)([b-z]{1})(.{1})$/, '$1\\pm')
                                                // .replace(/^(\d{2}:\d{2}\s)([B-Z]{1})(.{1})$/, '$1\\PM')
                                                .replace(/^(\d{2}:\d{2}\s)([b-z]{1})(.{1})$/, '$1\\pm')
                                                .replace(/^(\d{2}:\d{2}\s)([B-Z]{1})(.{1})$/, '$1\\pm');

                                            await setFieldValue("time", newValue);

                                            // setFieldValue("time", value);
                                            // setFieldTouched('time');
                                            handleChange(event);

                                        } catch (error) {
                                            console.log(error);
                                        }
                                    }}
                                    value={values.time}
                                >
                                {(inputProps) => <Field {...inputProps} 
                                    className={[scss.input, scss.inputDatePiker].join(" ")} 
                                    // className={[scss.input, scss.inputTimePiker].join(" ")} 
                                    type="text" name="time" placeholder="Select Time" id="time"/>}
                            </InputMask>
                            <button className={[scss.buttonInputReset, scss.buttonInputDatePiker, showTime && scss.isOpenCalendar].join(" ")} type="button" onClick={handlerToggleTime}>
                                {showTime ?
                                    <svg className={[scss.buttonInputResetIcon, errors.time && touched.time && scss.buttonResetIconInvalid].join(" ")}>
                                        <use id="chevron-up-small" href={`${sprite}#chevron-up-small`} />
                                    </svg>
                                    :
                                    <svg className={[scss.buttonInputResetIcon, errors.time && touched.time && scss.buttonResetIconInvalid].join(" ")}>
                                        <use id="chevron-down-small" href={`${sprite}#chevron-down-small`} />
                                    </svg>
                                }
                            </button>
                                                        
                            {showTime &&
                                <div className={scss.timePiker}>
                                    <DatePicker
                                        // selected={values.time}
                                        selected={new Date()}
                                        onChange={(date) => console.log(date)}
                                        showTimeSelect
                                        showTimeSelectOnly
                                        timeIntervals={15}
                                        timeCaption="Time"
                                        dateFormat="hh:mm aa"
                                        // strictParsing={true}
                                        customInput={<ExampleCustomInput props={{values, errors, touched, handleChange, setFieldTouched, setFieldValue, showTime, handlerToggleTime}} />}
                                    />
                                </div>}
                        </label> */}

                        <label className={scss.labelInput} htmlFor="time">Select time
                            <div className={scss.wrraperTimePicker}
                                onClick={() => setShowTimePicker(!showTimePicker)}
                            >
                                <TimePicker 
                                    showSecond={false}
                                    // defaultOpenValue={getTimeForTimePicker()}
                                    defaultOpenValue={values.time !== '' ? getEditTimeForTimePicker(values.time) : getTimeForTimePicker() }
                                    defaultValue={null}
                                    className={scss.timePicker}
                                    open={showTimePicker}
                                    onChange={async (value) => {
                                        // console.log(value._d);  // *._d Moment
                                        await setFieldValue('time', value._d); // *._d Moment
                                        // const date = new Date(value._d);
                                        // await setFieldValue('time', date); // *._d Moment
                                        setShowTimePicker(true);
                                        setIsValue(true);
                                    }}
                                    format="hh:mm a"
                                    placeholder="Select Date"
                                    use12Hours
                                    inputReadOnly
                                    value={values.time ? getTimeForTimePicker(values.time) : null}
                                />
                                {showTimePicker ?
                                    <svg className={[scss.buttonInputResetIcon, scss.buttonTimePickerIcon, (showTimePicker || isValue) && scss.buttonTimePickerIconIsActive].join(" ")}>
                                        <use id="chevron-up-small" href={`${sprite}#chevron-up-small`} />
                                    </svg>
                                    :
                                    <svg className={[scss.buttonInputResetIcon, scss.buttonTimePickerIcon, (showTimePicker || isValue) && scss.buttonTimePickerIconIsActive].join(" ")}>
                                        <use id="chevron-down-small" href={`${sprite}#chevron-down-small`} />
                                    </svg>
                                }
                            </div>
                        </label>

                        <label className={scss.labelInput} htmlFor="location">Location
                            <Field
                                onChange={event => {
                                    setFieldTouched('location');
                                    handleChange(event);
                                }}
                                className={[scss.input, errors.location && touched.location && scss.inputInvalid].join(" ")} 
                                type="text" name="location" placeholder=" " />
                            <button className={scss.buttonInputReset} type="button" onClick={() => setFieldValue('location', '')}>
                                <svg className={[scss.buttonInputResetIcon, errors.location && touched.location && scss.buttonResetIconInvalid].join(" ")}>
                                    <use id="cross-small" href={`${sprite}#cross-small`} />
                                </svg>
                            </button>
                            <ErrorMessage name="location" component="span" className={scss.errorFeedback} />
                        </label>

                        <label className={scss.labelInput} htmlFor="category">Category
                            <Dropdown
                                options={categoryOptions}
                                controlClassName={[scss.input, scss.inputDropdown].join(" ")}
                                placeholderClassName={scss.placeholderDropdown}
                                menuClassName={scss.menuDropdown}
                                arrowOpen={
                                    <svg className={scss.buttonInputDropdwonIcon}>
                                        <use id="chevron-up-small" href={`${sprite}#chevron-up-small`} />
                                    </svg>
                                }
                                arrowClosed={
                                    <svg className={scss.buttonInputDropdwonIcon}>
                                        <use id="chevron-down-small" href={`${sprite}#chevron-down-small`} />
                                    </svg>
                                }
                                onChange={(newValue) => setFieldValue('category', newValue.value)} 
                                value={values.category} 
                                placeholder="Select Category"
                            />
                        </label>

                        <label className={scss.labelInput} htmlFor="picture">Add picture
                            <Field
                                onChange={event => {
                                    setFieldTouched('picture');
                                    handleChange(event);
                                }}
                                className={[scss.input, errors.picture && touched.picture && scss.inputInvalid].join(" ")} 
                                type="text" name="picture" placeholder=" " />
                            <button className={scss.buttonInputReset} type="button" onClick={() => setFieldValue('picture', '')}>
                                <svg className={[scss.buttonInputResetIcon, errors.picture && touched.picture && scss.buttonResetIconInvalid].join(" ")}>
                                    <use id="cross-small" href={`${sprite}#cross-small`} />
                                </svg>
                            </button>
                            <ErrorMessage name="picture" component="span" className={scss.errorFeedback} />
                        </label>

                        <label className={scss.labelInput} htmlFor="priority">Priority
                            <Dropdown
                                options={priorityOptions}
                                controlClassName={[scss.input, scss.inputDropdown].join(" ")}
                                placeholderClassName={scss.placeholderDropdown}
                                menuClassName={scss.menuDropdown}
                                arrowOpen={
                                    <svg className={scss.buttonInputDropdwonIcon}>
                                        <use id="chevron-up-small" href={`${sprite}#chevron-up-small`} />
                                    </svg>
                                }
                                arrowClosed={
                                    <svg className={scss.buttonInputDropdwonIcon}>
                                        <use id="chevron-down-small" href={`${sprite}#chevron-down-small`} />
                                    </svg>
                                }
                                onChange={(newValue) => setFieldValue('priority', newValue.value)}
                                // onChange={(newValue) => {
                                    // setFieldValue('priority', newValue.value);
                                    // handlerIsDataSubmit(values);
                                // }} 
                                value={values.priority} 
                                placeholder="Select Priority"
                            />
                        </label>

                    </div>
                    <Button styles={scss.buttonSubmit} text={textForButton} type="submit"/>
                    {/* <Button styles={[scss.buttonSubmit, !dirty && !isValid  && scss.buttonSubmitDisable].join(" ")} text={textForButton} type="submit" disabled={!dirty && !isValid}/> */}
                    {/* <Button styles={[scss.buttonSubmit, !isValid || isSubmitting || (Object.keys(touched).length === 0 && touched.constructor === Object)  && scss.buttonSubmitDisable].join(" ")} text={textForButton} type="submit" disabled={!isValid || isSubmitting || (Object.keys(touched).length === 0 && touched.constructor === Object)}/> */}
                    {/* <Button styles={[scss.buttonSubmit, (!isValid || (Object.keys(touched).length === 0 && touched.constructor === object)) && scss.buttonSubmitDisable].join(" ")} text={textForButton} type="submit" disabled={!isValid || (Object.keys(touched).length === 0 && touched.constructor === object)}/> */}
                    {/* <Button styles={[scss.buttonSubmit, !isSubmitForm && scss.buttonSubmitDisable].join(" ")} text={textForButton} type="submit" disabled={!isSubmitForm}/> */}
                </Form>
            )}
        }
        </Formik>
            
    );
}

export default FormEvent;

// const ExampleCustomInput = forwardRef( ( { props }, ref ) => {
//     console.log('props', props);
//     console.log('ref', ref);
//     const { values, errors, touched, handleChange, setFieldTouched, setFieldValue, showTime, handlerToggleTime } = props;
//     console.log('values', values);

//     return (
//         <>
//             <InputMask 
//                 ref={ref}
//                 mask="99:99 aa"
//                 onChange={ async (event) => {
//                     try {
//                         const value = event.target.value || "";
//                         const newValue = await value
//                             .replace(/^(__:__\s__)$/, '\r$1')
//                             .replace(/^(_)(.{1})(:__\s__)$/, '$1\\_$3')
//                             .replace(/^(1{1})([3-9]{1})(:__\s__)$/, '$1\\2$3')
//                             .replace(/^([2-9]{1})(_)(:__\s__)$/, '\\0$1$3')
//                             .replace(/^(\d{2}:)(_)(.{1})(\s__)$/, '$1$2\\_$4')
//                             .replace(/^(\d{2}:)([6-9]{1})(_)(\s__)$/, '$1\\0$2$4')
//                             .replace(/^(\d{2}:\d{2}\s)(_)(.{1})$/, '$1$2\\_')
//                             .replace(/^(\d{2}:\d{2}\s)(a|A)(.{1})$/, '$1\\am')
//                             .replace(/^(\d{2}:\d{2}\s)(p|P)(.{1})$/, '$1\\pm')
//                             .replace(/^(\d{2}:\d{2}\s)([b-z]{1})(.{1})$/, '$1\\pm')
//                             .replace(/^(\d{2}:\d{2}\s)([B-Z]{1})(.{1})$/, '$1\\pm');

//                         await setFieldValue("time", newValue);

//                         handleChange(event);

//                     } catch (error) {
//                         console.log(error);
//                     }
//                 }}
//                 value={values.time}
//             >
//             {(inputProps) => <Field {...inputProps} 
//                 ref={inputProps.ref}
//                 className={[scss.input, scss.inputDatePiker].join(" ")} 
//                 type="text" name="time" placeholder="Select Time" id="time"/>}
//             </InputMask>
//             <button className={[scss.buttonInputReset, scss.buttonInputDatePiker, showTime && scss.isOpenCalendar].join(" ")} type="button" onClick={handlerToggleTime}>
//                 {showTime ?
//                     <svg className={[scss.buttonInputResetIcon, errors.time && touched.time && scss.buttonResetIconInvalid].join(" ")}>
//                         <use id="chevron-up-small" href={`${sprite}#chevron-up-small`} />
//                     </svg>
//                     :
//                     <svg className={[scss.buttonInputResetIcon, errors.time && touched.time && scss.buttonResetIconInvalid].join(" ")}>
//                         <use id="chevron-down-small" href={`${sprite}#chevron-down-small`} />
//                     </svg>
//                 }
//             </button>
//         </>
//     )}
// );