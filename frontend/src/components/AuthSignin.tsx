import { Link, useNavigate } from "react-router-dom"
import { InputBox } from "./InputBox"
import { useState } from "react"
import type { SigninInput } from "@lucky452/medium-blog-common";
import { AuthButton } from "./AuthButton";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { Alert } from "./Alert";
import { LoadingFullscreen } from "./LoadingFullscreen";

export const AuthSignin = ()=> {
    const [signinInput, setSigninInput] = useState<SigninInput>({
        email:"",
        password:""
    })
    const [showAlert, setShowAlert] = useState(false)
    const [isloading, setIsLoading] = useState(false)
    const [alertMessage, setAlertMessage] = useState("")
    const navigate = useNavigate()

    async function sendRequest() {
        try{
            setIsLoading(true)
            const response = await axios.post(`${BACKEND_URL}/api/v1/user/signin`, signinInput)
            console.log(response.data)
            localStorage.setItem("token", response.data.jwt)
            setIsLoading(false)
            setShowAlert(false)
            navigate("/blogs")
        }
        catch(e:any) {
            setShowAlert(true)
            setIsLoading(false)
            if (e.status===411){
                console.log(typeof e)
                setAlertMessage("Invalid email and password.")
            }
            else {
                setAlertMessage("Wrong email or password.")
            }
        }
    }

    return (
        <div>
            {isloading && (<LoadingFullscreen />)}
            <div className="h-screen flex justify-center">
                <div className="flex justify-center flex-col w-95 mx-5">
                    <div className="font-bold text-4xl text-center">
                        Sign In
                    </div>
                    <div className="text-slate-400 text-lg flex justify-center mt-1.5 mb-2.5">
                        {"Don't have an account?"} 
                        <Link to="/signup" className="hover:text-slate-500 hover:underline pl-1 outline-0">
                            Sign Up
                        </Link>
                    </div>
                    <InputBox label="Email" placeholder="abc@gmail.com" inId="email" type="email" onChange={(e) => {
                        setSigninInput({
                            ...signinInput,
                            email:e.target.value
                        })
                    }}></InputBox>
                    <InputBox label="Password" placeholder="atleast 6 letters" inId="password" type="password" onChange={(e) => {
                        setSigninInput({
                            ...signinInput,
                            password:e.target.value
                        })
                    }}></InputBox>
                    {showAlert && (<Alert message={alertMessage} />)}
                    <AuthButton label="Sign In" onClick={sendRequest} />
                </div>
            </div>
        </div>
    )
}