import { useEffect } from "react";
import useInvestmentStore from "../Store/InvestmentStore";
import { MdDelete } from "react-icons/md";
import { MdOutlineEdit } from "react-icons/md";
import { Toaster } from "react-hot-toast";

function InvestmentList() {
  const {
    total_investment,
    investments,
    getAllInvestment,
    getFilteredInvestment,
  } = useInvestmentStore();

  const investment_list = [
    "All",
    "Today",
    "This Week",
    "This Month",
    "This Year",
  ];

  useEffect(() => {
    getAllInvestment();
  }, []);
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <main className="max-w-5xl mx-auto">
        {/* Filter Section */}
        <aside className="flex flex-row justify-between bg-white rounded-xl shadow-md p-4 mb-6 sm:flex-row gap-3 items-center">
          <select
            onClick={(e) => getFilteredInvestment(e.target.value)}
            className="px-5 py-2 border-2  outline-none rounded-full"
          >
            {investment_list.map((inv) => (
              <option value={inv}>{inv}</option>
            ))}
          </select>

          <div>
            <p>Total Expense Amount : {total_investment}</p>
          </div>
        </aside>

        {/* Expense List */}
        <aside className="space-y-4">
          {investments?.map((exp) => (
            <div
              key={exp.id}
              className="bg-white rounded-xl shadow-md p-5 flex flex-col md:flex-row md:items-center md:justify-between"
            >
              {/* Expense Details */}
              <div className="space-y-2">
                <h2 className="text-xl font-semibold text-green-600">
                  ₹{exp.amount}
                </h2>

                <p className="text-gray-700">
                  <span className="font-medium">Category:</span> {exp.category}
                </p>

                <p className="text-sm text-gray-500">{exp.time_stamp}</p>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 mt-4 md:mt-0">
                <button className="flex items-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg transition">
                  <MdOutlineEdit size={20} />
                  Edit
                </button>

                <button className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition">
                  <MdDelete size={20} />
                  Delete
                </button>
              </div>
            </div>
          ))}
        </aside>
      </main>
      <Toaster />
    </div>
  );
}

export default InvestmentList;
