import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./routes/ProtectedRoute";

// Pages
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import CreateRepo from "./pages/CreateRepo";
import RepoDetail from "./pages/RepoDetail";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/new"
            element={
              <ProtectedRoute>
                <CreateRepo />
              </ProtectedRoute>
            }
          />

          <Route
            path="/repos/:repoId"
            element={
              <ProtectedRoute>
                <RepoDetail />
              </ProtectedRoute>
            }
          />

          <Route
            path="*"
            element={<h2 className="p-6 text-center mt-10">Page Not Found</h2>}
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
