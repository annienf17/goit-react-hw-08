import { register } from "../../redux/auth/operations";
import AuthForm from "../../components/AuthForm/AuthForm";
import RegisterSchema from "../../validationSchemas/registerSchema";

const Register = () => {
  return (
    <AuthForm
      onSubmit={register}
      initialValues={{ name: "", email: "", password: "" }}
      buttonText="Register"
      isRegister={true}
      validationSchema={RegisterSchema}
    />
  );
};

export default Register;
