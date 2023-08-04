import { useEffect, useState, useCallback } from 'react';
import { NavLink, useParams, useNavigate } from "react-router-dom";
import { Field, Form, Formik } from 'formik';
import Button from '../../components/button/Button';

import sprite from '../../images/sprite.svg';

import scss from './FormEvent.module.scss';

const FormEvent = () => {

    const handlerCreateEvent = (values, actions) => {
        console.log('values.search', values.search);
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

    return(
        <Formik 
            initialValues={{ search: '' }}
            onSubmit={handlerCreateEvent}
        >
            {() => (
                <Form className={scss.form}>
                    <Field className={scss.input} type="text" name="title" placeholder="Search by keywords" />
                    <Button styles={scss.buttonSubmit} text="Add event" />
                </Form>
            )}
        </Formik>
    );
}

export default FormEvent;