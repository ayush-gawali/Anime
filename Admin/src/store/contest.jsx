import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const context = createContext({
    userData: {},
    BACKEND_URL: import.meta.env.VITE_BACKEND_URL,
    setUserData: () => { },
});

function ContextProvider({ children }) {

    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
    const [userData, setUserData] = useState(null);


    const fetchUserData = async () => {
        try {
            const token = localStorage.getItem("token");
            const responce = await axios.get(`${BACKEND_URL}/auth/getUser`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (responce.data.success) {
                setUserData(responce.data.userData)
            }
            else {
                setUserData(null)
            }
        } catch (error) {
            console.log(error.response.data.message);
        }
    }

    useEffect(() => {
        fetchUserData();
    }, []);

    const contextValue = {
        userData: userData,
        BACKEND_URL: BACKEND_URL,
        setUserData: setUserData,
    }

    return (
        <context.Provider value={contextValue} >
            {children}
        </context.Provider>
    )
}

export default ContextProvider