import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { TextField, Button } from "@mui/material";
import css from "./AuthForm.module.css";

// Define the validation schema using Yup
const AuthFormSchema = Yup.object().shape({
  name: Yup.string().when("isRegister", {
    is: true,
    then: Yup.string().required("Name is required"),
  }),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(6, "Password too short")
    .required("Password is required"),
});

export default function AuthForm({
  onSubmit,
  initialValues,
  buttonText,
  isRegister,
}) {
  const dispatch = useDispatch();

  // Handle form submission
  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const resultAction = await dispatch(onSubmit(values));

      if (onSubmit.fulfilled.match(resultAction)) {
        console.log("Action successful:", resultAction.payload);
        if (isRegister) {
          const token = resultAction.payload.token;
          localStorage.setItem("token", token);
        }
        toast.success("Action successful.");
      } else {
        if (resultAction.payload) {
          console.error("Error:", resultAction.payload);
          toast.error(`Error: ${resultAction.payload}`);
        } else {
          console.error("Error:", resultAction.error.message);
          toast.error(`Error: ${resultAction.error.message}`);
        }
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error(`Error: ${error.message}`);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={AuthFormSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting, handleChange, values, errors, touched }) => (
        <Form>
          {isRegister && (
            <div>
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
          )}
          <div>
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
          <div>
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
            {buttonText}
          </Button>
        </Form>
      )}
    </Formik>
  );
}
