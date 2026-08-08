import { useEffect, useState } from 'react'
import useUserStore from '../Store/UserStore'
import { PieChart, Pie, Tooltip, Legend, ResponsiveContainer, Cell } from "recharts";
import Modal from 'react-modal';
import { citys } from '../Utils/city';
import { Toaster } from 'react-hot-toast';

function Home() {
  const [modalIsOpen, setIsOpen] = useState(false);
  const { user, basic_info, basic_information, userUpdate } = useUserStore();
  const [userDetails, setUserDetails] = useState({
    name: user?.name || '',
    email: user?.email || '',
    city: user?.city || '',
    salary: user?.salary || 0
  })

  const COLORS = [
    '#3B82F6',
    '#EF4444',
    '#10B981',
    '#F59E0B',
    '#8B5CF6'
  ];

  const basic_info_structure = {
    total: [
      {
        id: 1,
        name: "Total Investment",
        value: basic_info?.total?.total_investment
      },
      {
        id: 2,
        name: "Total Expense",
        value: basic_info?.total?.total_expense
      }
    ],
    today_report: [
      {
        id: 1,
        name: "Today's Investment",
        value: basic_info?.today_report?.investment
      },
      {
        id: 2,
        name: "Today's Expense",
        value: basic_info?.today_report?.expense
      }
    ],
    monthly_report: [
      {
        id: 1,
        name: "Monthly Investment",
        value: basic_info?.monthly_report?.investment
      },
      {
        id: 2,
        name: "Monthly Expense",
        value: basic_info?.monthly_report?.expense
      }
    ]
  }

  const fetch_data = async () => {
    await basic_information();
  };

  const chartData =
    basic_info?.top_expense_report?.map((item: any) => ({
      category: item.category,
      total: Number(item.total)
    })) || [];

  const handleUpdateUserDetails = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await userUpdate(userDetails);
  }

  useEffect(() => {
    fetch_data();
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {user && basic_info && (
        <div className="max-w-7xl mx-auto space-y-6">

          <header className="bg-white rounded-xl p-6 shadow">
            <h1 className="text-3xl font-bold">
              Welcome back, {(user as any).name.split(" ")[0]} 👋
            </h1>

            <div className="mt-3 text-gray-600 space-y-1">
              <p>{(user as any).city}</p>
              <p>{(user as any).email}</p>
              <p>Salary: ₹{(user as any).salary}</p>
            </div>

            <button
              onClick={() => setIsOpen(true)}
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
              Edit Profile
            </button>
          </header>

          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

            {basic_info_structure.total.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-xl shadow p-5"
              >
                <h2 className="text-sm text-gray-500">
                  {item.name}
                </h2>

                <p className="text-2xl font-bold mt-2">
                  ₹{item.value || 0}
                </p>
              </div>
            ))}

            {basic_info_structure.today_report.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-xl shadow p-5"
              >
                <h2 className="text-sm text-gray-500">
                  {item.name}
                </h2>

                <p className="text-2xl font-bold mt-2">
                  ₹{item.value || 0}
                </p>
              </div>
            ))}

            {basic_info_structure.monthly_report.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-xl shadow p-5"
              >
                <h2 className="text-sm text-gray-500">
                  {item.name}
                </h2>

                <p className="text-2xl font-bold mt-2">
                  ₹{item.value || 0}
                </p>
              </div>
            ))}
          </section>

          <section className="grid lg:grid-cols-2 gap-6">

            <div className="bg-white rounded-xl shadow p-5">
              <h2 className="text-lg font-semibold mb-4">
                Expense Categories
              </h2>

              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={chartData}
                      dataKey="total"
                      nameKey="category"
                      outerRadius={110}
                    >
                      {chartData.map((_: any, index: number) => (
                        <Cell
                          key={index}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>

                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow p-5">
              <h2 className="text-lg font-semibold mb-4">
                Last Transactions
              </h2>

              <div className="space-y-3">
                {basic_info?.last_transaction?.map(
                  (transaction: any) => (
                    <div
                      key={transaction.id}
                      className="border rounded-lg p-4"
                    >
                      <div className="flex justify-between">
                        <h3 className="font-semibold">
                          {transaction.category}
                        </h3>

                        <span className="font-bold">
                          ₹{transaction.amount}
                        </span>
                      </div>

                      <p className="text-sm text-gray-500">
                        {transaction.time_stamp}
                      </p>

                      <p className="text-sm mt-1">
                        {transaction.description}
                      </p>
                    </div>
                  )
                )}
              </div>
            </div>

          </section>


          <Modal
            isOpen={modalIsOpen}
            onAfterOpen={() => setIsOpen(true)}
            onRequestClose={() => setIsOpen(false)}
            /* Pass Tailwind classes directly via className and overlayClassName */
            className="relative w-full max-w-lg p-6 bg-white rounded-xl shadow-2xl border border-gray-100 outline-none transform transition-all mx-auto my-auto"
            overlayClassName="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
            contentLabel="Update User Details Modal"
          >
            {/* Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 hover:bg-gray-100 p-1.5 rounded-lg transition-colors text-sm font-medium"
            >
              ✕ Close
            </button>

            {/* Modal Header */}
            <h2 className="text-xl font-bold text-gray-800 mb-6">
              Update User Details
            </h2>

            {/* Form */}
            <form className="space-y-4" onSubmit={handleUpdateUserDetails}>
              {/* Name Input */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="name" className="text-sm font-semibold text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={userDetails.name}
                  onChange={(e) => setUserDetails({ ...userDetails, name: e.target.value })}
                  className="w-full px-3.5 py-2 text-gray-800 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white outline-none transition-all text-sm"
                  placeholder="Enter name"
                />
              </div>

              {/* Email Input */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="email" className="text-sm font-semibold text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={userDetails.email}
                  onChange={(e) => setUserDetails({ ...userDetails, email: e.target.value })}
                  className="w-full px-3.5 py-2 text-gray-800 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white outline-none transition-all text-sm"
                  placeholder="Enter email"
                />
              </div>

              {/* City Select */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="city" className="text-sm font-semibold text-gray-700">
                  City
                </label>
                <select
                  id="city"
                  value={userDetails.city}
                  onChange={(e) => setUserDetails({ ...userDetails, city: e.target.value })}
                  className="w-full px-3.5 py-2 text-gray-800 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white outline-none transition-all text-sm cursor-pointer"
                >
                  {citys.map((city, index) => (
                    <option key={index} value={city}>
                      {city}
                    </option>
                  ))}
                </select>
              </div>

              {/* Salary Input */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="salary" className="text-sm font-semibold text-gray-700">
                  Salary
                </label>
                <input
                  type="number"
                  id="salary"
                  value={userDetails.salary}
                  onChange={(e) => setUserDetails({ ...userDetails, salary: Number(e.target.value) })}
                  className="w-full px-3.5 py-2 text-gray-800 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white outline-none transition-all text-sm"
                  placeholder="Enter salary"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full mt-2 py-2.5 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm rounded-lg shadow-sm transition-colors focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 outline-none"
              >
                Save Changes
              </button>
            </form>
          </Modal>
          <Toaster />
        </div>
      )}
    </div>
  )
}

export default Home