import axios from "axios";
import { useEffect, useState } from "react"
import { BACKEND_URL } from "../config";
import { useAtom } from "jotai";
import { blogsAtom, lastUpdateAtom } from "../atoms/blogsAtom";

const REFRESH_TIME = 120 //In seconds


export const useBlogs = () => {
    const [loading, setLoading] = useState(false);
    const [ blogs, setBlogs ] = useAtom(blogsAtom);
    const [lastUpdate, setLastUpdate] = useAtom(lastUpdateAtom)

    const getBlogs = () => {
        setLoading(true)
        axios.get(`${BACKEND_URL}/api/v1/blog/bulk`, {
            headers:{
                Authorization:"Bearer "+localStorage.getItem("token")
            }
        }).then((res)=> {
            setBlogs(res.data.blogs);
            setLoading(false);
        })
    }

    useEffect(() => {
        if (!blogs.length || (lastUpdate && (new Date().getTime() - lastUpdate.getTime()) / 1000 > REFRESH_TIME)) {
            getBlogs()
            setLastUpdate(new Date())
        }
        
    }, [blogs])

    return {
        loading,
        blogs
    }
}