import { useRef } from "react"
import { AppBar } from "../components/AppBar"
import axios from "axios"
import { BACKEND_URL } from "../config"
import { useNavigate } from "react-router-dom"

export const Publish = () => {
    const title = useRef<HTMLInputElement>(null)
    const content = useRef<HTMLTextAreaElement>(null)
    const navigate = useNavigate()

    const publish_button = async () => {
        try {
            const response = await axios.post(`${BACKEND_URL}/api/v1/blog`, {
                title:title.current?.value,
                content:content.current?.value
            },
            {
                headers:{
                    Authorization:"Bearer "+localStorage.getItem("token")
                }
            })
            navigate(`/blogs/${response.data.id}`)
        }
        catch(e:any) {

        }
    }

    return (
        <div>
            <AppBar />
            <div className="px-10 py-30 flex justify-center">
                <div className="flex justify-center flex-col px-5 max-w-3xl min-w-screen md:min-w-3xl">
                    <div className="text-6xl font-bold text-center w-full mb-10">
                        Let the world know!
                    </div>
                    <div className="flex justify-center">
                        <input ref={title} type="text" id="title" placeholder="Title" className="w-full max-w-2xl text-lg p-4 outline-0 text-gray-900 border-1 rounded-lg border-slate-400 focus:border-slate-600" />    
                    </div>
                    <div className="flex justify-center">
                        <textarea ref={content} id="message" rows={8} className="block max-w-2xl outline-0 mt-5 p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:border-slate-600 " placeholder="Write your Content here..."></textarea>
                    </div>
                    <div className="flex justify-center mt-5">
                        <button type="submit" onClick={publish_button} className="w-30 px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg active:ring-2 active:ring-blue-200 hover:bg-blue-800">
                            Publish Post
                        </button> 
                    </div>
                </div>
            </div>
        </div>
    )
}