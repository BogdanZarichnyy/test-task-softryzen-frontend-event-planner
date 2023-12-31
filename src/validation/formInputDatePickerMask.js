const validationDatePickerInputMask = (value) => {
    return value
        .replace(/^(__\/__\/____)$/, '\r$1')
        .replace(/^(_)(.+)$/, '$1\\_\/__\/____')
        .replace(/^(00)(\/__\/____)$/, '\\01$2')
        .replace(/^(3{1})([2-9]{1})(\/__\/____)$/, '$1\\1$3')
        .replace(/^([4-9]{1})(_)(\/__\/____)$/, `\\0$1$3`)
        .replace(/^(\d{2}\/)(_)(.{1})(\/____)$/, '$1$2\\_$4')
        .replace(/^(\d{2}\/)(00)(\/____)$/, '$1\\01$3')
        .replace(/^(\d{2}\/)(1)([3-9]{1})(\/____)$/, '$1$2\\2$4')
        .replace(/^(\d{2}\/)([2-9]{1})(_)(\/____)$/, '$1\\0$2$4')
        .replace(/^(\d{1}\/)(_)(.{2})(\/)(.{4})$/, '$1$2\\_$4\\____')
        .replace(/^(\d{2}\/)(_)(.{1})(\/)(.{4})$/, '$1$2\\_$4\\____')
        .replace(/^(\d{2}\/\d{1})(_)(\/)(.{4})$/, '$1$2$3\\____')
        .replace(/^(\d{2}\/\d{2}\/)(_)(.{3})$/, '$1\\____')
        .replace(/^(\d{2}\/\d{2}\/)(0|1|[3-9]{1})(_)(__)$/, '$1\\20$4')
        .replace(/^(\d{2}\/\d{2}\/\d{1})(_)(.{2})$/, '$1\\___')
        .replace(/^(\d{2}\/\d{2}\/\d{2})(_)(.)$/, '$1$2\\_')
        .replace(/^(\d{2}\/)(\d{2}\/)(\d{4})$/, '$1$2$3');
}

export default validationDatePickerInputMask;