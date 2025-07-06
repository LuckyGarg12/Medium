import axios from "axios";
import { useEffect, useState } from "react"
import { BACKEND_URL } from "../config";
import { useAtom } from "jotai";
import { blogsAtom, timeoutIdAtom } from "../atoms/blogsAtom";

const REFRESH_TIME = 120 //In seconds


export const useBlogs = () => {
    const [loading, setLoading] = useState(false);
    const [ blogs, setBlogs ] = useAtom(blogsAtom);
    const [timeoutId, setTimeoutId] = useAtom(timeoutIdAtom)

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
        if (!blogs.length) {
            getBlogs()
        }
        clearTimeout(timeoutId)
        setTimeoutId(setTimeout(() => {setBlogs([])}, REFRESH_TIME*1000))
    }, [blogs])

    return {
        loading,
        blogs
    }
}