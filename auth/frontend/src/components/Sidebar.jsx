import { Link } from "react-router-dom";

const Sidebar = ({ links }) => {
  return (
    <div className="w-60 bg-gray-800 text-white min-h-screen p-4">
      <h2 className="text-xl font-bold mb-4">Dashboard</h2>

      {links.map((link, i) => (
        <Link
          key={i}
          to={link.path}
          className="block py-2 px-2 hover:bg-gray-700 rounded"
        >
          {link.name}
        </Link>
      ))}
    </div>
  );
};

export default Sidebar;
