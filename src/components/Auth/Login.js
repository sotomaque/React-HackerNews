import React from "react";
import useFormValidation from "./useFormValidation";

const INITIAL_STATE = {
  name: "",
  email: "",
  password: "",
};

function Login(props) {
  const { handleChange, handleSubmit, values } = useFormValidation(
    INITIAL_STATE
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
            onChange={(e) => handleChange(e)}
            name="name"
            value={values.name}
          />
        )}
        <input
          type="email"
          placeholder="Your Email"
          autoComplete="off"
          onChange={(e) => handleChange(e)}
          name="email"
          value={values.email}
        />
        <input
          type="Password"
          placeholder="Choose a Secure Password"
          onChange={(e) => handleChange(e)}
          name="password"
          value={values.password}
        />

        <div className="flex mt3">
          <button type="submit" className="button pointer mr2">
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
