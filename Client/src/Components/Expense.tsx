import { useState } from "react";
import useUserStore from "../Store/UserStore";
import { expense } from "../Utils/city";
import useExpenseStore from "../Store/ExpenseStore";
import { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function Expense() {
  const navigate = useNavigate();
  const { user } = useUserStore();
  const { createExpense, createExpenseAI } = useExpenseStore();
  const [aiInput, setAIInput] = useState("");

  const [expenseDetails, setExpenseDetails] = useState({
    amount: 0,
    category: "",
    note: "",
    time_stamp: ""
  });

  const handleSubmitAI = async () => {
    await createExpenseAI(aiInput);
  };

  const handleSubmit = async () => {
    await createExpense(expenseDetails);
  };
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome back {(user as any)?.name.split(" ")[0]}
          </h1>
          <p className="text-gray-500 mt-1">
            Manage your daily expenses efficiently
          </p>
        </div>

        <div className="bg-white shadow-md rounded-xl px-6 py-4 mt-4 md:mt-0">
          <button onClick={() => navigate("/expense-list")}>
            View All
          </button>
        </div>
      </div>

      {/* Main Section */}
      <main className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* AI Section */}
        <aside className="bg-white rounded-2xl shadow-md p-6 h-fit">
          <h2 className="text-xl font-semibold mb-2">AI Expense Assistant</h2>

          <p className="text-gray-500 text-sm mb-4">
            Describe your expense naturally.
          </p>

          <input
            value={aiInput}
            onChange={(e) => setAIInput(e.target.value)}
            type="text"
            placeholder="Spent ₹250 on food today..."
            className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-black"
          />

          <button
            onClick={handleSubmitAI}
            className="w-full mt-4 bg-black text-white py-3 rounded-lg font-medium hover:bg-gray-800 transition"
          >
            Submit
          </button>
        </aside>

        {/* Expense Form */}
        <aside className="lg:col-span-2 bg-white rounded-2xl shadow-md p-6">
          <h2 className="text-xl font-semibold mb-6">Add Expense</h2>

          {/* Categories */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-6">
            {expense.map((exp) => (
              <div
                key={exp.id}
                onClick={() =>
                  setExpenseDetails({
                    ...expenseDetails,
                    category: exp.name,
                  })
                }
                className={`cursor-pointer border rounded-xl p-3 flex flex-col items-center justify-center transition-all
              ${
                expenseDetails.category === exp.name
                  ? "border-black bg-gray-100"
                  : "border-gray-200 hover:border-gray-400"
              }`}
              >
                <img
                  src={exp.image}
                  alt={exp.name}
                  className="w-10 h-10 object-contain mb-2"
                />

                <p className="text-sm font-medium text-center">{exp.name}</p>
              </div>
            ))}
          </div>

          {/* Amount */}
          <div className="mb-5">
            <label className="block text-sm font-medium mb-2">Amount</label>

            <input
              type="number"
              placeholder="Enter amount"
              value={expenseDetails.amount}
              onChange={(e) =>
                setExpenseDetails({
                  ...expenseDetails,
                  amount: Number(e.target.value),
                })
              }
              className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          {/* Amount */}
          <div className="mb-5">
            <label className="block text-sm font-medium mb-2">Date</label>

            <input
              type="date"
              placeholder="Enter date..."
              value={expenseDetails.time_stamp}
              onChange={(e) =>
                setExpenseDetails({
                  ...expenseDetails,
                  time_stamp: e.target.value,
                })
              }
              className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          {/* Date */}
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">Note</label>

            <textarea
              rows={4}
              placeholder="Write a short note..."
              value={expenseDetails.note}
              onChange={(e) =>
                setExpenseDetails({
                  ...expenseDetails,
                  note: e.target.value,
                })
              }
              className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none resize-none focus:ring-2 focus:ring-black"
            />
          </div>

          {/* Submit */}
          <button
            onClick={handleSubmit}
            className="w-full bg-green-600 text-white py-3 rounded-lg font-medium hover:bg-green-700 transition"
          >
            Save Expense
          </button>
        </aside>
      </main>
      <Toaster />
    </div>
  );
}

export default Expense;
