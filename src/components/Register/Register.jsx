import { useDispatch } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { register } from "../../redux/auth/operations";
import css from "./Register.module.css";
import { useState } from "react";
import { TextField, Button } from "@mui/material";

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
      {({ isSubmitting, handleChange, values, errors, touched }) => (
        <Form className={`${css.form} ${css.formContainer}`}>
          <div className={css.formGroup}>
            <TextField
              label="Name"
              name="name"
              value={values.name}
              onChange={handleChange}
              error={touched.name && Boolean(errors.name)}
              helperText={touched.name && errors.name}
              fullWidth
              margin="normal"
              sx={{ backgroundColor: "rgba(255, 255, 255, 0.7)" }}
            />
          </div>
          <div className={css.formGroup}>
            <TextField
              label="Email"
              name="email"
              type="email"
              value={values.email}
              onChange={handleChange}
              error={touched.email && Boolean(errors.email)}
              helperText={touched.email && errors.email}
              fullWidth
              margin="normal"
              sx={{ backgroundColor: "rgba(255, 255, 255, 0.7)" }}
            />
          </div>
          <div className={css.formGroup}>
            <TextField
              label="Password"
              name="password"
              type="password"
              value={values.password}
              onChange={handleChange}
              error={touched.password && Boolean(errors.password)}
              helperText={touched.password && errors.password}
              fullWidth
              margin="normal"
              sx={{ backgroundColor: "rgba(255, 255, 255, 0.7)" }}
            />
          </div>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={isSubmitting}
            fullWidth
          >
            Register
          </Button>
          {error && <div className={css.error}>{error.message}</div>}
        </Form>
      )}
    </Formik>
  );
};

export default Register;
