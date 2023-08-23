import { NavLink, useNavigate } from 'react-router-dom';
import { Field, Form, Formik, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import { useDispatch } from "react-redux";
import { searchEvents, pageEvents, categoryEvents, sortByEvents } from '../../redux/slices/searchSlice';


import SelectLanguage from '../selectLanguage/SelectLanguage';

import sprite from '../../images/sprite.svg';

import scss from './Header.module.scss';

const Header = () => {   
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handlerOnSearch= (values, actions) => {
        // console.log('values.search', values.search);

        if(!values.search) {
            dispatch(pageEvents(1));
            dispatch(searchEvents(''));
            dispatch(categoryEvents(''));
            dispatch(sortByEvents(''));

            navigate('/?page=1');
        } else {
            dispatch(pageEvents(1));
            dispatch(searchEvents(values.search.toLowerCase()));
            dispatch(categoryEvents(''));
            dispatch(sortByEvents(''));

            navigate(`/?page=1&search=${values.search}`);
        }
        actions.setSubmitting(false);
        actions.resetForm();
    }

    return(
        <header className={scss.header}>
            <div className='container'>
                <nav className={scss.wrraper}>

                    <NavLink className={scss.logo} to="/?page=1" end>Event Planner</NavLink>

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