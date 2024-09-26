import { login } from "../../redux/auth/operations";
import AuthForm from "../../components/AuthForm/AuthForm";
import LoginSchema from "../../validationSchemas/loginSchema";

const Login = () => {
  return (
    <AuthForm
      onSubmit={login}
      initialValues={{ email: "", password: "" }}
      buttonText="Login"
      isRegister={false}
      validationSchema={LoginSchema}
    />
  );
};

export default Login;
