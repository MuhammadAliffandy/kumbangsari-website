'use client'

import { useState } from "react";
import Box from '@mui/material/Box'
import AppLayout from "../component/appLayout";
import AppModalGenerateAI from "./component/appModalGenerateAI";
import AppButton from "@/app/components/appButton/appButton";


const GenerateAIPage = () => {

    const [openModalAI , setOpenModalAI ] = useState(false)

    return (
        <AppLayout title='Generate AI'>
            <Box className=''>
                <h1 className="text-black">
                    ini adalah Generate AI page
                </h1>
                <AppButton 
                    text={'Generate'} 
                    type = {'button'}
                    fontSize = {'12px'}
                    onClick = {()=>{setOpenModalAI(!openModalAI)}}
                />
                <AppModalGenerateAI open={openModalAI} onCloseButton={(value)=>{setOpenModalAI(value)}} />
            </Box>
        </AppLayout>
    ) 
}

export default GenerateAIPage;