import { createContext } from "react";

export default createContext({
    user: [
        {
            email: "",
            name: "",
        }
    ],

    setUser: () => {},

    isLoggedIn: false,
    setIsLoggedIn: () => {},

    isModeAdmin: false,
    setIsModeAdmin: () => {},
})