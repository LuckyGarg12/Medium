import { Link } from "react-router-dom"
import { AvatarAppBar } from "./Avatar"


export const AppBar = () => {
    const username = "Lucky";

    return(
        <div className="flex justify-between px-5 py-3 border-b-1 border-slate-300 w-full bg-white">
            <Link to="/blogs" className="outline-0">
                <div className="text-4xl font-extrabold font-serif">
                    Medium
                </div>
            </Link>

            <div>
                <Link to="/publish">
                    <button type="button" className="mr-4 text-white bg-green-500 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-800 font-medium rounded-full text-sm px-5 py-2.5 text-center">
                        New
                    </button>
                </Link>
                <AvatarAppBar name={username} />
            </div>
        </div>
    )
}