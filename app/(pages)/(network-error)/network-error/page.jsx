'use client'

import { useRouter } from "next/navigation";



const NetworkErrorPage = () => {

    const {push }= useRouter()

    return(
        <div className="flex  justify-center items-center h-[100vh] w-[100vw]">
            <div className="flex flex-col gap-[10px] items-center">
                <img src="/images/vector/error.svg" alt="image-error" className="w-[50vw] h-[50vh]"/>
                <div className="flex flex-col gap-[10px]">
                    <h1 className="text-black text-[40px] font-bold">Error - Page Not Found</h1>
                    <div className="flex items-center justify-center gap-[15px]">
                        <p className="text-black text-[20px] ">Sorry, We Couldn't find this page</p>
                    </div>
                    <button onClick={()=>{
                        push('/')
                    }} className="p-[10px] bg-PRIMARY-400 rounded-[10px]">Back</button>
                </div>
            </div>
        </div>
    )
}

export default NetworkErrorPage;