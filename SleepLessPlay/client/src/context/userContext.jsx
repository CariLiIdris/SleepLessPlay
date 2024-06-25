import { createContext, useEffect, useState } from "react";
import { getUserByID } from "../services/user.services";

export const userContext = createContext();

export const UserProvider = (props) => {
    const [user, setUser] = useState({})
    const id = window.localStorage.getItem('Logged in user id')

    useEffect(() => {
        getUserByID(id)
            .then((res) => {
                setUser(res)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [id])

    const storeIdInLocalStorage = (id) => {
        window.localStorage.setItem('Logged in user id', id)
    }

    return (
        <userContext.Provider value={{ user, setUser, storeIdInLocalStorage }}>
            {props.children}
        </userContext.Provider>
    )
}