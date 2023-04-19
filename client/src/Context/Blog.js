import { createContext, useState } from "react"
export const BlogContext=createContext(null)

 function CreactBlogContext({children}){
const [blogcontexts,setblogcontexts]=useState([])
    return(
<BlogContext.Provider value={{blogcontexts,setblogcontexts}}>
    {children}
</BlogContext.Provider>
    )
}

export default CreactBlogContext