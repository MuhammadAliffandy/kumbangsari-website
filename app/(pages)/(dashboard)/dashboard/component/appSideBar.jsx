import { useRouter } from 'next/navigation'
import AppNavSidebar  from './appNavSidebar'
import AppExpansionList from "@/app/components/appExpansionList/appExpansionList";
import Box from '@mui/material/Box'
import { setCookie } from '@/app/utils/helper';


const AppSidebar = (props)=> {
    const { push } = useRouter();
    return(
        <Box className = { props.isDrawer ? 'w-[40vw] h-[100vh] gap-[10px] flex flex-col '  : `w-[100%] `}>
            {props.isDrawer ? 
                <Box className={`py-[10px] pl-[10%] flex items-center justify-start gap-[8px] w-[100%]`}>
                    <img className='w-[40px] h-[40px]' src='/images/icon/logo/planify.png' />
                    <p className='bg-gradient-to-b from-[#44B8F8] to-[#4E5FE5] text-transparent bg-clip-text ont-poppins text-[24px] font-extrabold'>Planify</p>
                </Box>

                : null

            }
            <Box className={`w-[100%]  flex flex-col gap-[10px] ${props.isDrawer ? 'h-[90vh] justify-between ' : 'h-[90vh]  justify-between '}`}>
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
                        active={props.title.search('Kalender') > -1 ? true : false}
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
                    <AppExpansionList
                        style = {`grow relative `}
                        onClick={value => {
                            console.log(value)
                        }}
                        componentHandle = {
                            <AppNavSidebar
                            isDrawer={props.isDrawer }
                            text={'Profil'}
                            active={props.title.split(' > ')[0] == 'Profil' ? true : false}
                            icon={'profile.png'}
                            iconWhite={'profile-white.png'}
                            onClick={()=>{}}
                        />
                        }
                        componentItemStyle={'bg-white'}
                        componentItemList = {
                            <div className="flex flex-col bg-transparent">
                                <AppNavSidebar
                                    isDrawer={props.isDrawer }
                                    text={'Akun'}
                                    active={props.title.split(' > ')[1] == 'Akun' ? true : false}
                                    child = {true}
                                    onClick={()=>{
                                        push('/dashboard/profile/account')
                                    }}
                                />
                                <AppNavSidebar
                                    isDrawer={props.isDrawer }
                                    text={'Daftar Produk'}
                                    active={props.title.split(' > ')[1] == 'Daftar Produk' ? true : false}
                                    child = {true}
                                    onClick={()=>{
                                        push('/dashboard/profile/product-list')
                                    }}
                                />
                                <AppNavSidebar
                                    isDrawer={props.isDrawer }
                                    text={'Berlangganan'}
                                    active={props.title.split(' > ')[1] == 'Berlangganan' ? true : false}
                                    child = {true}
                                    onClick={()=>{
                                        push('/dashboard/profile/subscription')
                                    }}
                                />
                                <AppNavSidebar
                                    isDrawer={props.isDrawer }
                                    text={'Pengaturan'}
                                    active={props.title.split(' > ')[1] == 'Pengaturan' ? true : false}
                                    child = {true}
                                    onClick={()=>{
                                        push('/dashboard/profile/settings')
                                    }}
                                />
                            </div>
                        } 
                    />
                </Box>
                <div className='mb-[20px]'>
                    <AppNavSidebar
                        isDrawer={props.isDrawer }
                        text={'Keluar'}
                        icon={'logout.png'}
                        onlyButton = {true}
                        onClick={()=>{
                            push('/auth/signin')
                            setCookie('token','')
                        }}
                    />
                </div>
            </Box>
        </Box>
    )
}

export default AppSidebar;