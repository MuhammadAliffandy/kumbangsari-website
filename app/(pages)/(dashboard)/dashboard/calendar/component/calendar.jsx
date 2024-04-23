import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import { listPlatform } from '@/app/utils/model';

const Calendar = () => {

    const renderEventContent = (eventInfo) => {

        const { title ,  } = eventInfo.event
        const { platform } = eventInfo.event.extendedProps; 

        return (
   
                    <div className={` flex gap-[5px] p-[5px] bg-STATE-GREEN-BASE bg-opacity-[5%] border-[2px] border-STATE-GREEN-BASE rounded-[10px]`}   onClick={()=>{alert('TESTED EVENT CLICKED')}}>
                        <img className='w-[20px] h-[20px] rounded-[100%]' src={ platform == 'facebook'? listPlatform.facebook : platform == 'instagram'? listPlatform.instagram : platform == 'twitter'? listPlatform.twitter : null  }/>
                        <p className='text-TEXT-2 text-[12px] truncate' >{title}</p>
                    </div>
  
            );
        };
        
        const renderDayContent = (arg) => {
            return (
                    <>
                        <div style={{ fontSize: '14px' , color: 'black' }}>{arg.dayNumberText}</div>
                    </>
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
            height={'100vh'}
            className="rounded-lg"
            viewClassNames={'rounded-[10px]'}
            eventClassNames={'bg-transparent'}
            plugins={[dayGridPlugin]}
            initialView="dayGridMonth"
            buttonText={{
                today: 'Hari',
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
            dayCellContent={renderDayContent}
            dayHeaderContent={renderDayHeaderContent}
            datesSet={(arg) => {
                const calendarTitle = document.querySelector('.fc-toolbar-title');
                if (calendarTitle) {
                    calendarTitle.style.color = '#000';
                }
            }}
            events={[
                { title: 'Acara asdadaskhasdaksasdaddasdsdasadask1', date: '2024-04-01', platform : 'instagram' , borderColor:'transparent'  },
                { title: 'Acara 2', date: '2024-04-01', platform : 'facebook'  , borderColor: 'transparent',   },
                // Tambahkan acara yang ingin ditampilkan dalam kalender
            ]}
            eventContent={renderEventContent}
        />
    )
}

export default Calendar;