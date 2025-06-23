import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { createContext } from "react";

export const UserContext = createContext({});

export function UserContextProvider ({children}) {
    const [user, setUser] = useState(null);

    const[ready, setReady] = useState(false);
    useEffect(() => {
          if(!user) {
            const fetchData = async () => {
                const response = await axios.get('/profile')
                console.log(response);
                
                setUser(response.data);
                setReady(true);
            }
            fetchData();
          }
    }, [])
    // this whole use effect takes time and in refresh null my be passed as user
    // create a ready variable so that you can make a separate check for ready
    // when info loads, ready set to true then do whatever you want
    return (
        <UserContext.Provider value={{user, setUser, ready}}>
            {children}
        </UserContext.Provider>
    )
}