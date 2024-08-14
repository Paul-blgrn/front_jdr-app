import { useState, useEffect } from "react"
import UserContect from "../context/UserContext"
import API from "../services/API";
import { getCookie, getCsrfCookie } from "../utils/cookieManager";

import { DEBUG } from "../config/debug";

export const UserProvider = ({ children }) => {

    const [user, setUser ] = useState([]);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isModeAdmin, setIsModeAdmin] = useState(false);

    // Effect to check if the user is logged in on mount
    useEffect(() => {
        // Function to check authentication status
        const checkAuthStatus = async () => {
          try {
            // Make an API call to check if the user is logged in
            const response = await API.get('auth/check', {
              withCredentials: true
            })
            if (response.status === 200 && response.data.authenticated) {
              setIsLoggedIn(true)
              setUser(response.data.user || null)
              if (DEBUG) {
                console.log('user is logged in')
              }
            } else {
              setIsLoggedIn(false)
              setUser(null)
              if (DEBUG){
                console.log('user is logged out')
              }
            }
          } catch (error) {
            setIsLoggedIn(false)
            setUser(null)
            if (DEBUG) {
                console.error('Authentication check error:', error)
            }
          }
        }
        checkAuthStatus()
      }, [setIsLoggedIn, setUser])

    const userContextValue = {
        user,
        setUser,
        isLoggedIn,
        setIsLoggedIn,
        isModeAdmin,
        setIsModeAdmin,
    }

    return (
        <UserContect.Provider value={userContextValue}>
            {children}
        </UserContect.Provider>
    )
}
