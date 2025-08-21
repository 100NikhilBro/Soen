import { createContext, useState } from "react"

export const UserContext = createContext();

export const UserProvider =({children})=>{
    const[user,setUser] = useState(null);

    const obj = {
        user,
        setUser,
    }

    return(<UserContext.Provider value={obj}>{children}</UserContext.Provider>)
}