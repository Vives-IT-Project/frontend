import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const navigate = useNavigate();

  const routeToRegister = () => {
    navigate("/register");
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
      <form className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            id="email"
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Enter your email"
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            type="password"
            id="password"
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="••••••••"
          />
        </div>

        <div className="text-right">
          <a href="#" className="text-sm text-indigo-600 hover:underline">
            Forgot password?
          </a>
        </div>

        <div className="flex justify-between gap-4 pt-2">
          <button
            type="button"
            onClick={routeToRegister}
            className="w-full bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded"
          >
            Register
          </button>
          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded"
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
