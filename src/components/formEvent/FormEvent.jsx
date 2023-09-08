import { useNavigate, useParams } from "react-router-dom";
import { Form, Formik } from 'formik';

import Button from '../../components/button/Button';
import CustomTextInput from './formElements/customTextInput/CustomTextInput';
import CustomDatePicker from './formElements/customDatePicker/CustomDatePicker';
import CustomTimePicker from './formElements/customTimePicker/CustomTimePicker';
import CustomSelectInput from './formElements/customSelectInput/CustomSelectInput';

import { useDispatch } from "react-redux";
import { createEvent, editEvent } from '../../redux/slices/eventsSlice';

import yupSchema from '../../validation/yupSchema';

import scss from './FormEvent.module.scss';

import optionCategory from '../../assets/options/category';
import priorityOptions from '../../assets/options/priority';

import CustomInput from "./formElements/customInput/CustomInput";

const initialDataForCreateEvent = {
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

const FormEvent = ({ textForButton, action = "createEvent", initialValues = initialDataForCreateEvent }) => {
    const { eventId } = useParams();

    const categoryOptions = optionCategory.filter((item) => item.label !== 'All').map((item) => item.value);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handlerCreateEvent = (values, actions) => {
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
    
    return (
        <Formik 
            initialValues={initialValues}
            onSubmit={handlerCreateEvent}
            validateOnMount={true}
            validationSchema={yupSchema}
        >
        {(props) => {
            const { values, errors, handleChange, setFieldTouched, setFieldValue } = props;
            const isDisableSubmit = 
                !errors.title & !!values.title & 
                !errors.description & !!values.description & 
                !!values.date & 
                !!values.time & 
                !errors.location & !!values.location & 
                !!values.category & 
                !errors.picture &
                !!values.priority;

            return (
                <Form className={scss.form}>
                    <div className={scss.formContainer}>

                        <CustomInput name="title" label="Title" 
                            CustomComponent={CustomTextInput} 
                            setFieldValue={setFieldValue}
                            setFieldTouched={setFieldTouched}
                            handleChange={handleChange}
                        />

                        <CustomInput name="description" label="Description"
                            as='textarea'
                            styleLabel={scss.labelInputArea}
                            stylesInput={scss.inputArea} 
                            CustomComponent={CustomTextInput} 
                            setFieldValue={setFieldValue}
                            setFieldTouched={setFieldTouched}
                            handleChange={handleChange}
                        />

                        <CustomInput name="date" label="Select date" 
                            CustomComponent={CustomDatePicker} 
                            values={values}
                            setFieldValue={setFieldValue}
                            setFieldTouched={setFieldTouched}
                            handleChange={handleChange}
                            placeholder='Select Date'
                        />

                        <CustomInput name="time" label="Select time" 
                            CustomComponent={CustomTimePicker} 
                            values={values}
                            setFieldValue={setFieldValue}
                            setFieldTouched={setFieldTouched}
                            placeholder='Select Time'
                        />

                        <CustomInput name="location" label="Location"
                            CustomComponent={CustomTextInput} 
                            setFieldValue={setFieldValue}
                            setFieldTouched={setFieldTouched}
                            handleChange={handleChange}
                        />
                        
                        <CustomInput name="category" label="Category"
                            CustomComponent={CustomSelectInput} 
                            options={categoryOptions}
                            setFieldValue={setFieldValue}
                            setFieldTouched={setFieldTouched}
                            values={values.category}
                            placeholder='Select Category'
                        />

                        <CustomInput name="picture" label="Add picture"
                            CustomComponent={CustomTextInput} 
                            setFieldValue={setFieldValue}
                            setFieldTouched={setFieldTouched}
                            handleChange={handleChange}
                        />

                        <CustomInput name="priority" label="Priority"
                            CustomComponent={CustomSelectInput} 
                            options={priorityOptions}
                            setFieldValue={setFieldValue}
                            setFieldTouched={setFieldTouched}
                            values={values.priority}
                            placeholder='Select Priority'
                        />

                    </div>
                    <Button styles={[scss.buttonSubmit, !isDisableSubmit && scss.buttonSubmitDisable].join(" ")} text={textForButton} type="submit" disabled={!isDisableSubmit}/>
                </Form>
            )}
        }
        </Formik>
            
    );
};

export default FormEvent;