import { Link, useNavigate } from "react-router-dom"
import { InputBox } from "./InputBox"
import { useState } from "react"
import type { SigninInput } from "@lucky452/medium-blog-common";
import { AuthButton } from "./AuthButton";
import axios from "axios";
import { BACKEND_URL } from "../config";

export const AuthSignin = ()=> {
    const [signinInput, setSigninInput] = useState<SigninInput>({
        email:"",
        password:""
    })

    const navigate = useNavigate()

    async function sendRequest() {
        try{
            const response = await axios.post(`${BACKEND_URL}/api/v1/user/signin`, signinInput)
            console.log(response.data)
            localStorage.setItem("token", response.data.jwt)
            navigate("/blogs")
        }
        catch(e:any) {
            if (e.status===411){
                console.log(typeof e)
                alert("Password should atleast be 6 letters")
            }
            else {
                alert("Invalid email or password")
            }
        }
    }

    return (
        <div className="h-screen flex justify-center">
            <div className="flex justify-center flex-col w-95">
                <div className="font-bold text-4xl text-center">
                    Sign In
                </div>
                <div className="text-slate-400 text-lg flex justify-center mt-1.5 mb-2.5">
                    {"Don't have an account?"} 
                    <Link to="/signup" className="hover:text-slate-500 hover:underline pl-1">
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
                <AuthButton label="Sign In" onClick={sendRequest} />
            </div>
        </div>
    )
}