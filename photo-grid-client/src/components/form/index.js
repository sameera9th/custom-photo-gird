import React, { useState, useEffect } from "react";
import { ACTIONS } from "../../utils/constants";

export const Form = ({ submit, fetching, error }) => {
  const [form, setForm] = useState({
    email: "",
    password: "",
    action: ACTIONS.SIGNIN,
  });

  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmitting) {
      submit(form);
    }
  }, [formErrors]);

  const onSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(form));
    setIsSubmitting(true);
  };

  const validate = (values) => {
    let errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!values.email) {
      errors.email = "Cannot be blank";
    } else if (!regex.test(values.email)) {
      errors.email = "Invalid email format";
    }
    if (!values.password) {
      errors.password = "Cannot be blank";
    } else if (values.password.length < 4) {
      errors.password = "Password must be more than 4 characters";
    }
    return errors;
  };

  return (
    <form onSubmit={onSubmit}>
      <p className="font-weight-bold text-warning">
        In Order to create your own photo album you have to either signup or
        sign in.
      </p>
      {error && <div className="alert alert-danger" role="alert">
        {error}
      </div>}
      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          className={
            formErrors.email ? "form-control is-invalid" : "form-control"
          }
          placeholder="name@example.com"
          value={form.email}
          onChange={handleInputChange}
        />
        {formErrors.email && (
          <span className="text-danger">{formErrors.email}</span>
        )}
      </div>
      <div className="form-group">
        <label htmlFor="name">Password</label>
        <input
          className={
            formErrors.password ? "form-control is-invalid" : "form-control"
          }
          name="password"
          type="password"
          value={form.password}
          onChange={handleInputChange}
        />
        {formErrors.password && (
          <span className="text-danger">{formErrors.password}</span>
        )}
      </div>
      <div className="form-group">
        <div className="spinner-border" role="status">
          <span className="sr-only">Loading...</span>
        </div>
        <p className="font-weight-bold">
          {form.action === ACTIONS.SIGNUP
            ? "Already have an account?"
            : "Don't have an account?"}
          <button
            type="button"
            className="btn btn-link"
            onClick={() =>
              setForm({
                ...form,
                action:
                  form.action === ACTIONS.SIGNIN
                    ? ACTIONS.SIGNUP
                    : ACTIONS.SIGNIN,
              })
            }
          >
            {form.action === ACTIONS.SIGNIN ? "Sign Up" : "Sign In"}
          </button>
        </p>
      </div>
      <div className="form-group">
        <button className="form-control btn btn-primary" disabled={fetching}>
          {fetching ? 'Loading...' : form.action === ACTIONS.SIGNIN ? "Sign In" : "Sign Up"}
        </button>
      </div>
    </form>
  );
};
export default Form;
