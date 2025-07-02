import { AuthSignin } from "../components/AuthSignin"
import { Quotes } from "../components/Quotes"


export const Signin = ()=> {
    return (
            <div className=" grid grid-cols-1 lg:grid-cols-2">
                <div>
                    <AuthSignin />
                </div>
                <div className="invisible lg:visible">
                    <Quotes />
                </div>
            </div>
        )
}