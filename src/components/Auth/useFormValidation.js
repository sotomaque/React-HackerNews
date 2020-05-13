import React from "react";

function useFormValidation(initalState, validate) {
    const [values, setValues] = React.useState(initalState);
    const [errors, setErrors] = React.useState({});
    const [isSubmitting, setSubmitting] = React.useState(false);

    React.useEffect(() => {
        if (isSubmitting) {
            const noErrors = Object.keys(errors).length === 0;

            if (noErrors) {
                console.log('authenticating users')
                setSubmitting(false)
            } else {
                setSubmitting(false)
            }
        }
    }, [errors])

    function handleChange(event) {
        event.persist();

        setValues(prev => ({
            ...prev,
            [event.target.name]: event.target.value
        }));
    }

    function handleBlur() {
        const validationErrors = validate(values);
        setErrors(validationErrors);
    }

    function handleSubmit(event) {
        event.preventDefault();
        const validationErrors = validate(values);
        setErrors(validationErrors);
        setSubmitting(true);
        console.log({ values })
    }

    return { handleChange, handleBlur, handleSubmit, values, errors, isSubmitting }
}

export default useFormValidation;
