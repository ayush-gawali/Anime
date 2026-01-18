import React, { useContext } from 'react'
import { useState } from "react";
import { FaEnvelope, FaLock, FaExclamationCircle, FaUser } from "react-icons/fa";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { context } from '../store/context';


function Login() {

    const {setUserData,BACKEND_URL} = useContext(context);

    const navigate = useNavigate();
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setformData] = useState({
        name: '',
        email: '',
        password: '',
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${BACKEND_URL}/auth/${isLogin?'login':'register'}`, formData);
            if(response.data.success){
                localStorage.setItem("token", response.data.userData.token);
                setUserData(response.data.userData);
                alert(response.data.message);
                navigate("/profile");
            }
        } catch (error) {
            alert(error.response.data.message);
            console.log(error);
        }
    };

    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setformData((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    return (
        <div className="flex justify-center items-center bg-[#121125] py-32 h-[calc(100vh-155px)]">
            <div className="w-96 bg-[#121125] rounded-2xl shadow-xl p-8 text-white text-center">
                <h2 className="text-3xl font-semibold"> {isLogin ? "Login" : "Register"} </h2>
                <form className="mt-5 space-y-5" onSubmit={handleSubmit}>

                    {!isLogin &&
                        <div>
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Name"
                                    className="w-full bg-transparent text-white px-12 py-3 border border-gray-600 rounded focus:border-blue-500 outline-none"
                                    value={formData.name}
                                    name='name'
                                    onChange={(e) => handleOnChange(e)}
                                />
                                <FaUser className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            </div>
                            {/* {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>} */}
                        </div>
                    }


                    <div>
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Email Address"
                                className="w-full bg-transparent text-white px-12 py-3 border border-gray-600 rounded focus:border-blue-500 outline-none"
                                value={formData.email}
                                name='email'
                                onChange={(e) => handleOnChange(e)}
                            />
                            <FaEnvelope className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            {/* {errors.email && (
                                <FaExclamationCircle className="absolute right-4 top-1/2 transform -translate-y-1/2 text-red-500" />
                            )} */}
                        </div>
                        {/* {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>} */}
                    </div>

                    <div>
                        <div className="relative">
                            <input
                                type="password"
                                placeholder="Password"
                                className="w-full bg-transparent text-white px-12 py-3 border border-gray-600 rounded focus:border-blue-500 outline-none"
                                value={formData.password}
                                name='password'
                                onChange={(e) => handleOnChange(e)}
                            />
                            <FaLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            {/* {errors.password && (
                                <FaExclamationCircle className="absolute right-4 top-1/2 transform -translate-y-1/2 text-red-500" />
                            )} */}
                        </div>
                        {/* {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>} */}
                    </div>

                    <div className="text-right text-sm">
                        <button disabled className="text-gray-400 hover:underline">
                            Forgot Password?
                        </button>
                    </div>

                    <button
                        type="submit"
                        className="w-full py-3 mt-5 bg-gradient-to-r from-blue-600 to-red-500 text-white rounded uppercase hover:opacity-90 transition"
                    >
                        {isLogin ? "Login" : "Register"}
                    </button>
                </form>

                <p className="text-gray-400 text-sm mt-4">
                    {isLogin ? "Don't ? " : "Alredy "}
                    have an account{" "}
                    <button onClick={() => setIsLogin((a) => !a)} className="text-purple-500 hover:underline">
                        {isLogin ? "Register" : "Login"}
                    </button>
                </p>
            </div>
        </div>
    )
}

export default Login