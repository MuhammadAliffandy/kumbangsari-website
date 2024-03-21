'use client'

import Box from '@mui/material/Box'
import AppNavSidebar  from './appNavSidebar'
import Typography from '@mui/material/Typography'

const AppLayout = (props) => {
    return (
            <Box className='w-[100vw] h-[100vh] bg-red-500 flex'>
                <Box className = 'w-[15%] h-[100vh] bg-[#D9D9D9] flex flex-col items-center gap-[10px] '>
                    <Box className='py-[10px]'>
                        <Typography className='text-white'>Logo + Nama</Typography>
                    </Box>

                    <Box className='w-[90%] h-[100%] flex flex-col gap-[10px] m-[10px] justify-between '>
                        <Box className='flex flex-col gap-[10px] '>
                            <AppNavSidebar
                                text={'Home'}
                                onClick={()=>{}}
                            />
                            <AppNavSidebar
                                text={'Home'}
                                onClick={()=>{}}
                            />
                            <AppNavSidebar
                                text={'Home'}
                                onClick={()=>{}}
                            />
                            <AppNavSidebar
                                text={'Home'}
                                onClick={()=>{}}
                            />
                        </Box>
                        <AppNavSidebar
                            text={'Home'}
                            onClick={()=>{}}
                        />
                    </Box>
                </Box>
                <Box className='w-[85%] h-[100vh]'>
                    <nav className='w-[100%]] bg-green-200 py-[15px] px-[30px] flex justify-between border-b-CUSTOM-GREY-LIGHT border-[2px]'>
                        <Box>
                            <Typography className='text-white text-[14px]'>Hari/Tanggal</Typography>
                            <Typography className='text-white text-[24px] font-semibold'>{props.title}</Typography>
                        </Box>
                        <Box className='bg-red-500 rounded-xl'>
                            <Box className='p-[10px]'></Box>
                        </Box>
                    </nav>
                    {props.children}
                </Box>
            </Box>
    )    
}

export default AppLayout;