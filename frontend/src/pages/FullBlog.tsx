
import { useParams } from "react-router-dom"
import { useBlog } from "../hooks/BlogIdHook"
import { AppBar } from "../components/AppBar"
import { Loading } from "../components/Loading"
import { Avatar } from "../components/Avatar";

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

export const FullBlog = ()=> {
    const { id } = useParams()
    const {blog} = useBlog(id?id:"")

    if (blog.id==="") {
        return (
            <div>
                <AppBar />     
                <Loading />           
            </div>
        )
    }

    const date = new Date(blog.publishDate)
    if (blog.author.name===null) blog.author.name="Anonymous"
    blog.author.name = blog.author.name[0].toUpperCase() + blog.author.name.slice(1)
    
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
                            Posted on {`${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`}
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
                            <Avatar name={blog.author.name} />
                        </div>
                        <div>
                            <div className="font-bold text-2xl">
                                {blog.author.name}
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