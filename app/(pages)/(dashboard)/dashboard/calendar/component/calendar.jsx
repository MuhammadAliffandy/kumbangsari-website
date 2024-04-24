import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import { listPlatform } from '@/app/utils/model';

const Calendar = () => {

    const renderEventContent = (eventInfo) => {

        const { title ,  } = eventInfo.event
        const { platform , status } = eventInfo.event.extendedProps; 

        return (

            <div className={` flex gap-[5px] p-[5px] ${
                status == 'complete' ? 'bg-STATE-GREEN-BASE bg-opacity-[20%] border-[2px] border-STATE-GREEN-BASE' :
                status == 'incomplete' ? 'bg-STATE-YELLOW-BASE bg-opacity-[5%]  border-[2px] border-STATE-YELLOW-BASE' :
                status == 'success' ? 'bg-STATE-GREEN-BASE bg-opacity-[5%] border-[2px] border-STATE-GREEN-BASE' :
                status == 'failed' ? 'bg-STATE-RED-BASE bg-opacity-[5%] border-[2px] border-STATE-RED-BASE border-opacity-[70%]' :
                'bg-STATE-GREEN-BASE bg-opacity-[5%]  border-[2px]  border-STATE-GREEN-BASE'
            }  rounded-[10px]`}   onClick={()=>{alert('TESTED EVENT CLICKED')}}>
                <img className='w-[20px] h-[20px] rounded-[100%]' src={ platform == 'facebook'? listPlatform.facebook : platform == 'instagram'? listPlatform.instagram : platform == 'twitter'? listPlatform.twitter : null  }/>
                <p className='text-TEXT-2 text-[12px] truncate' >{title}</p>
            </div>
  
            );
        };
        

        const renderDayHeaderContent = (arg) => {
            return (
                    <>
                        <p className='text-[14px] text-TEXT-05'>{arg.text}</p>
                    </>
                );
        };



    return (
        <FullCalendar
            height={'100%'}
            className="rounded-lg"
            eventClassNames={'bg-transparent'}
            dayHeaderClassNames={'border-none bg-PRIMARY-400 rounded-[20px] p-[10px]'}
            plugins={[dayGridPlugin]}
            initialView="dayGridMonth"
            views={{
                dayGridMonth: {
                    dayMaxEventRows: 3,
                },
            }}
            moreLinkContent={
                args  => {
                    return <p className='text-[12px] text-PRIMARY-500'>{'+'+args.num+' Konten'}</p>;
                }
            }
            buttonText={{
                today: 'Hari Ini',
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
                return <span style={{ color: 'blue' }}>{args.title}</span>;
            }}
            dayHeaderContent={renderDayHeaderContent}
            datesSet={(arg) => {
                const calendarTitle = document.querySelector('.fc-toolbar-title');
                if (calendarTitle) {
                    calendarTitle.style.color = '#000';
                }
            }}
            eventContent={renderEventContent}
            events={[
                { title: 'Acara 1', date: '2024-04-01', platform : 'instagram' , borderColor:'transparent' , status : 'success' },
                { title: 'Acara 1', date: '2024-04-01', platform : 'instagram' , borderColor:'transparent' , status : 'success' },
                { title: 'Acara 1', date: '2024-04-01', platform : 'instagram' , borderColor:'transparent' , status : 'success' },
                { title: 'Acara 2', date: '2024-04-01', platform : 'facebook'  , borderColor: 'transparent',   status : 'failed' },
                { title: 'Acara 1', date: '2024-04-02', platform : 'instagram' , borderColor:'transparent' , status : 'success' },
                { title: 'Acara 2', date: '2024-04-02', platform : 'facebook'  , borderColor: 'transparent',   status : 'complete' },
                { title: 'Acara 1', date: '2024-04-06', platform : 'instagram' , borderColor:'transparent' ,  status : 'incomplete'  },
                { title: 'Acara 2', date: '2024-04-06', platform : 'facebook'  , borderColor: 'transparent',  status: 'failed' },
            ]}

        />
    )
}

export default Calendar;