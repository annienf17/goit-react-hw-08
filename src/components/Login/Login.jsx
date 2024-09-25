import { login } from "../../redux/auth/operations";
import AuthForm from "../../components/AuthForm/AuthForm";

const Login = () => {
  return (
    <AuthForm
      onSubmit={login}
      initialValues={{ email: "", password: "" }}
      buttonText="Login"
      isRegister={false}
    />
  );
};

export default Login;
