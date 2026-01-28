import React from "react";

const CodeView = ({ repo, username }) => {
  return (
    <>
      {/* File Explorer Section */}
      <div className="border border-[#d0d7de] rounded-md overflow-hidden bg-white">
        <div className="bg-[#f6f8fa] p-3 border-b border-[#d0d7de] flex items-center justify-between text-sm">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-slate-200 border border-[#d0d7de] flex items-center justify-center text-[10px] font-bold text-[#1f2328]">
              {username.charAt(0).toUpperCase()}
            </div>{" "}
            <span className="font-semibold">{username}</span>
            <span className="text-[#636c76]">Initial repository setup</span>
          </div>
          <span className="text-xs text-[#636c76]">now</span>
        </div>

        <div className="divide-y divide-[#d0d7de]">
          <FileRow
            name="src"
            message="Initial structure"
            time="2 days ago"
            isFolder
          />
          <FileRow name="README.md" message="Update description" time="now" />
          <FileRow
            name="package.json"
            message="Add dependencies"
            time="2 days ago"
          />
        </div>
      </div>

      {/* README Section */}
      <div className="mt-8 border border-[#d0d7de] rounded-md overflow-hidden bg-white">
        <div className="bg-[#f6f8fa] border-b border-[#d0d7de] p-3">
          <span className="text-xs text-[#636c76]">README.md</span>
        </div>
        <div className="p-8">
          <h1 className="text-3xl font-bold mb-4 border-b border-[#d0d7de] pb-2">
            {repo.name}
          </h1>
          <p className="text-[#1f2328] leading-relaxed">
            {repo.description || "No description provided."}
          </p>
        </div>
      </div>
    </>
  );
};

// Helper for rows
const FileRow = ({ name, message, time, isFolder }) => (
  <div className="flex items-center justify-between p-2 hover:bg-[#f6f8fa] text-sm px-4 group">
    <div className="flex items-center gap-2 flex-1">
      <span className="text-[#636c76]">{isFolder ? "📁" : "📄"}</span>
      <span className="text-[#0969da] hover:underline cursor-pointer font-medium">
        {name}
      </span>
    </div>
    <span className="flex-1 text-[#636c76] truncate group-hover:text-[#1f2328]">
      {message}
    </span>
    <span className="w-24 text-right text-[#636c76]">{time}</span>
  </div>
);

export default CodeView;
