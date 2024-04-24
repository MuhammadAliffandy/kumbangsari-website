'use client'
import AppLayout from '../component/appLayout'
import React, { useState } from "react";
import Calendar from './component/calendar'
import Box  from '@mui/material/Box'
import AppCustomButton from "@/app/components/appButton/appCustomButton";
import { useMediaQuery } from "react-responsive";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from '@fortawesome/free-solid-svg-icons'

const CalenderPage = () => {
  const sm = useMediaQuery({ maxWidth: 640 });
  const lg = useMediaQuery({ maxWidth: 1024 });

    return (
        <AppLayout title='Kalender'>
            <Box className='p-[20px] grow w-[100%] flex flex-col gap-[15px]'>
              <Box className='flex justify-between'>
                <AppCustomButton className='flex gap-[10px] items-center bg-SECONDARY-500 rounded-[10px] px-[15px] py-[5px] '
                        onClick={()=>{
          
                        }}
                    >
                        <FontAwesomeIcon icon={faPlus} color={'white'} ></FontAwesomeIcon>
                        {sm || lg ? null : <p className="text-TEXT-5 text-[14px]">Tambah Konten</p> }
                </AppCustomButton>

              </Box>
              <Box className='w-[100%] h-[100%] overflow-y-scroll rounded-[20px] p-[20px] border-[1px] border-TEXT-4 overflow-x-hidden scrollbar scrollbar-w-[8px] scrollbar-track-transparent scrollbar-thumb-gray-100 scrollbar-thumb-rounded-full'>
                <Calendar/>
              </Box>
            </Box>
        </AppLayout>
    ) 
}

export default CalenderPage;

