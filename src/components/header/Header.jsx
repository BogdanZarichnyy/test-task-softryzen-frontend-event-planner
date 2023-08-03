import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Field, Form, Formik } from 'formik';

import SelectLanguage from '../selectLanguage/SelectLanguage';

import sprite from '../../images/sprite.svg';

import scss from './Header.module.scss';

const Header = () => {

    const onSearchHandler = (values, actions) => {
        console.log(values);
        // console.log(actions);

        console.log(values.search);

        actions.setSubmitting(false);
        actions.resetForm();
    }

    return(
        <header className={scss.header}>
            <div className='container'>
                <nav className={scss.wrraper}>

                    <NavLink className={scss.logo} to="/" end>Event Planner</NavLink>

                    <SelectLanguage />

                    <Formik
                        initialValues={{ search: '' }}
                        onSubmit={onSearchHandler}

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