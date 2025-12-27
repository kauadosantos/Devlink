import { Social }  from '../../components/social'
import  { FaFacebook, FaInstagram , FaLinkedin } from "react-icons/fa"
import { db } from '../../services/firabeseConnection'
import { getDocs , collection , query , getDoc , orderBy, doc } from 'firebase/firestore'
import { useEffect, useState } from 'react'
export function Home(){

    const [links , setLinks] = useState<listProps[]>([])
    const [socialLinks , setSocialLinks] = useState<socialLinksProps>()

    interface listProps{
        id: string , 
        name: string ,
        url: string , 
        bg: string , 
        bf: string
    }
    interface socialLinksProps{
        facebook: string , 
        instagram: string , 
        linkedin: string
    }

    useEffect(()=>{
        function LoadLink(){
            const linkRef = collection(db , "links") 
            const linkQuery = query(linkRef , orderBy("create" , "asc"))

            getDocs(linkQuery)
            .then((Snapshot) => {
                const lista = [] as listProps[]

                Snapshot.forEach((doc) => {
                    lista.push({
                        id: doc.id , 
                        name: doc.data().name ,
                        url: doc.data().url , 
                        bg: doc.data().bg , 
                        bf: doc.data().bf
                    })
                })
                setLinks(lista)

            })

        }
        LoadLink()


    } , [])

    useEffect(() => {
        const docRef = doc(db , "social" , "link")

        getDoc(docRef)
        .then((snapshot) => {
            if(snapshot.data() !== undefined){
                setSocialLinks({
                    facebook: snapshot.data()?.facebook , 
                    instagram: snapshot.data()?.instagram , 
                    linkedin: snapshot.data()?.linkedin
                })
            }

        })
    } , [])


    return(
        <div className="flex flex-col w-full py-4 items-center justify-center">
            <h1 className="md:text-4xl text-3xl font-bold text-white mt-20">Kauã dos santos</h1>
            <span className="text-white mb-2 mt-3">Vejá meus links👇🏼</span>
            <main className="flex flex-col w-11/12 max-w-xl text-center">
                {links.map((item) => (
                    <section style={{background: item.bf}} className="bg-blue-400 rounded-md mb-4 w-full py-1.5 select-none transition-transform hover:scale-105 cursor-pointer" key={item.id}>
                    <a href={item.url} target='_blank'>
                        <p style={{color: item.bg}} className="text-base md:text-lg">{item.name}</p>
                    </a>
                </section>
                ))}
                {socialLinks && Object.keys(socialLinks).length > 0 && (
                    <footer className="flex justify-center gap-3 my-4">

                    <Social url={socialLinks?.linkedin}> 
                        <FaLinkedin size={30} color='white'/>
                       
                    </Social>
                    <Social url={socialLinks?.instagram}> 
                        <FaInstagram size={30} color='white'/>
                       
                    </Social>

                    <Social url={socialLinks?.facebook}> 
                        <FaFacebook size={30} color='white'/>
                       
                    </Social>

                </footer>
                )}
            </main>
        </div>

    )
}