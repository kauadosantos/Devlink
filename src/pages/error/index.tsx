import { Link } from "react-router-dom"

export function Notfound(){
    return(
        <div className="flex items-center justify-center text-white flex-col w-full h-screen">
            
            <h1>Paginá não encontrada</h1>
            <p>Error 404!</p>
            <Link to="/" className="border h-7 px-2 bg-red-500 ">Voltar</Link>
        </div>
    )
}