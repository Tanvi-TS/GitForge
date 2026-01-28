import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Loader from "../components/Loader";
import { getRepos } from "../api/repo.api";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const res = await getRepos();
        setRepos(Array.isArray(res) ? res : res.data || []);
      } catch (err) { console.error(err); } 
      finally { setLoading(false); }
    };
    fetchRepos();
  }, []);

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans antialiased">
      <Navbar />
      
      <div className="flex flex-1">
        <aside className="w-64 bg-[#f6f8fa] border-r border-[#d0d7de] hidden lg:block px-4">
          <Sidebar repos={repos} />
        </aside>

        <main className="flex-1 p-8">
          <div className="max-w-[1012px]">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-[#1f2328]">Recent Activity</h2>
              <Link 
                to="/new" 
                className="bg-[#2da44e] hover:bg-[#2c974b] text-white px-3 py-1.5 rounded-md text-sm font-semibold shadow-sm transition-all"
              >
                New Repository
              </Link>
            </div>

            {loading ? (
              <Loader />
            ) : (
              <div className="space-y-4">
                {repos.map((repo) => (
                  <div key={repo._id} className="p-4 border border-[#d0d7de] rounded-md hover:bg-[#f6f8fa] transition-all">
                    <div className="flex items-start justify-between">
                      <div>
                        <Link to={`/repos/${repo._id}`} className="text-[#0969da] text-lg font-semibold hover:underline">
                          {repo.name}
                        </Link>
                        <p className="text-[#636c76] text-sm mt-1">{repo.description || "Project created successfully."}</p>
                        <div className="flex items-center gap-3 mt-3">
                          <span className="w-3 h-3 rounded-full bg-[#f1e05a]"></span>
                          <span className="text-xs text-[#636c76]">JavaScript</span>
                          <span className="text-xs text-[#636c76]">Updated {new Date(repo.updatedAt).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;