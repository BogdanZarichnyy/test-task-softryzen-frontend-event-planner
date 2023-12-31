import { useSearchParams } from 'react-router-dom';
import { Field, Form, Formik, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import { useDispatch } from "react-redux";
import { pageEvents } from '../../redux/slices/filterSlice';

import sprite from '../../images/sprite.svg';

import scss from './SearchForm.module.scss';

const SearchForm = () => {   
    const dispatch = useDispatch();

    const [urlParams, setUrlParams] = useSearchParams();

    const handlerOnSearch= (values, actions) => {
        dispatch(pageEvents(1));

        let dataUrlParams = {
            page: 1,
            ...(values.search ? {search: values.search} : null),
        };
        setUrlParams({ ...dataUrlParams });

        actions.setSubmitting(false);
        actions.resetForm();
    }

    return (
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
    );
};

export default SearchForm;