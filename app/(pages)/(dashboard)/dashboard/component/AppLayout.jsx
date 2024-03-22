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
                                onClick={()=>{}}
                            />
                            <AppNavSidebar
                                text={'Generate AI'}
                                active={ props.title == 'Generate AI' ? true : false}
                                onClick={()=>{}}
                            />
                            <AppNavSidebar
                                text={'Kalender'}
                                active={false}
                                onClick={()=>{}}
                            />
                            <AppNavSidebar
                                text={'Analisis'}
                                active={false}
                                onClick={()=>{}}
                            />
                            <AppNavSidebar
                                text={'Profil'}
                                active={false}
                                onClick={()=>{}}
                            />
                        </Box>
                        <AppNavSidebar
                            text={'Keluar'}
                            icon={faRightFromBracket}
                            onClick={()=>{}}
                            onlyButton = {true}
                        />
                    </Box>
                </Box>
                <Box className='w-[85%] h-[100vh]'>
                    <nav className='w-[100%]] bg-NEUTRAL-100 py-[15px] px-[30px] flex justify-between border-b-CUSTOM-GREY-LIGHT border-[2px]'>
                        <Box>
                            <p className='text-TEXT-4 text-[14px]'>Senin, 17 Mei 2023</p>
                            <p className='text-TEXT-1 text-[24px] font-bold'>{props.title}</p>
                        </Box>
                        <Box className ='flex gap-[20px] items-center' >
                            <AppNotificationButton/>
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