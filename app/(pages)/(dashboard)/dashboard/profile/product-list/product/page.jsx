'use client'

import { useEffect, useState } from "react";
import AppLayout from "@/app/(pages)/(dashboard)/dashboard/component/appLayout";
import Box from '@mui/material/Box'
import AppButton from "@/app/components/appButton/appButton";
import AppDropDown from '@/app/components/appDropDown/appDropDown'
import AppCustomButton from "@/app/components/appButton/appCustomButton";
import AppTableProduct from "@/app/components/appTable/appTableProduct";
import AppPopupFilter from '@/app/(pages)/(dashboard)/dashboard/component/popup/appPopupFilter'
import { listPlatform } from '@/app/utils/model';
import Grid from '@mui/material/Grid'


const ProductDetailPage = () => {
    return(
        <AppLayout title={`Profil > Daftar Produk > ${'name_product'}`}>
            <Box className='grow h-[86%] p-[20px] flex flex-col gap-[20px]'>
                <Box className='bg-NEUTRAL-100 flex justify-between gap-[10px] items-center p-[20px] rounded-[20px]'>
                    <Box className='flex flex-col'>
                        <p className="text-TEXT-1 text-[18px] font-bold">adasd</p>
                        <p className="text-TEXT-1 text-[12px]">Makanan dan Minuman</p>
                    </Box>
                    <Box className='flex gap-[10px]'>

                        <img className='w-[25px] h-[25px] rounded-[100%]' src={listPlatform.instagram}/>
                        <img className='w-[25px] h-[25px] rounded-[100%]' src={listPlatform.facebook}/>
                        <img className='w-[25px] h-[25px] rounded-[100%]' src={listPlatform.twitter}/>
                    </Box>
                </Box>
            </Box>
        </AppLayout>
    )

}

export default ProductDetailPage