'use client'
import AppLayout from '../component/appLayout'
import React, { useEffect, useState } from "react";
import Calendar from './component/calendar'
import Box  from '@mui/material/Box'
import AppCustomButton from "@/app/components/appButton/appCustomButton";
import { getContentCalendar } from '@/app/api/repository/calendarRepository'
import { useMediaQuery } from "react-responsive";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { toast } from 'react-toastify';
import { convertEventDate } from '@/app/utils/helper';

const CalenderPage = () => {
    // state responsive
    const sm = useMediaQuery({ maxWidth: 640 });
    const lg = useMediaQuery({ maxWidth: 1024 });
    // state data
    const [ calendar , setCalendar ] = useState([])

    const fetchCalendarContent = async () => {
      try {
        const res = await getContentCalendar()

        if(res.status === 'OK'){
          setCalendar(res.data)
        }else{
          toast.error('Calendar Content Error')

        }

      } catch (error) {
        toast.error('Ada Kesalahan Sever (500)')
      }
    } 

    useEffect(()=>{
      fetchCalendarContent()
    },[])

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
                <Calendar
                  events={

                    calendar.length == 0 ? 

                    null : 

                    calendar.map( data => {
                      return { title: data.contentTitle, date: convertEventDate(data.dates.postedAt), platform : data.platform , borderColor:'transparent' , status : 'success' }
                    })
                  }
                />
              </Box>
            </Box>
        </AppLayout>
    ) 
}

export default CalenderPage;

