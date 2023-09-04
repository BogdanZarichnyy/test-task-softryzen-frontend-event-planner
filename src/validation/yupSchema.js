import * as Yup from 'yup';

import optionCategory from '../assets/options/category';
import priorityOptions from '../assets/options/priority';

const categoryOptions = optionCategory.map((item) => item.value);

const yupSchema = Yup.object().shape({
    title: Yup.string()
        .max(30, "Must be at most 30 characters")
        .matches(/^(?! )(?!-)[a-zA-Z\d\s-]+$/, "Invalid input")
        .nonNullable(),
    description: Yup.string()
        .max(300, "Must be at most 300 characters")
        .nonNullable(),
    date: Yup.string()
        .nonNullable(),
    time: Yup.date()
        .nonNullable(),
    location: Yup.string()
        .max(30, "Must be at most 30 characters")
        .matches(/^(?! )(?!-)[a-zA-Z\d\s-]+$/, "Invalid input")
        .nonNullable(),
    category: Yup.mixed().oneOf(categoryOptions)
        .nonNullable(),
    picture: Yup.string()
        .url()
        .matches(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/, "Invalid input")
        .optional()
        .nullable(''),
    priority: Yup.mixed().oneOf(priorityOptions)
        .nonNullable(),
    createAt: Yup.date(),
    updateAt: Yup.date(),
});

export default yupSchema;