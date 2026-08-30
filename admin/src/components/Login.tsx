import axios from "axios";
import { useState, type Dispatch, type FormEvent, type SetStateAction } from "react";
import { backendUrl } from "../App";
import { toast } from "react-toastify";

interface LoginProps {
  setToken: Dispatch<SetStateAction<string>>;
}

const Login = ({ setToken }: LoginProps) => {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");

  const onSubmitHandler = async (e: FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      const res = await axios.post(backendUrl + "/api/user/admin", { emailId, password });
      if (res.data.success) {
        setToken(res.data.token);
        toast.success(res.data.message);
      } else {
        toast.error(res.data.message);
      }
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message);
      } else {
        toast.error("Something went wrong");
      }
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center w-full">
      <div className="bg-white shadow-md rounded-lg px-8 py-6 max-w-md">
        <h1 className="text-2xl font-bold mb-4">Admin Panel</h1>
        <form onSubmit={onSubmitHandler}>
          <div className="mb-3 min-w-72">
            <p className="text-sm font-medium text-gray-700 mb-2">Email Address</p>
            <input
              className="rounded-md   w-full px-3 py-2 border border-gray-300 outline-none"
              type="email"
              placeholder="your@email.com"
              required
              onChange={(e) => setEmailId(e.target.value)}
              value={emailId}
            />
          </div>

          <div className="mb-3 min-w-72">
            <p className="text-sm font-medium text-gray-700 mb-2">Password</p>
            <input
              className="rounded-md   w-full px-3 py-2 border border-gray-300 outline-none"
              type="password"
              placeholder="Enter your password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              required
            />
          </div>

          <button className="mt-2 w-full py-2 px-4 rounded-md text-white bg-black" type="submit">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
