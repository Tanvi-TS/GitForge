import { useEffect, useState, useContext } from "react";
import { getIssuesByRepo } from "../api/issue.api";
import { AuthContext } from "../context/AuthContext";

const Issues = ({ repoId }) => {
  const { user } = useContext(AuthContext);
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchIssues = async () => {
      try {
        const res = await getIssuesByRepo(repoId);
        setIssues(res.data || []);
      } catch (err) {
        console.error("Error fetching issues:", err);
      } finally {
        setLoading(false);
      }
    };
    if (repoId) fetchIssues();
  }, [repoId]);

  if (loading) return <div className="p-8 text-center text-gray-500">Loading issues...</div>;

  return (
    <div className="border border-[#d0d7de] rounded-md bg-white overflow-hidden">
      <div className="bg-[#f6f8fa] p-4 border-b border-[#d0d7de] font-semibold text-sm">
        {issues.length} Open Issues
      </div>
      
      {issues.length > 0 ? (
        <div className="divide-y divide-[#d0d7de]">
          {issues.map((issue) => (
            <div key={issue._id} className="p-4 hover:bg-[#f6f8fa] flex gap-3">
              <span className="text-[#3fb950] mt-1 text-lg">⊙</span>
              <div>
                <div className="font-bold text-[#1f2328] hover:text-[#0969da] cursor-pointer">
                  {issue.title}
                </div>
                <div className="text-xs text-[#636c76] mt-1">
                  #{issue._id.slice(-4)} opened by {user?.username}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="p-16 text-center">
          <h3 className="text-lg font-semibold text-[#1f2328]">No open issues</h3>
          <p className="text-[#636c76] text-sm mt-1">This repository is clean! No issues found.</p>
        </div>
      )}
    </div>
  );
};

export default Issues;