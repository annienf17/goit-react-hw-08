import { register } from "../../redux/auth/operations";
import AuthForm from "../../components/AuthForm/AuthForm";

const Register = () => {
  return (
    <AuthForm
      onSubmit={register}
      initialValues={{ name: "", email: "", password: "" }}
      buttonText="Register"
      isRegister={true}
    />
  );
};

export default Register;
