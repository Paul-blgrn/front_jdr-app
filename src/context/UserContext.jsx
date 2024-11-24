import { createContext } from "react";

export default createContext({
    isRegistering: false,
    setIsRegistering: () => {},

    isModeAdmin: false,
    setIsModeAdmin: () => {},

    isCreatingBoard: false,
    setIsCreatingBoard: () => {},

    isJoiningBoard: false,
    setIsJoiningBoard: () => {},

    isEditingBoard: false,
    setIsEditingBoard: () => {},

    isEditingTemplate: false,
    setIsEditingTemplate: () => {},
})