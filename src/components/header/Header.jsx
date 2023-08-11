import { useEffect, useState } from 'react';
import { NavLink, useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { Field, Form, Formik, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import { useSelector, useDispatch } from "react-redux";
import { searchEvents } from '../../redux/slices/searchSlice';
import { pageSelector } from '../../redux/selectors';

import SelectLanguage from '../selectLanguage/SelectLanguage';

import sprite from '../../images/sprite.svg';

import scss from './Header.module.scss';

const Header = () => {   
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const eventsStorePage = useSelector(pageSelector);

    const [pageParams, setPageParams] = useSearchParams();
    const [searchParams, setSearchParams] = useSearchParams();
    const [categoryParams, setCategoryParams] = useSearchParams();
    const [priorityParams, setPriorityParams] = useSearchParams();
    const pageQuery = pageParams.get('page') ?? '1';
    const searchQuery = searchParams.get('search') ?? '';
    const categoryQuery = categoryParams.get('category') ?? '';
    const priorityQuery = priorityParams.get('priority') ?? '';
    // console.log('page', pageQuery);
    // console.log('search', searchQuery);
    // console.log('category', categoryQuery);
    // console.log('priority', priorityQuery);




    // useEffect(() => {
    //     const data = {
    //         search: searchQuery,
    //         category: categoryQuery,
    //         priority: priorityQuery,
    //     }
    //     const paramsData = Object.keys(data);
    //     let params = '';
    //     for (const param of paramsData) {
    //         params += param + '=' + data[param];
    //     }

    //     dispatch(searchEvents(searchQuery));
    //     // !searchQuery ? navigate(`/?page=${eventsStorePage}`) : navigate(`/?${params}`);
    //     // !searchQuery ? navigate(`/?${params}`) : navigate(`/?${params}`);
    //     // !searchQuery ? navigate(`/?page=${pageQuery}`) : navigate(`/?page=${pageQuery}&${params}`);
    //     !searchQuery ? navigate(`/?page=${eventsStorePage}`) : navigate(`/?page=${eventsStorePage}${params}`);
    // }, [dispatch, navigate, searchQuery]);





    const handlerOnSearch= (values, actions) => {
        console.log('values.search', values.search);
        
        if(!values.search) {
            dispatch(searchEvents(values.search));
            navigate('/');
        } else {
            dispatch(searchEvents(values.search));
        
            const data = {
                search: values.search,
            }
            const paramsData = Object.keys(data);
            // console.log('paramsData', paramsData);
            let params = '';
            for (const param of paramsData) {
                // console.log('param', param);
                params += param + '=' + data[param];
            }
            // console.log('params', params);
            actions.setSubmitting(false);
            actions.resetForm();
            
            // navigate(`${location.pathname}?search=${values.search}`);
            // navigate(`/?search=${data.search}`);
            // navigate(`${location.pathname}?${params}`);
            navigate(`/?${params}`);
        }
    }

    return(
        <header className={scss.header}>
            <div className='container'>
                <nav className={scss.wrraper}>

                    <NavLink className={scss.logo} to="/" end>Event Planner</NavLink>
                    {/* <NavLink className={scss.logo} to={!searchQuery ? '/' : `/?search=${searchQuery}`} end>Event Planner</NavLink> */}

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