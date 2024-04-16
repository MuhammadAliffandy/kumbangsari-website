'use client'
import AppLayout from '../component/appLayout'
import React, { useState } from "react";

import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';

const renderEventContent = (eventInfo) => {
  return (
    <>
      <div onClick={()=>{alert('TESTED EVENT CLICKED')}}>
        <b style={{ color: 'black' }}>{eventInfo.timeText}</b>
        <i >{eventInfo.event.title}</i>
      </div>
    </>
  );
};

const renderDayContent = (arg) => {
  return (
    <>
      <div style={{ fontSize: '14px' , color: 'black' }}>{arg.dayNumberText}</div>
    </>
  );
};

const CalenderPage = () => {


    return (
        <AppLayout title='Kalender'>
            <div className='w-[100%] h-[90vh] overflow-x-hidden overflow-y-scroll'>
              <FullCalendar
                height={'85vh'}
                plugins={[dayGridPlugin]}
                initialView="dayGridMonth"
                buttonText={{
                  today: 'Hari ini',
                  month: 'Bulan',
                  week: 'Minggu',
                  day: 'Hari',
                  list: 'Daftar'
                }}
                headerToolbar={{
                  left: 'prev,next today',
                  center: 'title',
                  right: 'dayGridMonth,dayGridWeek,dayGridDay'
                }}
                titleContent={(args) => {
                  return <span style={{ color: 'red' }}>{args.title}</span>;
                }}
                eventContent={renderEventContent}
                dayCellContent={renderDayContent}
                dayHeaderContent={(args) => {
                  return <span style={{ color: '#000' }}>{args.text}</span>;
                }}
                datesSet={(arg) => {
                  const calendarTitle = document.querySelector('.fc-toolbar-title');
                  if (calendarTitle) {
                    calendarTitle.style.color = '#000'; // Set warna teks judul bulan
                  }
                }}
                events={[
                  { title: 'Acara asdadaskhasdaksasdaddasdsdasadask1', date: '2024-04-01', color: 'blue' },
                  { title: 'Acara 2', date: '2024-04-02', color: 'green' },
                  // Tambahkan acara yang ingin ditampilkan dalam kalender
                ]}
              />
            </div>
        </AppLayout>
    ) 
}

export default CalenderPage;

