import { useRouter } from 'next/navigation'
import AppNavSidebar  from './appNavSidebar'
import AppExpansionList from "@/app/components/appExpansionList/appExpansionList";
import Box from '@mui/material/Box'
import { setCookie } from '@/app/utils/helper';
import AppCustomModal from '@/app/components/appModal/AppCustomModal';
import AppButton from '@/app/components/appButton/appButton';
import { useState } from 'react';

const AppSidebar = (props)=> {
    const { push } = useRouter();
    const [ modalLogout , setModalLogout ] = useState(false)


    return(
        <Box className = { props.isDrawer ? 'w-[70vw] md:w-[40vw] lg:w-[40vw] xl:w-[40vw] h-[100vh] gap-[10px] flex flex-col '  : `w-[100%] `}>
            <AppCustomModal
                    open={modalLogout}
                    withClose={true}
                    width={'md:w-[30vw] lg:xl:w-[30vw] xl:w-[30vw]'}
                    modalType='modal-status'
                    status={'info'}
                    titleTop={true}
                    alignment={'center text-center'}
                    title={'Keluar Akun'}
                    subtitle={'Anda yakin akan keluar ?'}
                    onClose={()=>{}}
                    onCloseButton={(value)=> {
                        setModalLogout(false)
                    }}
                    children={
                        <Box className=' flex  gap-[10px] w-[100%]'>
                            <AppButton
                                className='w-[100%] py-[10px] bg-NEUTRAL-500 hover:bg-NEUTRAL-600 shadow-xl text-white font-poppins rounded-[18px]'
                                text={'Tidak'} 
                                type = {'button'}
                                onClick={()=>{
                                    setModalLogout(false)
                                    }}/>
                            <AppButton
                                className='w-[100%] py-[10px] bg-CUSTOM-RED hover:bg-SECONDARY-600 shadow-xl text-white font-poppins rounded-[18px]'
                                text={ 'Iya'} 
                                type = {'button'}
                                onClick={()=>{
                                    push('/')
                                    setCookie('token','')
                                    setModalLogout(false)
                                }}
                            />
                        </Box>
                    }
                />
            {/*  */}
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
                        iconWhite={ 'dashboard-white.png' }
                        urlNavigation = { props.isSubscription ?  '/dashboard' : '#' }
                        isSubscription={props.isSubscription }
                    />
                    <AppNavSidebar
                        isDrawer={props.isDrawer }
                        text={'Generate AI'}
                        active={ props.title == 'Generate AI' ? true : false}
                        icon={'generate.png'}
                        iconWhite={ 'generate-white.png'}
                        urlNavigation= { props.isSubscription ?  '/dashboard/generate-ai' : '#' }
                        isSubscription={props.isSubscription }
                    />
                    <AppNavSidebar
                        isDrawer={props.isDrawer }
                        text={'Kalender'}
                        active={props.title.search('Kalender') > -1 ? true : false}
                        icon={'calendar.png'}
                        iconWhite={'calendar-white.png'}
                        urlNavigation= { props.isSubscription ?  '/dashboard/calendar' : '#' }
                        isSubscription={props.isSubscription }
                    />
                    <AppNavSidebar
                        isDrawer={props.isDrawer }
                        text={'Analisis'}
                        active={props.title == 'Analisis' ? true : false}
                        icon={'chart.png'}
                        iconWhite={'chart-white.png'}
                        urlNavigation={ props.isSubscription ?  '/dashboard/analyst' : '#' }
                        isSubscription={props.isSubscription }
                    />
                    <AppExpansionList
                        style = {`grow relative `}
                        active={props.title.split(' > ')[0] == 'Profil' ? true : false}
                        onClick={value => {
                    
                        }}
                        componentHandle = {
                            <AppNavSidebar
                            isDrawer={props.isDrawer }
                            text={'Profil'}
                            active={props.title.split(' > ')[0] == 'Profil' ? true : false}
                            icon={'profile.png'}
                            iconWhite={'profile-white.png'}
                            isSubscription={true}
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
                                    urlNavigation= { props.isSubscription ?  '/dashboard/profile/account' : '#' }
                                    isSubscription={props.isSubscription }
                                />
                                <AppNavSidebar
                                    isDrawer={props.isDrawer }
                                    text={'Daftar Produk'}
                                    active={props.title.split(' > ')[1] == 'Daftar Produk' ? true : false}
                                    child = {true}
                                    urlNavigation= { props.isSubscription ?  '/dashboard/profile/product-list' : '#' }
                                    isSubscription={props.isSubscription }
                                />
                                <AppNavSidebar
                                    isDrawer={props.isDrawer }
                                    text={'Berlangganan'}
                                    active={props.title.split(' > ')[1] == 'Berlangganan' ? true : false}
                                    child = {true}
                                    urlNavigation='/dashboard/profile/subscription/pay'
                                    isSubscription={true }
                                />
                                <AppNavSidebar
                                    isDrawer={props.isDrawer }
                                    text={'Pengaturan'}
                                    active={props.title.split(' > ')[1] == 'Pengaturan' ? true : false}
                                    child = {true}
                                    urlNavigation= { props.isSubscription ?  '/dashboard/profile/settings' : '#' }
                                    isSubscription={props.isSubscription }
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
                        urlNavigation='/'
                        onClick={()=>{
                           setModalLogout(true)
                        }}
                        isSubscription={true}
                    />
                </div>
            </Box>
        </Box>
    )
}

export default AppSidebar;