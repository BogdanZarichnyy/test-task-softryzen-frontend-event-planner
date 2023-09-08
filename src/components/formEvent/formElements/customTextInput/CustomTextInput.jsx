import { Field, ErrorMessage } from 'formik';

import sprite from '../../../../images/sprite.svg';

import scss from './CustomTextInput.module.scss';

const CustomTextInput = ({ as = 'input', stylesInput, setFieldValue, setFieldTouched, handleChange, error, touched, type ='text', name, placeholder = ' ' }) => {
    return (
        <>
            <Field as={as}
                onChange={event => {
                    setFieldTouched(name);
                    handleChange(event);
                }}
                className={[scss.input, stylesInput, error && touched && scss.inputInvalid].join(" ")} 
                type={type} name={name} placeholder={placeholder} />
            <button className={scss.buttonInputReset} type="button" onClick={() => setFieldValue(name, '')}>
                <svg className={[scss.buttonInputResetIcon, error && touched && scss.buttonResetIconInvalid].join(" ")}>
                    <use id="cross-small" href={`${sprite}#cross-small`} />
                </svg>
            </button>
            <ErrorMessage name={name} component="span" className={scss.errorFeedback} />
        </>
    );
};

export default CustomTextInput;