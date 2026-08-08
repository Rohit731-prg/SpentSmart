import { useEffect, useState, type FormEvent } from "react";
import useInvestmentStore from "../Store/InvestmentStore";
import { MdDelete } from "react-icons/md";
import { MdOutlineEdit } from "react-icons/md";
import { Toaster } from "react-hot-toast";
import Modal from 'react-modal';
import { investment } from "../Utils/city";

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

function InvestmentList() {
  const investment_list = [
    "All",
    "Today",
    "This Week",
    "This Month",
    "This Year",
  ];
  const [investmentSetails, setInvestmentDetails] = useState({
    id: 0,
    amount: 0,
    category: "",
    time_stamp: ""
  })
  const [modalIsOpen, setIsOpen] = useState(false);
  const {
    total_investment,
    investments,
    getAllInvestment,
    getFilteredInvestment,
    deleteInvestment,
    updateInvestment
  } = useInvestmentStore();

  const update_investment_func = (data: any) => {
    setInvestmentDetails(data);
    setIsOpen(true);
  }

  const handleUpdate = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await updateInvestment(investmentSetails);
    setIsOpen(false);
    setInvestmentDetails({ ...investmentSetails, 
      id: 0,
      amount: 0,
      category: "",
      time_stamp: ""
    })
  }

  const fetch_data = async () => {
    await getAllInvestment();
    setTimeout(() => {
      console.log(investments);
    }, 5000);
  }

  useEffect(() => {
    fetch_data();
  }, []);
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <main className="max-w-5xl mx-auto">
        {/* Filter Section */}
        <aside className="flex flex-row justify-between bg-white rounded-xl shadow-md p-4 mb-6 sm:flex-row gap-3 items-center">
          <select
            onChange={(e) => getFilteredInvestment(e.target.value)}
            className="px-5 py-2 border-2  outline-none rounded-full"
          >
            {investment_list.map((inv) => (
              <option key={inv} value={inv}>{inv}</option>
            ))}
          </select>

          <div>
            <p>Total Expense Amount : {total_investment ? total_investment : "N/A"}</p>
          </div>
        </aside>

        {/* Expense List */}
        <aside className="space-y-4">
          {investments && Array.isArray(investments) && investments?.map((inv) => (
            <div
              key={inv.id}
              className="bg-white rounded-xl shadow-md p-5 flex flex-col md:flex-row md:items-center md:justify-between"
            >
              {/* Expense Details */}
              <div className="space-y-2">
                <h2 className="text-xl font-semibold text-green-600">
                  ₹{inv.amount}
                </h2>

                <p className="text-gray-700">
                  <span className="font-medium">Category:</span> {inv.category}
                </p>

                <p className="text-sm text-gray-500">{inv.time_stamp}</p>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 mt-4 md:mt-0">
                <button
                  onClick={() => update_investment_func(inv)}
                  className="flex items-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg transition">
                  <MdOutlineEdit size={20} />
                  Edit
                </button>

                <button
                  onClick={() => deleteInvestment(inv.id)}
                  className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition">
                  <MdDelete size={20} />
                  Delete
                </button>
              </div>
            </div>
          ))}
        </aside>
      </main>
      <Toaster />

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setIsOpen(false)}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <h2 className="text-xl font-bold mb-4">Update Investment</h2>
        <form onSubmit={handleUpdate}>
          <div>
            <label>Amount</label>
            <input
              type="number"
              value={investmentSetails.amount}
              onChange={(e) =>
                setInvestmentDetails({
                  ...investmentSetails,
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
              value={investmentSetails.category}
              onChange={(e) =>
                setInvestmentDetails({
                  ...investmentSetails,
                  category: e.target.value,
                })
              }
            >
              {investment.map((exp) => (
                <option key={exp.id} value={exp.name}>{exp.name}</option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label>Date</label>
            <input
              type="date"
              value={investmentSetails.time_stamp}
              onChange={(e) =>
                setInvestmentDetails({
                  ...investmentSetails,
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
    </div >
  );
}

export default InvestmentList;
