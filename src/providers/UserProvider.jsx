import { useState } from "react"
import UserContext from "../context/UserContext"

export const UserProvider = ({ children }) => {

    const [isRegistering, setIsRegistering] = useState(false);
    const [isModeAdmin, setIsModeAdmin] = useState(false);
    const [isEditingTemplate, setIsEditingTemplate] = useState(false);
    const [isEditingBoard, setIsEditingBoard] = useState(false);
    
    const [isCreatingBoard, setIsCreatingBoard] = useState(false);
    const [isJoiningBoard, setIsJoiningBoard] = useState(false);

    const userContextValue = {
        isRegistering,
        setIsRegistering,
        isCreatingBoard,
        setIsCreatingBoard,
        isJoiningBoard,
        setIsJoiningBoard,
        isModeAdmin,
        setIsModeAdmin,
        isEditingTemplate,
        setIsEditingTemplate,
        isEditingBoard,
        setIsEditingBoard,
    }

    return (
        <UserContext.Provider value={userContextValue}>
            {children}
        </UserContext.Provider>
    )
}
