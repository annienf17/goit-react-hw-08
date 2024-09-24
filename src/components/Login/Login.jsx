import { useDispatch } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { login } from "../../redux/auth/operations";
import css from "./Login.module.css";
import { TextField, Button } from "@mui/material";

const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(6, "Password too short")
    .required("Password is required"),
});

const Login = () => {
  const dispatch = useDispatch();

  const handleLogin = (values, { setSubmitting }) => {
    dispatch(login(values)).finally(() => setSubmitting(false));
  };

  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      validationSchema={LoginSchema}
      onSubmit={handleLogin}
    >
      {({ isSubmitting, handleChange, values, errors, touched }) => (
        <Form className={css.form}>
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
            Login
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default Login;
