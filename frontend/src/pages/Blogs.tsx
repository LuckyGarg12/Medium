import { AppBar } from "../components/AppBar"
import { BlogCard } from "../components/BlogCard"
import { BlogSkeleton } from "../components/BlogSkeleton"
import { useBlogs } from "../hooks/BlogsHook"



export const Blogs = () => {
    
    const {loading, blogs} = useBlogs()

    if (loading) {
        return (
            <div>
                <AppBar />
                <div className="flex justify-center">
                    <div className="flex justify-center flex-col px-8 min-w-screen md:min-w-3xl">
                        <BlogSkeleton />
                        <BlogSkeleton />
                        <BlogSkeleton />
                        <BlogSkeleton />
                        <BlogSkeleton />
                    </div>
                </div>
            </div>
        )
    }

    return(
        <div>
            <AppBar />
            <div className="flex justify-center">
                <div className="flex justify-center flex-col px-8 min-w-screen md:min-w-3xl">
                    {blogs.map((blog)=> {
                        return (
                            <BlogCard key={blog.id} id={blog.id} authorName={blog.author.name!==null? blog.author.name: "Anonymous"} title={blog.title} content={blog.content} date="Nov 12, 2024" />
                        )
                    })}
                </div>
            </div>
        </div>
    )
}