
import { useParams } from "react-router-dom"
import { useBlog } from "../hooks/BlogIdHook"
import { AppBar } from "../components/AppBar"
import { FullBlogSkeleton } from "../components/FullBlogSkeleton"



export const FullBlog = ()=> {
    const { id } = useParams()
    const {loading, blog} = useBlog(id)

    if (loading) {
        return (
            <div>
                <AppBar />     
                <FullBlogSkeleton />           
            </div>
        )
    }
    

    return (
        <div>
            <AppBar />
            <div className="lg:grid grid-cols-12 py-12 px-10">
                <div className="col-span-8 px-10">
                    <div className="flex flex-col justify-center">
                        <div className="text-5xl font-bold">
                            {blog.title}
                        </div>
                        <div className="text-slate-400 py-3">
                            Posted on November 12, 2024
                        </div>
                        <div className="text-gray-700">
                            {blog.content}
                        </div>
                    </div>
                </div> 
                <div className="pt-10 lg:col-span-4 px-5">
                    <div className="font-medium text-slate-700">
                        Author
                    </div>
                    <div className="pt-3 flex justify-left">
                        <div className="flex justify-center flex-col pr-4">
                            <div className="w-7 h-7 rounded-full bg-gray-200" />
                        </div>
                        <div>
                            <div className="font-bold text-2xl">
                                {(blog.author.name!==null)?blog.author.name: "Anonymous"}
                            </div>
                            <div className="pt-3 text-gray-500">
                                This is the description about the author. It is a dummy description. It tells nothing about the author.
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}