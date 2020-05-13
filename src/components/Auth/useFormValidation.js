import React from "react";

function useFormValidation(initalState) {
    const [values, setValues] = React.useState(initalState);

    function handleChange(event) {
        event.persist();

        setValues(prev => ({
            ...prev,
            [event.target.name]: event.target.value
        }));
    }

    function handleSubmit(event) {
        event.preventDefault();
        console.log({ values })
    }

    return { handleChange, handleSubmit, values }
}

export default useFormValidation;
