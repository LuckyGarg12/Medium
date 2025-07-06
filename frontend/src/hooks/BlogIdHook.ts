import { useEffect, useState } from "react"
import { BACKEND_URL } from "../config"
import axios from "axios"
import { useAtom } from "jotai"
import { cacheBlogAtom, type blogType } from "../atoms/cacheBlogAtom"

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
    const [blog, setBlog] = useState<blogType>(() => {
        console.log(cacheBlog)
        if (cacheBlog[id] !== undefined) {
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
            let newCache = {...cacheBlog}
            newCache[res.data.blog.id] = res.data.blog
            setCacheBlog(newCache)
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