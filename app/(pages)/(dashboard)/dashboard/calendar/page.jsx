'use client'
import AppLayout from '../component/appLayout'
import React, { useState } from "react";
import Calendar from './component/calendar'

const CalenderPage = () => {


    return (
        <AppLayout title='Kalender'>
            <div className='p-[20px]'>
              <div className='w-[100%] h-[85vh] overflow-y-scroll rounded-[20px] p-[20px] border-[1px] border-TEXT-4 overflow-x-hidden scrollbar scrollbar-w-[8px] scrollbar-track-transparent scrollbar-thumb-gray-100 scrollbar-thumb-rounded-full'>
                <Calendar/>
              </div>
            </div>
        </AppLayout>
    ) 
}

export default CalenderPage;

