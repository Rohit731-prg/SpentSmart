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
    createExpense: (data: expenseInput_interface) => Promise<void>
    createExpenseAI: (data: string) => Promise<void>
    getAllExpense: () => Promise<void>
}

const useExpenseStore = create<Store>()((set) => ({
    expenses: null,

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
            console.log(typeof(data))
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
        } catch (error) {
            toast.error("Internal Server Error");
            console.log(error)
        }
    }
}));

export default useExpenseStore;