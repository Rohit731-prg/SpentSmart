import { useEffect, useState } from "react";
import useExpenseStore from "../Store/ExpenseStore";
import { MdDelete } from "react-icons/md";
import { MdOutlineEdit } from "react-icons/md";

function ExpenseList() {
  const { expenses, getAllExpense } = useExpenseStore();
  const [filterDate, setFilterDate] = useState("");

  const fetChData = async () => {
    await getAllExpense();
  };

  useEffect(() => {
    fetChData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <main className="max-w-5xl mx-auto">
        {/* Filter Section */}
        <aside className="bg-white rounded-xl shadow-md p-4 mb-6 flex flex-col sm:flex-row gap-3 items-center">
          <input
            type="date"
            value={filterDate}
            onChange={(e) => setFilterDate(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2 w-full sm:w-auto focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition">
            Filter
          </button>
        </aside>

        {/* Expense List */}
        <aside className="space-y-4">
          {expenses?.map((exp) => (
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

                <p className="text-gray-600">
                  <span className="font-medium">Note:</span> {exp.note}
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
    </div>
  );
}

export default ExpenseList;
