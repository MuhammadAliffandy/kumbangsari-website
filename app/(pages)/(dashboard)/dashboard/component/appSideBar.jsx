import { useRouter } from 'next/navigation'
import AppNavSidebar  from './appNavSidebar'
import Box from '@mui/material/Box'


const AppSidebar = (props)=> {
    const { push } = useRouter();
    return(
        <Box className = { props.isDrawer ? 'w-[40vw]'  : `w-auto `}>
            <Box className={`w-[100%]  flex flex-col gap-[10px] ${props.isDrawer ? 'h-[100vh] justify-between ' : 'h-[100%] '}`}>
                <Box className='flex flex-col  '>
                    <AppNavSidebar
                        isDrawer={props.isDrawer }
                        text={'Dashboard'}
                        active={props.title == 'Dashboard' ? true : false}
                        icon={'dashboard.png'}
                        iconWhite={'dashboard-white.png'}
                        onClick={()=>{push('/dashboard')}}
                    />
                    <AppNavSidebar
                        isDrawer={props.isDrawer }
                        text={'Generate AI'}
                        active={ props.title == 'Generate AI' ? true : false}
                        icon={'generate.png'}
                        iconWhite={'generate-white.png'}
                        onClick={()=>{ push('/dashboard/generate-ai') }}
                    />
                    <AppNavSidebar
                        isDrawer={props.isDrawer }
                        text={'Kalender'}
                        active={props.title == 'Kalender' ? true : false}
                        icon={'calendar.png'}
                        iconWhite={'calendar-white.png'}
                        onClick={()=>{push('/dashboard/calendar')}}
                    />
                    <AppNavSidebar
                        isDrawer={props.isDrawer }
                        text={'Analisis'}
                        active={props.title == 'Analisis' ? true : false}
                        icon={'chart.png'}
                        iconWhite={'chart-white.png'}
                        onClick={()=>{push('/dashboard/analyst')}}
                    />
                    <AppNavSidebar
                        isDrawer={props.isDrawer }
                        text={'Profil'}
                        active={props.title == 'Profil' ? true : false}
                        icon={'profile.png'}
                        iconWhite={'profile-white.png'}
                        onClick={()=>{push('/dashboard/profile')}}
                    />
                </Box>
                <AppNavSidebar
                    isDrawer={props.isDrawer }
                    text={'Keluar'}
                    icon={'logout.png'}
                    onlyButton = {true}
                    onClick={()=>{}}
                />
            </Box>
        </Box>
    )
}

export default AppSidebar;