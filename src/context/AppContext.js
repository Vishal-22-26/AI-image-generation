import { createContext, useState } from "react";

export const AppContext = createContext()

const AppContextProvider = (props) =>{
    const [user, setUser] = useState(null);
<<<<<<< HEAD
    const value = {
        user,setUser
=======
    const [showLogin, setShowLogin] = useState(false)
    const value = {
        user,setUser, showLogin, setShowLogin
>>>>>>> 67158c2 (my commit)
    }
    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}
export default AppContextProvider
