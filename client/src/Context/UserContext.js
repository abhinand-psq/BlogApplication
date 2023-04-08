import { createContext, useState } from "react";
export const Usercontext=createContext(null)

function ContextOne({children}){

const [userinfo,setuserinfo]=useState(null)

    return(
        <Usercontext.Provider value={{userinfo,setuserinfo}}>
    {children}
    </Usercontext.Provider>

    )
}

export default ContextOne