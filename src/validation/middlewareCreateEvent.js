import * as Yup from 'yup';

const schema = Yup.object().shape({
    title: Yup.string()
        .max(30, "Must be at most 30 characters")
        .matches(/^(?! )(?!-)[a-zA-Z\d\s-]+$/, "Invalid input")
        // .optional()
        .nullable(''),
    description: Yup.string()
        .max(300, "Must be at most 300 characters")
        // .optional()
        .nullable(''),
    date: Yup.string(),
    // date: Yup.date(),
    //     .min(new Date()),
    // time: Yup.string(),
    time: Yup.date()
        // .optional()
        .nullable(''),
    location: Yup.string()
        .max(30, "Must be at most 30 characters")
        .matches(/^(?! )(?!-)[a-zA-Z\d\s-]+$/, "Invalid input")
        // .optional()
        .nullable(''),
    category: Yup.mixed().oneOf(categoryOptions)
        // .optional()
        .nullable(''),
    picture: Yup.string()
        .url()
        .matches(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/, "Invalid input")
        .optional()
        .nullable(''),
    priority: Yup.mixed().oneOf(priorityOptions)
        // .optional()
        .nullable(''),
    createAt: Yup.date(),
    updateAt: Yup.date(),
});

const result = await userSchema.validate((object) => console.log(object));

