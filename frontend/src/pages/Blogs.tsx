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
                        const date = new Date(blog.publishDate);
                        if (blog.author.name===null) blog.author.name="Anonymous"
                        blog.author.name = blog.author.name[0].toUpperCase() + blog.author.name.slice(1)
                        return (
                            <BlogCard key={blog.id} id={blog.id} authorName={blog.author.name} title={blog.title} content={blog.content} date={`${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`} />
                        )
                    })}
                </div>
            </div>
        </div>
    )
}