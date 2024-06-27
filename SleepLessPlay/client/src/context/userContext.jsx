import { createContext, useEffect, useState } from "react";
import { getUserByID } from "../services/user.services";

export const userContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState({})
    const id = window.localStorage.getItem('Logged in user id')

    useEffect(() => {
        if (id) {
            getUserByID(id)
            .then((res) => {
                setUser(res)
            })
            .catch((err) => {
                console.log(err)
            })
        }
    }, [id])

    const storeIdInLocalStorage = (id) => {
        window.localStorage.setItem('Logged in user id', id)
    }

    return (
        <userContext.Provider value={{ user, setUser, storeIdInLocalStorage }}>
            {children}
        </userContext.Provider>
    )
}