import { useEffect, useState, type FormEvent } from "react";
import { Header } from "../../components/Header";
import { Input } from "../../components/input";
import { db } from "../../services/firabeseConnection";
import { setDoc , doc , getDoc } from "firebase/firestore";


export function Network(){

    const [facebook , setFacebook] = useState("")
    const [instagram , setInstagram] = useState("")
    const [linkedin , setLinkedin] = useState("")


    useEffect(() => {
        function LoadLink(){
            const docRef = doc(db , "social" , "link")
            getDoc(docRef)
            .then((Snapshot)=>{
                if(Snapshot.data() !== undefined){
                    setFacebook(Snapshot.data()?.facebook)
                    setInstagram(Snapshot.data()?.instagram)
                    setLinkedin(Snapshot.data()?.linkedin)
                    
                }
            })
            .catch(()=>{
                console.log("Deu erro")
            })

        }
        LoadLink()
    } , [])


    function SaveText(e: FormEvent){
        e.preventDefault()
        setDoc(doc(db, "social" , "link") , {
            facebook: facebook ,
            instagram: instagram , 
            linkedin: linkedin
        })
        .then(() => {
            console.log("Deu certo")
        })
        .catch((error) => {
            console.log(`Deu erro ${error}`)
        })
    }


    return(
        <div className="flex items-center flex-col min-h-screen pb-7 px-2 ">
            <Header/>
            <h1 className="text-white text-2xl font-bold mt-8 mb-4">Minhas redes socias</h1>

            <form className="flex flex-col max-w-xl w-full" onSubmit={SaveText}>
                <label className="text-white font-medium mt-2 mb-2">Link do facebook</label>
                <Input placeholder="Digite a url do facebook.." type="url" value={facebook} onChange={(e) => setFacebook(e.target.value)}/>


                <label className="text-white font-medium mt-2 mb-2">Link do instagram</label>
                <Input placeholder="Digite a url do instagram.." type="url" value={instagram} onChange={(e) => setInstagram(e.target.value)}/>


                <label className="text-white font-medium mt-2 mb-2">Link do Linkedin</label>
                <Input placeholder="Digite a url do linkedin.." type="url" value={linkedin} onChange={(e) => setLinkedin(e.target.value)}/>

                <button className="text-white bg-blue-500 h-9 rounded-md flex items-center justify-center mb-3.5" type="submit">Salvar Links</button>
            </form>
        </div>
    )
}