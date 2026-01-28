import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <div className="flex flex-col min-h-screen bg-[#0d1117] font-sans text-white overflow-hidden">
      {/* Navbar Placeholder */}
      <nav className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto w-full">
        <div className="flex items-center gap-2">
          <svg height="32" viewBox="0 0 16 16" version="1.1" width="32" fill="currentColor" className="text-white">
            <path d="M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82-.64-.18-1.32-.27-2-.27-.68 0-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.45.68 1.31 2.69.94 0 .67.01 1.3.01 1.49 0 .21-.15.45-.55.38A7.995 7.995 0 0 1 0 8c0-4.42 3.58-8 8-8Z"></path>
          </svg>
          <span className="text-xl font-bold tracking-tight">GitForge</span>
        </div>
        <div className="flex gap-4">
          <Link to="/login" className="text-sm font-semibold hover:text-gray-400 transition">Sign in</Link>
          <Link to="/register" className="text-sm font-semibold border border-gray-500 px-3 py-1 rounded-md hover:border-white transition">Sign up</Link>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center relative px-6">
        {/* Decorative Background Glow */}
        <div className="absolute top-[-10%] left-[50%] translate-x-[-50%] w-[600px] h-[600px] bg-blue-600/20 rounded-full blur-[120px] pointer-events-none"></div>

        <div className="max-w-4xl w-full text-center relative z-10">
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight leading-tight">
            Build and host software <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
              all in one place.
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-[#8b949e] mb-10 max-w-2xl mx-auto">
            GitForge is the world's most lightweight developer platform. 
            Manage repositories, track issues, and collaborate on code with ease.
          </p>

          <div className="flex flex-col md:flex-row justify-center gap-4">
            <Link
              to="/register"
              className="bg-[#2da44e] text-white text-lg font-bold px-8 py-4 rounded-md hover:bg-[#2c974b] transition-all shadow-lg hover:scale-105"
            >
              Sign up for GitForge
            </Link>
            <Link
              to="/login"
              className="bg-transparent border border-[#30363d] text-white text-lg font-bold px-8 py-4 rounded-md hover:border-[#8b949e] transition-all"
            >
              Sign in to your account
            </Link>
          </div>
        </div>

        {/* Feature Teaser */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl w-full text-left border-t border-[#30363d] pt-12">
          <div>
            <h3 className="text-blue-400 font-bold mb-2">Repositories</h3>
            <p className="text-sm text-[#8b949e]">Host your code securely and manage versions with ease using our Git-integrated backend.</p>
          </div>
          <div>
            <h3 className="text-purple-400 font-bold mb-2">Issue Tracking</h3>
            <p className="text-sm text-[#8b949e]">Stay organized. Track bugs, features, and tasks with our simple issue management system.</p>
          </div>
          <div>
            <h3 className="text-green-400 font-bold mb-2">Commit History</h3>
            <p className="text-sm text-[#8b949e]">Visualize your progress. Detailed commit logs and history for every project you build.</p>
          </div>
        </div>
      </main>

      <footer className="py-10 text-center text-[#484f58] text-xs">
        © 2026 GitForge, Inc. Created with ❤️ for developers.
      </footer>
    </div>
  );
};

export default Landing;
