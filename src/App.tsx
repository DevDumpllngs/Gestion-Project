import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Dashboard from "./components/Dashboard";
import Transactions from "./pages/Transactions";
import Cards from "./pages/Cards";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Payments from "./pages/Payments";
import Support from "./pages/Support";
import Settings from "./pages/Settings";
import { useState, useEffect } from "react";
import useDisableScroll from "./hooks/useDisableScroll";

const App = () => {
  useDisableScroll();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const authStatus = sessionStorage.getItem("isLoggedIn");
    setIsAuthenticated(authStatus === "true");
  }, []);

  const handleLogin = () => {
    sessionStorage.setItem("isLoggedIn", "true");
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    sessionStorage.removeItem("isLoggedIn");
    setIsAuthenticated(false);
  };

  // Componente protegido que verifica autenticación
  const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    if (!isAuthenticated) {
      return <Navigate to="/login" replace />;
    }
    return <>{children}</>;
  };

  return (
      <Router>
        <div className="flex">
          {isAuthenticated && <Sidebar onLogout={handleLogout} />}
          <div className="flex-1 p-6">
            <Routes>
              <Route 
                path="/login" 
                element={
                  isAuthenticated ? 
                  <Navigate to="/" replace /> : 
                  <Login onLogin={handleLogin} />
                } 
              />
              <Route
                path="/"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/transactions"
                element={
                  <ProtectedRoute>
                    <Transactions />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/cards"
                element={
                  <ProtectedRoute>
                    <Cards />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/payments"
                element={
                  <ProtectedRoute>
                    <Payments />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/support"
                element={
                  <ProtectedRoute>
                    <Support />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/settings"
                element={
                  <ProtectedRoute>
                    <Settings />
                  </ProtectedRoute>
                }
              />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </div>
        </div>
      </Router>
  );
};

export default App;
