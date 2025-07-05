import axios from "axios";
import { useEffect, useState } from "react"
import { BACKEND_URL } from "../config";

interface blogType {
    id:string,
    title:string,
    content:string,
    publishDate:string | Date
    author:{
        name:string|null
    }
}

export const useBlogs = () => {
    const [loading, setLoading] = useState(true);
    const [ blogs, setBlogs ] = useState<blogType[]>([]);

    useEffect(() => {
        axios.get(`${BACKEND_URL}/api/v1/blog/bulk`, {
            headers:{
                Authorization:"Bearer "+localStorage.getItem("token")
            }
        }).then((res)=> {
            setBlogs(res.data.blogs);
            setLoading(false);
        })
    }, [])

    return {
        loading,
        blogs
    }
}