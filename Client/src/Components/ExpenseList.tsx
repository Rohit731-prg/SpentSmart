import { useEffect, useState, type ChangeEvent } from "react";
import useExpenseStore from "../Store/ExpenseStore";
import { MdDelete } from "react-icons/md";
import { MdOutlineEdit } from "react-icons/md";
import Modal from 'react-modal';
import { expense } from "../Utils/city";
import { Toaster } from "react-hot-toast";

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

function ExpenseList() {
  const expenseList = [
    "All", "Today", "This Week", "This Month", "This Year"
  ]
  const { total_expense, expenses, getAllExpense, getFilterExpense, deleteExpense, updateExpense } = useExpenseStore();
  const [expenseDetails, setExpenseDetails] = useState({
    id: 0,
    amount: 0,
    category: "",
    note: "",
    time_stamp: ""
  })
  const fetChData = async () => {
    await getAllExpense();
  };

  const updateExpenseFunc = async (data: any) => {
    setIsOpen(!modalIsOpen)
    setExpenseDetails({ ...expenseDetails, ...data });
  };

  const [modalIsOpen, setIsOpen] = useState(false);

  const handleUpdate = async (e: any) => {
    e.preventDefault();
    await updateExpense(expenseDetails)
  }

  useEffect(() => {
    fetChData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <main className="max-w-5xl mx-auto">
        {/* Filter Section */}
        <aside className="flex flex-row justify-between bg-white rounded-xl shadow-md p-4 mb-6 sm:flex-row gap-3 items-center">

          <select
            onChange={(e: ChangeEvent<HTMLSelectElement>) => getFilterExpense(e.target.value)}
            className="px-5 py-2 border-2  outline-none rounded-full">
            {expenseList.map((exp) => (
              <option key={exp} value={exp}>{exp}</option>
            ))}
          </select>

          <div>
            <p>Total Expense Amount : {total_expense}</p>
          </div>
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
              <div
                onClick={() => updateExpenseFunc(exp)}
                className="flex gap-3 mt-4 md:mt-0">
                <button className="flex items-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg transition">
                  <MdOutlineEdit size={20} />
                  Edit
                </button>

                <button onClick={() => deleteExpense(exp.id)}
                  className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition">
                  <MdDelete size={20} />
                  Delete
                </button>
              </div>
            </div>
          ))}
        </aside>
      </main>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setIsOpen(false)}
        style={customStyles}
      >
        <h2 className="text-xl font-bold mb-4">Update Expense</h2>

        <form onSubmit={handleUpdate}>
          <div className="mb-4">
            <label>Amount</label>
            <input
              type="number"
              value={expenseDetails.amount}
              onChange={(e) =>
                setExpenseDetails({
                  ...expenseDetails,
                  amount: Number(e.target.value),
                })
              }
              className="border p-2 w-full"
            />
          </div>

          <div className="mb-4">
            <label>Category</label>
            <select
              className="border p-2 w-full"
              value={expenseDetails.category}
              onChange={(e) =>
                setExpenseDetails({
                  ...expenseDetails,
                  category: e.target.value,
                })
              }
            >
              {expense.map((exp) => (
                <option key={exp.id} value={exp.name}>{exp.name}</option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label>Note</label>
            <textarea
              value={expenseDetails.note}
              onChange={(e) =>
                setExpenseDetails({
                  ...expenseDetails,
                  note: e.target.value,
                })
              }
              className="border p-2 w-full"
            />
          </div>

          <div className="mb-4">
            <label>Date</label>
            <input
              type="date"
              value={expenseDetails.time_stamp}
              onChange={(e) =>
                setExpenseDetails({
                  ...expenseDetails,
                  time_stamp: e.target.value,
                })
              }
              className="border p-2 w-full"
            />
          </div>

          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            SUBMIT
          </button>
        </form>
      </Modal>
      <Toaster />
    </div>
  );
}

export default ExpenseList;
