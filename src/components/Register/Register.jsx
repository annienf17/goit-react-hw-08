import { useDispatch } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { register } from "../../redux/auth/operations";
import css from "./Register.module.css";
import { useState } from "react";

const RegisterSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(6, "Password too short")
    .required("Password is required"),
});

const Register = () => {
  const dispatch = useDispatch();
  const [error, setError] = useState(null);

  const handleRegister = async (values, { setSubmitting }) => {
    try {
      const resultAction = await dispatch(register(values));
      if (register.fulfilled.match(resultAction)) {
        const token = resultAction.payload.token;
        localStorage.setItem("token", token);
      } else {
        setError(resultAction.payload);
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={{ name: "", email: "", password: "" }}
      validationSchema={RegisterSchema}
      onSubmit={handleRegister}
    >
      {({ isSubmitting }) => (
        <Form className={css.form}>
          <div className={css.formGroup}>
            <label>Name</label>
            <Field type="text" name="name" />
            <ErrorMessage name="name" component="div" />
          </div>
          <div className={css.formGroup}>
            <label>Email</label>
            <Field type="email" name="email" />
            <ErrorMessage name="email" component="div" />
          </div>
          <div className={css.formGroup}>
            <label>Password</label>
            <Field type="password" name="password" />
            <ErrorMessage name="password" component="div" />
          </div>
          <button type="submit" disabled={isSubmitting}>
            Register
          </button>
          {error && <div className={css.error}>{error.message}</div>}
        </Form>
      )}
    </Formik>
  );
};

export default Register;
