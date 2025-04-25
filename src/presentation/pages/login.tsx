import LoginForm from "../components/login-form";

const Login = () => {
  return (
    <div className="bg-indigo-50 h-screen flex flex-col items-center justify-center">
      <h1 className="font-light  text-4xl mb-10">Portwise</h1>
      <LoginForm />
    </div>
  );
};

export default Login;
