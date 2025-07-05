import { Link, useNavigate } from "react-router-dom"
import { InputBox } from "./InputBox"
import { useState } from "react"
import type { SignupInput } from "@lucky452/medium-blog-common";
import { AuthButton } from "./AuthButton";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { Alert } from "./Alert";
import { LoadingFullscreen } from "./LoadingFullscreen";

export const AuthSignup = ()=> {
    const [signupInput, setSignupInput] = useState<SignupInput>({
        email:"",
        password:""
    })
    const navigate = useNavigate()
    const [showAlert, setShowAlert] = useState(false)
    const [isloading, setIsLoading] = useState(false)
    const [alertMessage, setAlertMessage] = useState("")

    async function sendRequest() {
        try{
            setIsLoading(true)
            const response = await axios.post(`${BACKEND_URL}/api/v1/user/signup`, signupInput)
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
                setAlertMessage("Invalid email or password.")
            }
            else {
                setAlertMessage("User already exists.")
            }
        }
    }

    return (
        <div>
            {isloading && (<LoadingFullscreen />)}
            <div className="h-screen flex justify-center">
                <div className="flex justify-center flex-col w-95 mx-5">
                    <div className="font-bold text-4xl text-center">
                        Create an account
                    </div>
                    <div className="text-slate-400 text-lg flex justify-center mt-1.5 mb-2.5">
                        Already have an account?
                        <Link to="/signin" className="hover:text-slate-500 hover:underline pl-1 outline-0">
                            Login
                        </Link>
                    </div>
                    <InputBox label="Username" placeholder="John Doe" inId="username" type="text" onChange={(e) => {
                        setSignupInput({
                            ...signupInput,
                            name:e.target.value
                        })
                    }}></InputBox>
                    <InputBox label="Email" placeholder="abc@gmail.com" inId="email" type="email" onChange={(e) => {
                        setSignupInput({
                            ...signupInput,
                            email:e.target.value
                        })
                    }}></InputBox>
                    <InputBox label="Password" placeholder="atleast 6 letters" inId="password" type="password" onChange={(e) => {
                        setSignupInput({
                            ...signupInput,
                            password:e.target.value
                        })
                    }}></InputBox>
                    {showAlert && (<Alert message={alertMessage} />)}
                    <AuthButton label="Sign Up" onClick={sendRequest} />
                </div>
            </div>
        </div>
    )
}