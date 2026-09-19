import useUserStore from "../Store/UserStore";
import { useNavigate } from "react-router-dom";

function Navber() {
  const navigate = useNavigate();
  const { user, logout } = useUserStore();

  const paths = [
    { id: 1, path: "/home", name: "Home", icon: "⌂" },
    { id: 2, path: "/expense", name: "Expense", icon: "＋" },
    { id: 4, path: "/investment", name: "Investment", icon: "₹" },
    { id: 3, path: "/expense-list", name: "Expenses", icon: "☷" },
    { id: 5, path: "/investment-list", name: "Investments", icon: "▤" },
  ];

  const logout_func = async () => {
    const response = await logout();

    if (response) {
      navigate("/");
    }
  };

  return (
    <>
      {/* ================= DESKTOP / TABLET SIDEBAR ================= */}
      <div className="hidden md:flex w-64 h-screen bg-gray-900 text-white p-4 flex-col">
        
        {/* User Information */}
        <div className="mb-8 border-b border-gray-700 pb-4">
          <h2 className="text-lg font-semibold">
            {(user as any)?.name}
          </h2>

          <p className="text-sm text-gray-400">
            {(user as any)?.email}
          </p>
        </div>

        {/* Navigation */}
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

        {/* Logout */}
        <button
          onClick={logout_func}
          className="mt-auto w-full bg-red-600 hover:bg-red-700 py-3 rounded-lg font-medium transition"
        >
          LOG OUT
        </button>
      </div>


      {/* ================= MOBILE BOTTOM NAVBAR ================= */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-gray-900 text-white border-t border-gray-700">
        
        <div className="flex items-center justify-around px-1 py-2">
          
          {paths.map((item) => (
            <button
              key={item.id}
              onClick={() => navigate(item.path)}
              className="flex flex-col items-center justify-center gap-1 px-2 py-1 rounded-lg hover:bg-gray-800 transition min-w-0"
            >
              <span className="text-xl">
                {item.icon}
              </span>

              <span className="text-[10px] truncate max-w-16.25">
                {item.name}
              </span>
            </button>
          ))}

          {/* Logout */}
          <button
            onClick={logout_func}
            className="flex flex-col items-center justify-center gap-1 px-2 py-1 rounded-lg hover:bg-red-700 transition"
          >
            <span className="text-xl">⇥</span>

            <span className="text-[10px]">
              Logout
            </span>
          </button>

        </div>
      </div>
    </>
  );
}

export default Navber;