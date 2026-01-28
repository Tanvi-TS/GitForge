import { useEffect, useState, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { getRepos } from "../api/repo.api";
import { AuthContext } from "../context/AuthContext";
import Navbar from "../components/Navbar";
import Loader from "../components/Loader";
import Issues from "../components/Issues";
import CodeView from "../components/CodeView";

const RepoDetail = () => {
  const { repoId } = useParams();
  const { user } = useContext(AuthContext);
  const [repo, setRepo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("code");

  useEffect(() => {
    const fetchRepo = async () => {
      try {
        const res = await getRepos();
        const foundRepo = res.data?.find((r) => r._id === repoId);
        if (foundRepo) setRepo(foundRepo);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchRepo();
  }, [repoId]);

  if (loading) return <Loader />;
  if (!repo)
    return <div className="text-center mt-20">Repository not found</div>;

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <header className="bg-[#f6f8fa] border-b border-[#d0d7de] pt-4 px-8">
        <div className="max-w-[1280px] mx-auto">
          <div className="flex items-center gap-2 mb-4 text-xl">
            <Link to="/dashboard" className="text-[#0969da] hover:underline">
              {user?.username}
            </Link>
            <span className="text-[#636c76]">/</span>
            <span className="font-bold">{repo.name}</span>
          </div>

          <nav className="flex gap-4">
            <button
              onClick={() => setActiveTab("code")}
              className={`px-4 py-2 text-sm font-semibold transition-all ${activeTab === "code" ? "border-b-2 border-[#fd8c73] text-[#1f2328]" : "text-[#636c76]"}`}
            >
              Code
            </button>
            <button
              onClick={() => setActiveTab("issues")}
              className={`px-4 py-2 text-sm font-semibold transition-all ${activeTab === "issues" ? "border-b-2 border-[#fd8c73] text-[#1f2328]" : "text-[#636c76]"}`}
            >
              Issues
            </button>
            <button className="px-4 py-2 text-sm text-[#636c76] hover:bg-[#ebf0f4] rounded-t-md">
              Pull requests
            </button>
            <button className="px-4 py-2 text-sm text-[#636c76] hover:bg-[#ebf0f4] rounded-t-md">
              Actions
            </button>
          </nav>
        </div>
      </header>

      <main className="max-w-[1280px] mx-auto p-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            {/* SUPER CLEAN: Just swap the two components */}
            {activeTab === "code" ? (
              <CodeView repo={repo} username={user?.username} />
            ) : (
              <Issues repoId={repoId} />
            )}
          </div>

          <div className="lg:col-span-1">
            <h3 className="font-semibold text-[#1f2328] mb-2">About</h3>
            <p className="text-sm text-[#636c76]">
              {repo.description || "No description provided."}
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default RepoDetail;
