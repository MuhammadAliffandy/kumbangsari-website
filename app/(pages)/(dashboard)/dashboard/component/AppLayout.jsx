'use client'

import Box from '@mui/material/Box'

import AppProfileButton  from './appProfileButton'
import AppExpansionList from "@/app/components/appExpansionList/appExpansionList";
import AppButton from '@/app/components/appButton/appButton';
import AppPopupNotification  from './popup/appPopupNotification'
import AppSidebar from './appSideBar'
import AppDrawer from '@/app/components/appDrawer/appDrawer'
import { useMediaQuery } from "react-responsive";
import { useEffect , useState } from 'react'
import { dateIndonesianNow } from '@/app/utils/helper'
import { getCurrentUser } from '@/app/api/repository/authRepository'

const AppLayout = (props) => {

    const sm = useMediaQuery({ maxWidth: 640 });
    const md = useMediaQuery({ maxWidth: 768 });
    const lg = useMediaQuery({ maxWidth: 1024 });
    const xl = useMediaQuery({ maxWidth: 1280 });

    const [dateNow, setDateNow] = useState('');
    const [user, setUser] = useState();
    const [expanded , setExpanded ] = useState(true)

    const setDate = () => {
        setDateNow(dateIndonesianNow())
    }

    const getUser = async () => {
        const res = await getCurrentUser();
        if(res.status == 'OK') setUser(res.data)
    }

    useEffect(()=>{
        setDate()
    }, [] )

    useEffect(()=>{
        getUser()
    },[])

    return (
            <Box className=  'w-[100%] h-[100vh] flex'>
                {
                    sm  || md || lg? 
                        null
                    :

                    <Box className = 'w-[14%] h-[100vh] flex-none bg-NEUTRAL-100 flex flex-col items-center gap-[10px] border-r-[1px] border-r-TEXT-4 '>
                        <Box className={`py-[10px] pl-[10%] flex items-center ${xl ? 'justify-center' : 'justify-start' } gap-[8px] w-[100%]`}>
                            <img className='w-[40px] h-[40px]' src='/images/icon/logo/planify.png' />
                            { xl ? '' : <p className='bg-gradient-to-b from-[#44B8F8] to-[#4E5FE5] text-transparent bg-clip-text ont-poppins text-[24px] font-extrabold'>Planify</p>}
                        </Box>
                        <AppSidebar
                            isDrawer = {false}
                            title = {props.title}
                        />
                    </Box>
                }
                <Box className={` ${ sm || md || lg ? 'w-[100%]' : 'w-[86%]' } h-[100vh] flex-none flex  flex-col`}>
                    <nav className='w-[100%] flex-none h-auto bg-NEUTRAL-100 py-[15px] px-[30px] flex items-center justify-between border-b-[1px] border-b-TEXT-4 '>
                        <Box className = 'flex items-center gap-[20px]' >
                            {
                                sm || lg || md ? 

                                <AppDrawer>
                                    <AppSidebar
                                        isDrawer = {true}
                                        title = {props.title}
                                    />
                                </AppDrawer>

                                : null
                            }
                            <Box>
                                <p className='text-TEXT-4 text-[14px]'>{dateNow}</p>
                                <p className='text-TEXT-1 text-[24px] font-bold'>{props.title}</p>
                            </Box>
                        </Box>
                        <Box className ='flex gap-[20px] items-center' >
                            <AppPopupNotification
                                available={true}
                                onSelected={(value)=>{}}
                                listNotification = {
                                    [
                                        {
                                            dateDay : 'Hari ini',
                                            listDataNotificationChild : 
                                                [
                                                    {
                                                        title: 'Pembayaran',
                                                        subtitle : 'Pembayaran paket berlanggananmu melalui GoPay telah berhasil. Lihat riwayat pembayaran di halaman Profile!',
                                                        time: "07.00",
                                                        notificationType : 'pay'
                                                    },
                                                    {
                                                        title: 'Produk berhasil ditambahkan!',
                                                        subtitle : 'Skincaremoe berhasil ditambahkan ke dalam daftar produkmu! Hubungkan beberapa platform untuk memulai pengalaman manajemen yang mudah dan menyenangkan!',
                                                        time: "07.00",
                                                        notificationType : 'connect'
                                                    },
                                                ]
                                            
                                        },
                                    
                                    ]
                                }
                            />
                            <AppExpansionList
                                style = {` ${expanded == false ? 'rounded-t-[20px]' : 'rounded-[20px]' } bg-white  shadow-xl relative w-[180px]`}
                                onClick={value => {
                                    setExpanded(value)
                                }}
                                componentHandle = {
                                        <AppProfileButton
                                            isItemDropDown ={true}
                                            dropDownIcon={true}
                                            dropDownType={expanded}
                                            image = {'https://www.wowkeren.com/display/images/photo/2024/04/03/00506918.webp'}
                                            name = {'Kazuha'}
                                            countProduct = {`${3} Produk`}
                                        />
                                }
                                componentItemStyle={'bg-white'}
                                componentItemList = {
                                    <div className="flex flex-col gap-[6px] bg-white rounded-b-[20px]">
                                        <AppProfileButton
                                            isItemDropDown ={true}
                                            dropDownIcon={false}
                                            image = {'https://awsimages.detik.net.id/community/media/visual/2022/04/07/kim-chae-won_43.png?w=600&q=90'}
                                            name = {'Chaewon'}
                                            countProduct = {`${2} Produk`}
                                        /> 
                                        <AppProfileButton
                                            isItemDropDown ={true}
                                            dropDownIcon={false}
                                            image = {'https://awsimages.detik.net.id/community/media/visual/2022/04/07/kim-chae-won_43.png?w=600&q=90'}
                                            name = {'Chaewon'}
                                            countProduct = {`${2} Produk`}
                                        /> 
                                        <AppButton
                                            className='w-[100%] text-[12px] py-[10px] bg-CUSTOM-RED shadow-xl text-white font-poppins rounded-[30px]'
                                            text='Buat Akun'
                                        />
                                    </div>
                                } 
                            />

                        </Box>
                    </nav>
                    {props.children}
                </Box>
            </Box>
    )    
}

export default AppLayout;