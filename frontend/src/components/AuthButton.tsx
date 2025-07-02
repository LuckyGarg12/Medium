import React from "react"

interface ButtonType {
    label:string,
    onClick: React.MouseEventHandler<HTMLButtonElement>
}


export const AuthButton = ({label, onClick}:ButtonType) => {
    return(
        <button onClick={onClick} type="button" className="w-full bg-gray-800 text-white hover:bg-gray-900 active:outline-none active:ring-2 active:ring-gray-300 font-medium rounded-lg text-md px-5 py-2.5 mt-6">{label}</button>
    )
}