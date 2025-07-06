import { useEffect, useState } from "react"
import { BACKEND_URL } from "../config"
import axios from "axios"
import { useAtom } from "jotai"
import { cacheBlogAtom, lastUpdateAtom, type blogType } from "../atoms/cacheBlogAtom"

const REFRESH_TIME = 120 // In seconds

export const useBlog = (id: string) => {
    const emptyBlog = {
        id: "",
        title: "",
        content: "",
        publishDate: "",
        author: {
            name: ""
        }
    }
    const [cacheBlog, setCacheBlog] = useAtom(cacheBlogAtom)
    const [lastUpdate, setLastUpdate] = useAtom(lastUpdateAtom)
    const [blog, setBlog] = useState<blogType>(() => {
        console.log(lastUpdate)
        if (cacheBlog[id] !== undefined && (lastUpdate && (new Date().getTime() - lastUpdate[id].getTime()) / 1000 < REFRESH_TIME)) {
            return cacheBlog[id]
        }
        return emptyBlog
    })

    function getBlog() {
        axios.get(`${BACKEND_URL}/api/v1/blog/${id}`, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token")
            }
        }).then((res) => {
            setBlog(res.data.blog);
            setCacheBlog((prev) => {
                return {...prev, [res.data.blog.id]: res.data.blog}
            })
            setLastUpdate((prev) => {
                return {...prev, [res.data.blog.id]: new Date()}
            })
        })
    }

    useEffect(() => {
        if (blog.id === "") {
            getBlog()
        }
    }, [])

    return {
        blog
    }
}