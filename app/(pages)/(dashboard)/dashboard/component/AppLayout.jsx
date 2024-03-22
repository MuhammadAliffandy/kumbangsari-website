'use client'

import Box from '@mui/material/Box'
import AppNavSidebar  from './appNavSidebar'
import AppProfileButton  from './appProfileButton'
import AppNotificationButton  from './appNotificationButton'
import Typography from '@mui/material/Typography'
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons'


const AppLayout = (props) => {
    return (
            <Box className='w-[100vw] h-[100vh] flex'>
                <Box className = 'w-[15%] h-[100vh] bg-NEUTRAL-100 flex flex-col items-center gap-[10px] '>
                    <Box className='py-[10px]'>
                        <Typography className='text-black'>Logo + Nama</Typography>
                    </Box>

                    <Box className='w-[100%] h-[100%] flex flex-col gap-[10px] justify-between '>
                        <Box className='flex flex-col  '>
                            <AppNavSidebar
                                text={'Dashboard'}
                                active={false}
                                icon={'dashboard.png'}
                                iconWhite={'dashboard-white.png'}
                                onClick={()=>{}}
                            />
                            <AppNavSidebar
                                text={'Generate AI'}
                                active={ props.title == 'Generate AI' ? true : false}
                                icon={'generate.png'}
                                iconWhite={'generate-white.png'}
                                onClick={()=>{}}
                            />
                            <AppNavSidebar
                                text={'Kalender'}
                                active={false}
                                icon={'calendar.png'}
                                iconWhite={'calendar-white.png'}
                                onClick={()=>{}}
                            />
                            <AppNavSidebar
                                text={'Analisis'}
                                active={false}
                                icon={'chart.png'}
                                iconWhite={'chart-white.png'}
                                onClick={()=>{}}
                            />
                            <AppNavSidebar
                                text={'Profil'}
                                active={false}
                                icon={'profile.png'}
                                iconWhite={'profile-white.png'}
                                onClick={()=>{}}
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
                <Box className='w-[85%] h-[100vh]'>
                    <nav className='w-[100%]] bg-NEUTRAL-100 py-[15px] px-[30px] flex justify-between '>
                        <Box>
                            <p className='text-TEXT-4 text-[14px]'>Senin, 17 Mei 2023</p>
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