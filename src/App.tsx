import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/navBar";
import HomePage from "./pages/home";
import CreateUserPage from "./pages/createUser";
import EditUserPage from "./pages/updateUser";
import UserDetailsPage from "./pages/userDetails";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route
          path="/create"
          element={<ProtectedRoute><CreateUserPage /></ProtectedRoute>}
        />

        <Route
          path="/edit/:id"
          element={<ProtectedRoute><EditUserPage /></ProtectedRoute>}
        />

        <Route
          path="/users/:id"
          element={<ProtectedRoute><UserDetailsPage /></ProtectedRoute>}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;