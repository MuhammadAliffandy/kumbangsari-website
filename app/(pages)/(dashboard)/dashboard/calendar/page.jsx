'use client'

import AppLayout from "../component/appLayout";
import AppCustomModal from "../../../../components/appModal/AppCustomModal";
import { useState } from "react";
import AppButton from "@/app/components/appButton/appButton";


const CalenderPage = () => {

    const [open , setOpen ] = useState(false)

    return (
        <AppLayout title='Kalender'>
            <h1 className="text-black">
                ini adalah kalender page
            </h1>


            <button  onClick={()=>{setOpen(!open)}} className="text-TEXT-1 bg-red-400" >test</button>
            <AppCustomModal
                open={open}
                withClose = {true}
                modalType = {'modal-status'}
                status = 'success'
                alignment={'center'}
                titleColor = {'text-STATE-GREEN-BASE'}
                title = {'Ini Adalah title'}
                subtitle = {'Anda dapat tahu tentang subtitle'}
                onCloseButton= {(value)=>{
                    setOpen(value)
                }}
            >
                <div className="w-[30vw]">
                    <AppButton
                        text='Unggah Sekarang'
                    />
                </div>
            </AppCustomModal>
        </AppLayout>
    ) 
}

export default CalenderPage;