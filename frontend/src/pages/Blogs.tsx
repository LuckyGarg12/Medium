import { AppBar } from "../components/AppBar"
import { BlogCard } from "../components/BlogCard"
import { BlogSkeleton } from "../components/BlogSkeleton"
import { useBlogs } from "../hooks/BlogsHook"

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];

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
                        blog.publishDate = new Date(blog.publishDate)
                        return (
                            <BlogCard key={blog.id} id={blog.id} authorName={blog.author.name!==null? blog.author.name: "Anonymous"} title={blog.title} content={blog.content} date={`${months[blog.publishDate.getMonth()]} ${blog.publishDate.getDate()}, ${blog.publishDate.getFullYear()}`} />
                        )
                    })}
                </div>
            </div>
        </div>
    )
}