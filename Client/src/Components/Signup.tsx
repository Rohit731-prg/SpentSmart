import { useState } from "react";
import useUserStore from "../Store/UserStore";
import { citys } from "../Utils/city";
import { Toaster } from "react-hot-toast";

function Signup() {
  const { signUp } = useUserStore();

  const [signupDetails, setSignupDetails] = useState({
    name: "",
    email: "",
    city: "",
    password: "",
    salary: 0,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    signUp(signupDetails);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 py-8">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-lg p-8">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900">
            Create Account
          </h1>
          <p className="text-gray-500 mt-2">
            Fill in your details to get started
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Full Name
            </label>
            <input
              type="text"
              placeholder="Enter your name"
              value={signupDetails.name}
              onChange={(e) =>
                setSignupDetails({
                  ...signupDetails,
                  name: e.target.value,
                })
              }
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none transition"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              value={signupDetails.email}
              onChange={(e) =>
                setSignupDetails({
                  ...signupDetails,
                  email: e.target.value,
                })
              }
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none transition"
            />
          </div>

          {/* City */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              City
            </label>
            {/* <input
              type="text"
              placeholder="Enter your city"
              value={signupDetails.city}
              onChange={(e) =>
                setSignupDetails({
                  ...signupDetails,
                  city: e.target.value,
                })
              }
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none transition"
            /> */}
            <select
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none transition"
            value={signupDetails.city}
              onChange={(e) =>
                setSignupDetails({
                  ...signupDetails,
                  city: e.target.value,
                })
              }
            >
              <option value="">Select Your City</option>
              {citys.map((city, index) => (
                <option key={index} value={city}>{city}</option>
              ))}
            </select>
          </div>

          {/* Salary */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Salary
            </label>
            <input
              type="number"
              placeholder="Enter your salary"
              value={signupDetails.salary}
              onChange={(e) =>
                setSignupDetails({
                  ...signupDetails,
                  salary: Number(e.target.value),
                })
              }
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none transition"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <input
              type="password"
              placeholder="Create a password"
              value={signupDetails.password}
              onChange={(e) =>
                setSignupDetails({
                  ...signupDetails,
                  password: e.target.value,
                })
              }
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none transition"
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-black text-white py-3 rounded-lg font-medium hover:bg-gray-800 transition duration-200"
          >
            Create Account
          </button>
        </form>
      </div>
      <Toaster />
    </div>
  );
}

export default Signup;