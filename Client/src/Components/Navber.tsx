import useUserStore from "../Store/UserStore";
import { useNavigate } from "react-router-dom";

function Navber() {
  const navigate = useNavigate();
  const { user, logout } = useUserStore();

  const paths = [
    { id: 1, path: "/home", name: "Home" },
    { id: 2, path: "/expense", name: "Add New Expense" },
    { id: 4, path: "/investment", name: "Add New Investment" },
    { id: 3, path: "/expense-list", name: "Expense List" },
    { id: 5, path: "/investment-list", name: "Investment List" },
  ];

  return (
    <div className="w-64 h-screen bg-gray-900 text-white p-4 flex flex-col">
      <div className="mb-8 border-b border-gray-700 pb-4">
        <h2 className="text-lg font-semibold">{(user as any)?.name}</h2>
        <p className="text-sm text-gray-400">{(user as any)?.email}</p>
      </div>

      <main className="flex flex-col gap-2">
        {paths.map((item) => (
          <button
            key={item.id}
            onClick={() => navigate(item.path)}
            className="w-full text-left px-4 py-3 rounded-lg hover:bg-gray-800 transition"
          >
            {item.name}
          </button>
        ))}
      </main>

      <button 
      onClick={() => logout()}
      className="mt-auto w-full bg-red-600 hover:bg-red-700 py-3 rounded-lg font-medium transition">
        LOG OUT
      </button>
    </div>
  );
}

export default Navber;
