import { SignupInput } from "@yaseenron/medium-common"
import { ChangeEvent, useState } from "react"
import { Link,useNavigate } from "react-router-dom"
import axios from "axios"
import { BACKEND_URL } from "../pages/config"


export const Auth = ({ type }: {type: "signup" | "signin"}) => {
    const navigate = useNavigate();
    const [postInputs,setPostInput] = useState<SignupInput>({ //this is a type of state variable
        name:"",
        username:"",
        password:""
    });

    async function sendRequest() {
        try{
            const response = await axios.post(`${BACKEND_URL}/api/v1/user/${type === "signup" ? "signup" : "signin"}`, postInputs); //this is to send in the body
            const jwt = response.data;
            localStorage.setItem("token",jwt);
            navigate('/blogs')
        }catch(e){
            alert("Error while signing up")
            //alert the user here if the req fails
        }
    }
    
    
    return <div className="h-screen flex justify-center flex-col">
      
        <div className="flex justify-center">
            <div>
            <div className="px-10">
                <div className="text-3xl font-extrabold">
                    Create a component
                </div>
                <div className="text-slate-500 mt-2 ml-8">
                    {type === "signin" ? "Dont have an account?": "Already have an account?" } 
                    <Link className="pl-2 underline" to={type === "signin" ? "/signup":"/signin"}>
                        {type === "signin" ? "Sign up" : "Sign in"}
                    </Link>
                </div>
            </div>
            <div className="pt-8">
                {type === "signup" ? <LabelledInput label="Name" placeholder="yaseen@gmail.com" onChange={(e)=>{
                    setPostInput ({
                        ...postInputs, //existing username or password
                        name: e.target.value
                    })

                }} /> :null}

                <LabelledInput label="Username" placeholder="yaseen@gmail.com" onChange={(e)=>{
                    setPostInput ({
                        ...postInputs,
                        username: e.target.value
                    })

                }} />

                <LabelledInput label="Password" type={"password"} placeholder="123456" onChange={(e)=>{
                    setPostInput ({
                        ...postInputs   , 
                        password: e.target.value
                    })

                }} />
                <button onClick={sendRequest} type="button" className="mt-8 w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">{type === "signup" ?  "Sign up" : "Sign in"}</button>
            </div>
        </div>
            
        </div>
    </div>
}

interface LabelledInputType{
    label: string,
    placeholder:string,
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    type?:string;
}

function LabelledInput({label, placeholder, onChange, type}:LabelledInputType){
    return <div>    
        <label  className="block mb-2 text-sm text-black font-semibold pt-4">{label}</label>
        <input onChange={onChange} type={type || "text"} id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder={placeholder} required />
    </div>

}