import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = ({ title }) => {
  const { logout } = useAuth();
   const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login"); // ✅ redirect after logout
  };
  return (
    <div className="h-14 bg-white shadow flex items-center px-4 justify-between">
      <h1 className="font-semibold">{title}</h1>
      <button
        className="bg-red-500 text-white px-3 py-1 rounded"
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  );
};

export default Navbar;
