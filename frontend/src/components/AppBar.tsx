import { Link, useNavigate } from "react-router-dom"
import { AvatarAppBar } from "./Avatar"


export const AppBar = () => {
    const username = "Lucky";
    const navigate = useNavigate();

    return(
        <div className="flex justify-between px-5 py-3 border-b-1 border-slate-300 w-full bg-white">
            <Link to="/blogs" className="outline-0">
                <div className="text-4xl font-extrabold font-serif">
                    Medium
                </div>
            </Link>

            <div className="flex justify-center">
                <Link to="/publish">
                    <button type="button" className="mr-4 text-white bg-green-500 hover:bg-green-700 active:outline-none active:ring-2 active:ring-green-800 font-medium rounded-full text-sm px-5 py-2.5 text-center">
                        Publish
                    </button>
                </Link>
                <button className="mr-4 text-white bg-gray-700 hover:bg-gray-900 active:outline-none active:ring-2 active:ring-gray-800 font-medium rounded-full text-sm px-5 py-2.5 text-center" onClick={() => {
                    localStorage.removeItem("token")
                    navigate("/")
                }}>
                    Sign Out
                </button>
                <AvatarAppBar name={username} />
            </div>
        </div>
    )
}