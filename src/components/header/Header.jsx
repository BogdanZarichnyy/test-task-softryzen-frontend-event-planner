// import { useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { Field, Form, Formik, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import SelectLanguage from '../selectLanguage/SelectLanguage';

import sprite from '../../images/sprite.svg';

import scss from './Header.module.scss';

const Header = () => {
    // const [isDisabled, setIsDisabled] = useState(true);
    const navigate = useNavigate();
    const location = useLocation();
    // console.log(location);

    const handlerOnSearch= (values, actions) => {
        console.log('values.search', values.search);
        if(!values.search) {
            return;
        }
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
                        onSubmit={handlerOnSearch}
                        validationSchema={Yup.object().shape({
                            search: Yup.string()
                                .max(30, "Search must be at most 30 characters")
                                .matches(/^(?! )(?!-)[a-zA-Z\d\s-]+$/, "Invalid input - Only characters, '-' and numbers")
                        })}
                    >
                    {(props) => {
                        const { errors, touched, handleReset, handleChange, setFieldTouched } = props;
                        return (
                            <Form className={scss.form} autoComplete="off">
                                <Field 
                                    onChange={event => {
                                        setFieldTouched('search');
                                        handleChange(event);
                                    }}
                                    className={[scss.inputSearch, errors.search && touched.search && scss.inputSearchInvalid].join(" ")} 
                                    type="text" name="search" placeholder="Search by keywords"/>
                                <ErrorMessage name="search" component="span" className={scss.errorFeedback} />
                                <button className={scss.buttonSubmit} type="submit" disabled={errors.search && touched.search && true}>
                                    <svg className={scss.buttonSubmitIcon}>
                                        <use id="search" href={`${sprite}#search`} />
                                    </svg>
                                </button>
                                <button className={scss.buttonReset} type="submit" onClick={handleReset}>
                                    <svg className={[scss.buttonResetIcon, errors.search && touched.search && scss.buttonResetIconInvalid].join(" ")}>
                                        <use id="cross-small" href={`${sprite}#cross-small`} />
                                    </svg>
                                </button>
                            </Form>
                        )}
                    }
                    </Formik>
        
                </nav>
            </div>
        </header>
    );
}

export default Header;