"use client";
import Post from '../../components/Post'
import { collection, getDocs, query, where } from "firebase/firestore";
import {db} from '../../firebase/clientApp';
import { useState, useEffect } from 'react';


const q = query(collection(db, "posts"));

export default function page() {
    
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        getDocs(q)
          .then((querySnapshot) => {
            const posts_data = querySnapshot.docs.map((doc) => doc.data());
            setPosts(posts_data);
            console.log(posts_data);
        
          })
          .catch((error) => {
            console.error("Error al obtener los documentos: ", error);
          });
        
    }, []);

    return (
        <div className="relative top-[-110px]">
            <div className=" flex md:pt-[130px] justify-center pb-[300px]">
                <div className=" py-4 px-6  max-w-6xl  w-full">
                    <div className="columns-2">
                        <h1 className="text-4xl mb-10">Forum</h1>
                        <div className="flex flex-row-reverse space-x-4 space-x-reverse">
                            <a
                                href="#"
                                className="ml-8 inline-flex items-center justify-center whitespace-nowrap rounded-md border border-transparent bg-amber-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-amber-700"
                            >
                                Crear publicación
                            </a>
                        </div>
                    </div>
                    
                    <div className="rounded-xl bg-slate-100 pt-5">
                        {posts.map((post, index) => (
                            <Post  post={post} index={index} />
                            
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}