import { create } from 'zustand'
import { api } from '../Utils/axios'
import toast from 'react-hot-toast'

interface expenseInput_interface {
    amount: number,
    category: string,
    note: string,
    time_stamp: string
}

interface expenses_interface extends expenseInput_interface {
    id: number,
}

type Store = {
    expenses: expenses_interface[] | null
    total_expense: number | null

    createExpense: (data: expenseInput_interface) => Promise<void>
    createExpenseAI: (data: string) => Promise<void>
    getAllExpense: () => Promise<void>
    getFilterExpense: (input: string) => Promise<void>

    deleteExpense: (id: number) => Promise<void>
    updateExpense: (data: expenses_interface) => Promise<void>
}

const useExpenseStore = create<Store>()((set, get) => ({
    expenses: null,
    total_expense: null,

    createExpense: async (data) => {
        try {
            const response = api.post("/expense/create-manual", data);
            toast.promise(response, {
                loading: "Loading..!",
                success: (res) => res.data.message,
                error: "Internal Server Error"
            });
            await response;
            console.log(response)
        } catch (error) {
            console.log(error)
        }
    },

    createExpenseAI: async (data) => {
        try {
            console.log(typeof (data))
            const response = api.post("/expense/create-ai", { input_str: data });
            toast.promise(response, {
                loading: "Loading..!",
                success: (res) => res.data.message,
                error: "Internal Server Error"
            });
            await response;
            console.log(response)
        } catch (error) {
            console.log(error)
        }
    },

    getAllExpense: async () => {
        try {
            const response = await api.get("/expense/get-all-expense")
            console.log(response)
            set({ expenses: response.data.expenses });
            set({ total_expense: response.data.Total_expense });
        } catch (error) {
            toast.error("Internal Server Error");
            console.log(error)
            set({ expenses: null });
            set({ total_expense: null });
        }
    },

    getFilterExpense: async (input) => {
        if (input == "All") {
            get().getAllExpense();
            return
        }
        try {
            const response = await api.get(`/expense/get-filter-expense`, {
                params: { input }
            });
            console.log(response)
            set({ expenses: response.data.expenses });
        } catch (error) {
            toast.error("Internal Server Error");
            console.log(error);
        }
    },

    deleteExpense: async (id) => {
        try {
            const response = api.delete(`/expense/delete-expense/${id}`);
            toast.promise(response, {
                loading: "Loading..!",
                success: (res) => res.data.message,
                error: "Internal Server Error"
            });
            await response;
            get().getAllExpense();
        } catch (error) {
            console.log(error)
        }
    },

    updateExpense: async (data) => {
        try {
            const response = api.put(`/expense/update-expense/${data.id}`, {
                amount: data.amount,
                category: data.category,
                note: data.note,
                time_stamp: data.time_stamp
            });
            toast.promise(response, {
                loading: "Loading..!",
                success: (res) => res.data.message,
                error: "Internal Server Error"
            });
            await response;
            get().getAllExpense();
        } catch (error) {
            console.log(error)
        }
    }
}));

export default useExpenseStore;