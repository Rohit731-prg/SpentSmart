import toast from "react-hot-toast"
import { create } from "zustand"
import { api } from "../Utils/axios"

interface investment_input {
    amount: number,
    category: string,
    time_stamp: string
}

interface investmentList extends investment_input {
    id: number
}

type Store = {
    total_investment: number | null,
    investments: investmentList[] | null

    createNewInvestment: (data: investment_input) => Promise<void>
    createNewInvestmentWithAi: (input: string) => Promise<void>
    getAllInvestment: () => Promise<void>
    getFilteredInvestment: (input: string) => Promise<void>
}

const useInvestmentStore = create<Store>()((set, get) => ({
    total_investment: null,
    investments: null,

    createNewInvestment: async (data) => {
        try {
            const response = api.post("investment/create-manual", data);
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

    createNewInvestmentWithAi: async (input) => {
        try {
            const response = api.post("/investment/create-ai", { input });
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

    getAllInvestment: async () => {
        try {
            const response = await api.get("/investment/get-all-investments");
            console.log(response)
            set({ total_investment: response.data.total_investment, investments: response.data.investments });
        } catch (error) {
            toast.error(error as any)
        }
    },

    getFilteredInvestment: async (input) => {
        if (input == "All") {
            get().getAllInvestment();
            return
        }
        try {
            
        } catch (error) {
            toast.error(error as any)
        }
    }
}));

export default useInvestmentStore;