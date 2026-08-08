import toast from 'react-hot-toast'
import { create } from 'zustand'
import { api } from '../Utils/axios'

interface login_interface {
    email: string,
    password: string
}

interface signup_interface extends login_interface {
    name: string,
    city: string,
    salary: Number
}

interface basic_info {
    "total": {
        "total_expense": number,
        "total_investment": number
    },
    "today_report": {
        "expense": number,
        "investment": number
    },
    "monthly_report": {
        "expense": number,
        "investment": number
    },
    "top_expense_report": any,
    "last_transaction": any
}

interface user_interface {
    name: string,
    email: string,
    city: string,
    salary: number
}

type Store = {
    user: null | user_interface,
    basic_info: null | basic_info

    login: (data: login_interface) => void
    signUp: (data: signup_interface) => Promise<boolean>
    logout: () => Promise<boolean>

    userUpdate: (data: user_interface) => Promise<boolean>

    basic_information: () => Promise<void>
}

const useUserStore = create<Store>()((set) => ({
    user: null,
    basic_info: null,

    login: async (data) => {
        try {
            const response = api.post("/user/login", data);
            toast.promise(response, {
                loading: "Loading..!",
                success: (res) => res.data.message,
                error: "Internal Error"
            });
            const response_details = await response
            console.log(response_details);
            set({ user: response_details.data.user });
        } catch (error) {
            console.log(error);
        }
    },

    signUp: async (data) => {
        try {
            console.log(data);
            const response = api.post("/user/create", data);
            toast.promise(response, {
                loading: "Loading..!",
                success: (res) => res.data.message,
                error: "Internal Error"
            });
            const response_details = await response;
            console.log(response_details);
            return true
        } catch (error) {
            console.log(error)
            return false
        }
    },

    logout: async () => {
        try {
            const response = api.post("/user/log-out")
            toast.promise(response, {
                loading: "Loading..!",
                success: (res) => res.data.message,
                error: "Internal Error"
            });
            await response
            return true
        } catch (error) {
            console.log(error)
            return false
        }
    },

    userUpdate: async (data: user_interface) => {
        try {
            const response = api.put("/user/update-user-info", data);
            toast.promise(response, {
                loading: "Loading..!",
                success: (res) => res.data.message,
                error: "Internal Error"
            });
            await response;
            return true
        } catch (error) {
            console.log(error)
            return false
        }
    },

    basic_information: async () => {
        try {
            const response = await api.get("/user/get-all-basic-info");
            console.log(response)
            set({ basic_info: response.data })
        } catch (error) {
            console.log(error);
        }
    }
}))

export default useUserStore