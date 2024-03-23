'use client'

import Box from '@mui/material/Box'
import AppNavSidebar  from './appNavSidebar'
import AppProfileButton  from './appProfileButton'
import AppNotificationButton  from './appNotificationButton'
import Typography from '@mui/material/Typography'
import { useRouter } from 'next/navigation'
import { useEffect , useState } from 'react'
import { dateIndonesianNow } from '@/app/utils/helper'


const AppLayout = (props) => {

    const { push } = useRouter();
    const [dateNow, setDateNow] = useState('');

    useEffect(()=>{
        setDateNow(dateIndonesianNow)
    }, [] )

    return (
            <Box className='w-[100vw] h-[100vh] flex'>
                <Box className = 'w-[14%] h-[100vh] bg-NEUTRAL-100 flex flex-col items-center gap-[10px] border-r-[1px] border-r-TEXT-4 '>
                    <Box className='py-[10px] pl-[10%] flex items-center justify-start gap-[8px] w-[100%]'>
                        <img className='w-[40px] h-[40px]' src='/images/icon/logo/planify.png' />
                        <p className='text-black font-poppins text-[24px] font-semibold'>Planify</p>
                    </Box>

                    <Box className='w-[100%] h-[100%] flex flex-col gap-[10px] justify-between '>
                        <Box className='flex flex-col  '>
                            <AppNavSidebar
                                text={'Dashboard'}
                                active={props.title == 'Dashboard' ? true : false}
                                icon={'dashboard.png'}
                                iconWhite={'dashboard-white.png'}
                                onClick={()=>{push('/dashboard')}}
                            />
                            <AppNavSidebar
                                text={'Generate AI'}
                                active={ props.title == 'Generate AI' ? true : false}
                                icon={'generate.png'}
                                iconWhite={'generate-white.png'}
                                onClick={()=>{ push('/dashboard/generate-ai') }}
                            />
                            <AppNavSidebar
                                text={'Kalender'}
                                active={props.title == 'Kalender' ? true : false}
                                icon={'calendar.png'}
                                iconWhite={'calendar-white.png'}
                                onClick={()=>{push('/dashboard/calendar')}}
                            />
                            <AppNavSidebar
                                text={'Analisis'}
                                active={props.title == 'Analisis' ? true : false}
                                icon={'chart.png'}
                                iconWhite={'chart-white.png'}
                                onClick={()=>{push('/dashboard/analyst')}}
                            />
                            <AppNavSidebar
                                text={'Profil'}
                                active={props.title == 'Profil' ? true : false}
                                icon={'profile.png'}
                                iconWhite={'profile-white.png'}
                                onClick={()=>{push('/dashboard/profile')}}
                            />
                        </Box>
                        <AppNavSidebar
                            text={'Keluar'}
                            icon={'logout.png'}
                            onlyButton = {true}
                            onClick={()=>{}}
                        />
                    </Box>
                </Box>
                <Box className='w-[96%] h-[100vh]'>
                    <nav className='w-[100%]] bg-NEUTRAL-100 py-[15px] px-[30px] flex justify-between border-b-[1px] border-b-TEXT-4 '>
                        <Box>
                            <p className='text-TEXT-4 text-[14px]'>{dateNow}</p>
                            <p className='text-TEXT-1 text-[24px] font-bold'>{props.title}</p>
                        </Box>
                        <Box className ='flex gap-[20px] items-center' >
                            <AppNotificationButton
                                available={true}
                            />
                            <AppProfileButton
                                image = {'https://awsimages.detik.net.id/community/media/visual/2022/04/07/kim-chae-won_43.png?w=600&q=90'}
                            />

                        </Box>
                    </nav>
                    {props.children}
                </Box>
            </Box>
    )    
}

export default AppLayout;