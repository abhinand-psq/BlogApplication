import { createContext, useState } from "react";
export const Usercontext=createContext(null)

function ContextOne({children}){

const [user,setuserinfo]=useState(null)

    return(
        <Usercontext.Provider value={{user,setuserinfo}}>
    {children}
    </Usercontext.Provider>

    )
}

export default ContextOne