import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Input } from "../../components/input";
import { useState, type FormEvent } from "react";
import { auth } from "../../services/firabeseConnection";
import { signInWithEmailAndPassword } from "firebase/auth";
export function Login(){
    const [email , setEmail] = useState("")
    const [senha , setSenha] = useState("")
    const navigate = useNavigate()

    function handleSubumit(e: FormEvent){
        e.preventDefault()
        if(email === '' || senha === ''){
            alert("Preencha todos os campos")
            return
        }
        signInWithEmailAndPassword(auth , email , senha )
        .then(() => {
            navigate("/admin" , {replace: true})
            console.log("Logado com sucesso")
        })
        .catch((error) => {
            console.log(error)
        })
    }


    return(
        <div className="flex w-full h-screen items-center justify-center flex-col">
            <Link to="/">
            <h1 className="mt-11 text-white mb-7 font-bold text-5xl">DEV<span className="bg-gradient-to-r from-yellow-500 to-orange-400 bg-clip-text text-transparent">Link</span></h1>
            </Link>
            <form onSubmit={handleSubumit} className="w-full max-w-xl flex flex-col px-2.5">
                <Input placeholder="Digite seu email..." type="email" value={email} onChange={(e) => setEmail(e.target.value)}/>

                <Input placeholder="***********" type="password" value={senha} onChange={(e) => setSenha(e.target.value)}/>
                
                <button onClick={handleSubumit} className="h-9 bg-blue-500 rounded-xs border-0 text-lg font-medium text-white" type="submit">Acessar</button>
            </form>
        </div>
    )
}