import { useEffect, useState, useCallback } from 'react';
import { NavLink, useParams, useNavigate } from "react-router-dom";
import { Field, Form, Formik, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';

import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

import Button from '../../components/button/Button';

import sprite from '../../images/sprite.svg';

import scss from './FormEvent.module.scss';

import optionCategory from '../../assets/options/category';
import priorityOptions from '../../assets/options/priority';

const initialData = {
    title: '',
    description: '',
    date: '',
    time: '',
    location: '',
    category: '',
    picture: '',
    priority: '',
    createAt: new Date(),
    updateAt: new Date()
}

const FormEvent = ({ initialValues = initialData }) => {
    const [selectedDate, setSelectedDate] = useState();

    // const today = new Date();
    // const nextMonth = addMonths(new Date(), 1);
    // const [month, setMonth] = useState(today);

    const [value, onChange] = useState(new Date());

    const categoryOptions = optionCategory.map((item) => item.value);
    const defaultOptionCategory = '';
    const defaultOptionPriority = '';

    const handlerCreateEvent = (values, actions) => {
        console.log('values', values);
        // const data = {
        //     search: values.search,
        // }
        // const paramsData = Object.keys(data);
        // console.log('paramsData', paramsData);
        // let params;
        // for (const param of paramsData) {
            // console.log('param', param);
        //     params += param + '=' + data[param];
        // }
        // console.log('params', params);
        actions.setSubmitting(false);
        // actions.resetForm();
        
        // navigate(`${location.pathname}?search=${values.search}`);
        // navigate(`/?search=${data.search}`);
        // navigate(`${location.pathname}?${params}`);
    }

    const handlerInputReset = () => {
        console.log('handlerInputReset');
    }

    return(
        <Formik 
            initialValues={initialValues}
            onSubmit={handlerCreateEvent}
            validationSchema={Yup.object().shape({
                title: Yup.string()
                    .max(30, "Must be at most 30 characters")
                    .matches(/^(?! )(?!-)[a-zA-Z\d\s-]+$/, "Invalid input"),
                description: Yup.string()
                    .max(300, "Must be at most 300 characters"),
                date: Yup.date()
                    .min(new Date()),
                time: Yup.date()
                    .min(new Date()),
                location: Yup.string()
                    .max(30, "Must be at most 30 characters")
                    .matches(/^(?! )(?!-)[a-zA-Z\d\s-]+$/, "Invalid input"),
                category: Yup.mixed().oneOf(categoryOptions),
                picture: Yup.string()
                    .matches(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/, "Invalid input")
                    .optional()
                    .nullable(''),
                priority: Yup.mixed().oneOf(priorityOptions),
                createAt: Yup.date(),
                updateAt: Yup.date(),
            })}
        >
        {(props) => {
            const { errors, touched, handleChange, setFieldTouched, setFieldValue } = props;
            return (
                <Form className={scss.form}>
                    <div className={scss.formContainer}>
                        
                        <label className={scss.labelInput} htmlFor="title">Title
                            <Field 
                                onChange={event => {
                                    setFieldTouched('title');
                                    handleChange(event);
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

                        <label className={scss.labelInput} htmlFor="description">Description
                            <Field as="textarea"
                                onChange={event => {
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
                            <DatePicker 
                                select="date"
                                wrapperClassName="datePickerWrraper"
                                className={scss.input}
                                dateFormat="dd.MM.yyyy"
                                mode="single"
                                minDate={new Date()}
                                // value={}
                                // selected={new Date()} 
                                // placeholder="Select Date"
                                selected={selectedDate}
                                onSelect={(date) => setSelectedDate(date)} 
                                onChange={(date) => setFieldValue('date', date)} 
                                // month={month}
                                // footer={
                                //     <div>sdfsefwef
                                //     </div>
                                // }




                                // excludeDates={[new Date(), subDays(new Date(), 1)]}

                                // showTimeSelect 
                                // dateFormat="Pp"
                            />
                            {/* <svg className={scss.buttonInputDropdwonIcon}>
                                <use id="chevron-up-small" href={`${sprite}#chevron-up-small`} />
                            </svg> */}
                            <svg className={scss.buttonInputDatePickerIcon}>
                                <use id="chevron-down-small" href={`${sprite}#chevron-down-small`} />
                            </svg>
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
                            <Dropdown options={categoryOptions}
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
                                value={defaultOptionCategory} 
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
                            <Dropdown options={priorityOptions}
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
                                value={defaultOptionPriority} 
                                placeholder="Select Priority"
                            />
                        </label>

                    </div>
                    <Button styles={scss.buttonSubmit} text="Add event" type="submit"/>
                </Form>
            )}
        }
        </Formik>
            
    );
}

export default FormEvent;