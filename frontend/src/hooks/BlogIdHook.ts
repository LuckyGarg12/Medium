import { useEffect, useState } from "react"
import { BACKEND_URL } from "../config"
import axios from "axios"

interface blogType {
    id:string,
    title:string,
    content:string,
    publishDate:string | Date,
    author:{
        name:string
    }
}

export const useBlog = (id:string|undefined) => {
    const [blog, setBlog] = useState<blogType>({
        id:"",
        title:"",
        content:"",
        publishDate:"",
        author:{
            name:""
        }
    })
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        axios.get(`${BACKEND_URL}/api/v1/blog/${id}`, {
            headers:{
                Authorization:"Bearer "+localStorage.getItem("token")
            }
        }).then((res)=> {
            setBlog(res.data.blog);
            setLoading(false)
        })
    }, [])

    return {
        loading,
        blog
    }
}