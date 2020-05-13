import React from "react";
import useFormValidation from "./useFormValidation";
import validateLogin from './validateLogin';

const INITIAL_STATE = {
  name: "",
  email: "",
  password: "",
};

function Login(props) {
  const {  handleChange, handleBlur, handleSubmit, values, errors, isSubmitting } = useFormValidation(
    INITIAL_STATE,
    validateLogin
  );
  const [login, setLogin] = React.useState(true);

  return (
    <div>
      <h2 className="mv3">{login ? "Login" : "Create Account"}</h2>
      <form className="flex flex-column" onSubmit={(e) => handleSubmit(e)}>
        {!login && (
          <input
            type="text"
            placeholder="Your Name"
            autoComplete="off"
            onChange={handleChange}
            name="name"
            value={values.name}
          />
        )}
        <input
          type="email"
          placeholder="Your Email"
          autoComplete="off"
          className={errors.email && 'error-input'}
          onChange={handleChange}
          onBlur={handleBlur}
          name="email"
          value={values.email}
        />
        {
          errors.email && <p className='error-text'>{errors.email}</p>
        }
        <input
          type="Password"
          placeholder="Choose a Secure Password"
          className={errors.password && 'error-password'}
          onChange={handleChange}
          onBlur={handleBlur}
          name="password"
          value={values.password}
        />
        {
          errors.password && <p className='error-text'>{errors.password}</p>
        }
        <div className="flex mt3">
          <button 
            type="submit" 
            className="button pointer mr2"
            disabled={isSubmitting}
            style={{ background: isSubmitting ? 'grey' : 'orange' }}
          >
            SUBMIT
          </button>
          <button
            type="button"
            className="button pointer"
            onClick={() => setLogin((prev) => !prev)}
          >
            {login ? "Need to Create An Account?" : "Already Have An Account?"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login;
