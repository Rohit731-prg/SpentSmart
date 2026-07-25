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

type Store = {
    user: null,
    login: (data: login_interface) => void
    signUp: (data: signup_interface) => Promise<boolean>
    logout: () => Promise<void>
}

const useUserStore = create<Store>()((set) => ({
    user: null,

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
            const response = api.post("")
            toast.promise(response, {
                loading: "Loading..!",
                success: (res) => res.data.message,
                error: "Internal Error"
            });
            await response
        } catch (error) {
            console.log(error)
        }
    }
}))

export default useUserStore