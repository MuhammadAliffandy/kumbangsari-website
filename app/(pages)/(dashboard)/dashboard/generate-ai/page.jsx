'use client'

import { useState } from "react";
import Box from '@mui/material/Box'
import AppLayout from "../component/appLayout";
import AppContentFilter from "../component/appContentFilter"
import AppModalGenerateAI from "./component/appModalGenerateAI";
import AppButton from "@/app/components/appButton/appButton";
import AppCustomButton from "@/app/components/appButton/appCustomButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter } from '@fortawesome/free-solid-svg-icons'



const GenerateAIPage = () => {

    const [openModalAI , setOpenModalAI ] = useState(false)

    return (
        <AppLayout title='Generate AI'>
            <Box className='flex'>
                <Box className='w-[70%] py-[20px] pl-[20px]'>
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
                <Box className='w-[30%] p-[20px]'>
                    {/* filter bar  */}
                    <Box className= 'bg-NEUTRAL-200 rounded-[20px] p-[20px] flex flex-col gap-[15px]'>
                        <Box className='flex items-center justify-between w-[100%]'>
                            <p className="text-TEXT-1 font-bold text-[16px]">Riwayat Penelusuran</p>
                            <AppCustomButton className='flex gap-[10px] items-center bg-white rounded-[20px] px-[15px] py-[5px]' onClick={()=>{}}>
                                <img className='w-[18px] h-[18px] ' src={'/images/icon/filter.png'}/>
                                <p className="text-TEXT-1 font-bold text-[14px]">Filter</p>
                            </AppCustomButton>
                        </Box>
                        <AppContentFilter
                            title = {'Khasiat Bakso Aci'}
                            subtitle = {'Bakso Aci Mantap'}
                            contentTypes = {'Gambar, caption, hasgtag'}
                            iconImage = {'https://store-images.s-microsoft.com/image/apps.37935.9007199266245907.b029bd80-381a-4869-854f-bac6f359c5c9.91f8693c-c75b-4050-a796-63e1314d18c9'}
                            onClick= {()=>{}}
                        />
                        <AppContentFilter
                            title = {'Khasiat Bakso Aci'}
                            subtitle = {'Bakso Aci Mantap'}
                            contentTypes = {'Gambar, caption, hasgtag'}
                            iconImage = {'https://play-lh.googleusercontent.com/VRMWkE5p3CkWhJs6nv-9ZsLAs1QOg5ob1_3qg-rckwYW7yp1fMrYZqnEFpk0IoVP4LM'}
                            onClick= {()=>{}}
                        />
                        <AppContentFilter
                            title = {'Khasiat Bakso Aci'}
                            subtitle = {'Bakso Aci Mantap'}
                            contentTypes = {'Gambar, caption, hasgtag'}
                            iconImage = {'https://store-images.s-microsoft.com/image/apps.60673.9007199266244427.4d45042b-d7a5-4a83-be66-97779553b24d.5d82b7eb-9734-4b51-b65d-a0383348ab1b?h=464'}
                            onClick= {()=>{}}
                        />
                    </Box>
                </Box>
            </Box>
        </AppLayout>
    ) 
}

export default GenerateAIPage;