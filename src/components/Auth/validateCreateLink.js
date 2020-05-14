export default function validateCreateLink(values) {
    let errors = {};

    // description validations
    if (!values.description) {
        errors.description = 'Description Required!';
    } else if (values.description.length < 10) {
        errors.description = 'Description Musut Be At Least 10 Characters!';
    }

    // url validation
    if (!values.url) {
        errors.url = 'URL Required!';
    } else if (!/^(ftp|http|https):\/\/[^ "]+$/.test(values.url)) {
        errors.url = 'URL must be valid!'
    }

    return errors;
}
