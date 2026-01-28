import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createRepo } from "../api/repo.api";
import Navbar from "../components/Navbar";

const CreateRepo = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await createRepo(name, description);
      // After success, go back to dashboard to see the new repo
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create repository.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans">
      <Navbar />
      
      <main className="max-w-[768px] mx-auto w-full p-8 mt-4">
        <div className="border-b border-[#d0d7de] pb-4 mb-8">
          <h1 className="text-2xl font-semibold text-[#1f2328]">Create a new repository</h1>
          <p className="text-[#636c76] mt-1">
            A repository contains all project files, including the revision history.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="bg-[#ffebe9] border border-[#ff818266] text-[#1f2328] text-sm p-3 rounded-md">
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm font-semibold text-[#1f2328] mb-2">
              Repository name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              className="w-[300px] border border-[#d0d7de] p-2 rounded-md bg-[#f6f8fa] focus:bg-white focus:border-[#0969da] focus:ring-2 focus:ring-[#0969da22] outline-none transition-all text-sm"
              placeholder="my-awesome-project"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <p className="text-xs text-[#636c76] mt-2">
              Great repository names are short and memorable.
            </p>
          </div>

          <div>
            <label className="block text-sm font-semibold text-[#1f2328] mb-2">
              Description <span className="text-[#636c76] font-normal">(optional)</span>
            </label>
            <input
              type="text"
              className="w-full border border-[#d0d7de] p-2 rounded-md bg-[#f6f8fa] focus:bg-white focus:border-[#0969da] focus:ring-2 focus:ring-[#0969da22] outline-none transition-all text-sm"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <hr className="border-[#d0d7de]" />

          <button
            type="submit"
            disabled={loading}
            className={`bg-[#2da44e] hover:bg-[#2c974b] text-white px-5 py-2 rounded-md text-sm font-semibold shadow-sm transition-all ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Creating..." : "Create repository"}
          </button>
        </form>
      </main>
    </div>
  );
};

export default CreateRepo;