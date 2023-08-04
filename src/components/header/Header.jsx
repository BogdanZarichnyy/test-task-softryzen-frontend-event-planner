// import { useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { Field, Form, Formik } from 'formik';

import SelectLanguage from '../selectLanguage/SelectLanguage';

import sprite from '../../images/sprite.svg';

import scss from './Header.module.scss';

const Header = () => {
    const navigate = useNavigate();
    const location = useLocation();
    // console.log(location);

    const handlerOnSearch= (values, actions) => {
        // console.log('values.search', values.search);
        const data = {
            search: values.search,
        }
        const paramsData = Object.keys(data);
        // console.log('paramsData', paramsData);
        let params;
        for (const param of paramsData) {
            // console.log('param', param);
            params += param + '=' + data[param];
        }
        // console.log('params', params);
        actions.setSubmitting(false);
        actions.resetForm();
        
        // navigate(`${location.pathname}?search=${values.search}`);
        // navigate(`/?search=${data.search}`);
        navigate(`${location.pathname}?${params}`);
    }

    return(
        <header className={scss.header}>
            <div className='container'>
                <nav className={scss.wrraper}>

                    <NavLink className={scss.logo} to="/" end>Event Planner</NavLink>

                    <SelectLanguage />

                    <Formik
                        initialValues={{ search: '' }}
                        // validationSchema={addTransactionSchema}
                        onSubmit={handlerOnSearch}
                    >
                        {() => (
                            <Form className={scss.form}>
                                <Field className={scss.inputSearch} type="text" name="search" placeholder="Search by keywords" />
                                <button className={scss.buttonSubmit} type="submit">
                                    <svg className={scss.buttonSubmitIcon}>
                                        <use id="search" href={`${sprite}#search`} />
                                    </svg>
                                </button>
                            </Form>
                        )}
                    </Formik>

                </nav>
            </div>
        </header>
    );
}

export default Header;