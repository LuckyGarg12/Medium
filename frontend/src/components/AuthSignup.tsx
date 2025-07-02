import { Link, useNavigate } from "react-router-dom"
import { InputBox } from "./InputBox"
import { useState } from "react"
import type { SignupInput } from "@lucky452/medium-blog-common";
import { AuthButton } from "./AuthButton";
import axios from "axios";
import { BACKEND_URL } from "../config";

export const AuthSignup = ()=> {
    const [signupInput, setSignupInput] = useState<SignupInput>({
        email:"",
        password:""
    })
    const navigate = useNavigate()

    async function sendRequest() {
        try{
            const response = await axios.post(`${BACKEND_URL}/api/v1/user/signup`, signupInput)
            localStorage.setItem("token", response.data.jwt)
            navigate("/blogs")
        }
        catch(e:any) {
            if (e.status===411){
                console.log(typeof e)
                alert("Password should atleast be 6 letters")
            }
            else {
                alert("User already exists")
            }
        }
    }

    return (
        <div className="h-screen flex justify-center">
            <div className="flex justify-center flex-col w-95">
                <div className="font-bold text-4xl text-center">
                    Create an account
                </div>
                <div className="text-slate-400 text-lg flex justify-center mt-1.5 mb-2.5">
                    Already have an account?
                    <Link to="/signin" className="hover:text-slate-500 hover:underline pl-1">
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
                <AuthButton label="Sign Up" onClick={sendRequest} />
            </div>
        </div>
    )
}