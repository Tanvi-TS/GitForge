import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { registerUser } from "../api/auth.api";
import { AuthContext } from "../context/AuthContext";
import Loader from "../components/Loader";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await registerUser(username, email, password);
      login(res.user, res.token);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed. Try a different username.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#f6f8fa] px-4 font-sans">
      {/* GitHub Logo Icon */}
      <div className="mb-6 text-[#1f2328]">
        <svg height="48" viewBox="0 0 16 16" version="1.1" width="48" fill="currentColor">
          <path d="M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82-.64-.18-1.32-.27-2-.27-.68 0-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.45.68 1.31 2.69.94 0 .67.01 1.3.01 1.49 0 .21-.15.45-.55.38A7.995 7.995 0 0 1 0 8c0-4.42 3.58-8 8-8Z"></path>
        </svg>
      </div>

      <h2 className="text-2xl font-medium mb-4 text-[#1f2328]">Join GitForge</h2>
      <p className="text-[#636c76] mb-6 text-sm">Create your account to start hosting code.</p>

      <div className="max-w-[340px] w-full bg-white border border-[#d0d7de] rounded-md p-6 shadow-sm">
        {error && (
          <div className="bg-[#ffebe9] border border-[#ff818266] text-[#1f2328] text-sm px-4 py-2 rounded-md mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-normal text-[#1f2328] mb-2">
              Username
            </label>
            <input
              type="text"
              placeholder="Enter Username"
              className="w-full border border-[#d0d7de] p-2 rounded-md bg-[#f6f8fa] focus:bg-white focus:border-[#0969da] focus:ring-2 focus:ring-[#0969da22] outline-none transition-all text-sm"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-normal text-[#1f2328] mb-2">
              Email address
            </label>
            <input
              type="email"
              placeholder="Enter email"
              className="w-full border border-[#d0d7de] p-2 rounded-md bg-[#f6f8fa] focus:bg-white focus:border-[#0969da] focus:ring-2 focus:ring-[#0969da22] outline-none transition-all text-sm"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-normal text-[#1f2328] mb-2">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter password"
              className="w-full border border-[#d0d7de] p-2 rounded-md bg-[#f6f8fa] focus:bg-white focus:border-[#0969da] focus:ring-2 focus:ring-[#0969da22] outline-none transition-all text-sm"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <p className="text-[11px] text-[#636c76] mt-2">
              Make sure it's at least 8 characters including a number and a lowercase letter.
            </p>
          </div>

          <button
            type="submit"
            className="w-full bg-[#2da44e] text-white font-semibold py-2 rounded-md hover:bg-[#2c974b] shadow-sm transition-colors mt-2"
          >
            Create account
          </button>
        </form>
      </div>

      <div className="max-w-[340px] w-full mt-4 border border-[#d0d7de] rounded-md p-4 text-center mb-4">
        <p className="text-sm text-[#1f2328]">
          Already have an account?{" "}
          <Link to="/login" className="text-[#0969da] hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;