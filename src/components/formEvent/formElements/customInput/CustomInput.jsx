import { useField } from 'formik';

import scss from './CustomInput.module.scss';

const CustomInput = ({ label, styleLabel, CustomComponent, ...props }) => {
    const [field, meta] = useField(props);

    return (
        <label className={[scss.labelInput, styleLabel].join(" ")} htmlFor={props.name}>
            {label}
            <CustomComponent {...field} {...meta} {...props} />
        </label>
    );
};
export default CustomInput;