import { Link } from "react-router-dom"
import { Avatar } from "./Avatar"

interface blogInput {
    id:string,
    authorName:string,
    date:string,
    title:string,
    content:string
}

export const BlogCard = ({authorName, date, title, content, id}:blogInput) => {

    return(
        <div className="max-w-2xl border-b-1 border-slate-300 mt-3 pt-5 pb-3">
            <Link to={`/blogs/${id}`} className="outline-0">
                <div className="flex justify-left pb-2">
                    <Avatar name={authorName}></Avatar>
                    <div className="flex justify-center flex-col">
                        <div className="flex justify-center text-sm pl-2">
                            <div className="flex justify-center flex-col">
                                {authorName}
                            </div>
                            <div className="pl-2 flex justify-center flex-col text-slate-500">
                                • {date}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="font-extrabold text-2xl">
                    {title}
                </div>
                <p className="text-ellipsis line-clamp-2 font-light text-md">
                    {content}
                </p>
                <div className="text-xs text-slate-400 mt-3.5">
                    {`${Math.ceil(content.length/400)} min read`}
                </div>
            </Link>
        </div>
    )
}