import { useEffect, useState, type ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { auth } from "../services/firabeseConnection";
import { onAuthStateChanged } from "firebase/auth";


interface PrivateProps{
    children: ReactNode
}

export function Private({children}: PrivateProps){
    const [ loading , setLoading ] = useState(true)
    const [signed , setSigned] = useState(false)

    useEffect(() => {
        const unsub = onAuthStateChanged(auth , (user) =>{
            if(user){
                const userData = {
                    uid: user?.uid ,
                    email: user?.email 

                }
                localStorage.setItem("@reactlink" , JSON.stringify(userData))
                setLoading(false)
                setSigned(true)
                console.log("logado")
                
            }else{
                setLoading(false)
                setSigned(false)
                
            }
        })
        return () => {
            unsub()
        }
    } , [])
    if(loading){
        return(
            <div>Carregando</div>
        )
    }
    if(!signed){
       return <Navigate to="/login"/>
    }
    return children;
}