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
import { getUserProfile , getUserByToken } from '@/app/api/repository/userRepository'
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { setToken } from '@/app/redux/slices/authSlice';
import { setUserSubscriptionData } from '@/app/redux/slices/userSubscriptionSlice';
import { useDispatch } from 'react-redux';

const AppLayout = (props) => {

    const sm = useMediaQuery({ maxWidth: 640 });
    const md = useMediaQuery({ maxWidth: 768 });
    const lg = useMediaQuery({ maxWidth: 1024 });
    const xl = useMediaQuery({ maxWidth: 1280 });

    const { push } = useRouter()
    const dispatch = useDispatch()

    const [dateNow, setDateNow] = useState('');
    const [user, setUser] = useState([]);
    const [accountSwitched, setAccountSwitched] = useState([]);
    const [userSubscription, setUserSubscription] = useState('');
    const [expanded , setExpanded ] = useState(true)
    const accountList = JSON.parse(localStorage.getItem('accountList'))

    const setDate = () => {
        setDateNow(dateIndonesianNow())
    }

    const getUser = async () => {
        const res = await getCurrentUser();
        if(res.status == 'OK') {
            setUserSubscription(res.data.subscription)
            if(res.data.subscription == null ){
                push('/dashboard/profile/subscription')
            }                          
        }
    }

    const fetchUserProfile = async () => {
        try {
            const res = await getUserProfile()
            
            if(res.status === 'OK'){
                setUser(res.data)
                dispatch(setUserSubscriptionData(res.data.subscription))
            }
        } catch (error) {
            toast.error('Authentication Failed')
        }
    }

    const fetchUserList = async () => {
        try {
            
            const accountSwitchList = []
            const accountListFiltered = []

            for(let i = 0 ; i < 3 ; i++ ){
                const res = await getUserByToken(accountList[i])
            
                if(res.status === 'OK'){
                    accountSwitchList.push({ ...res.data , token : accountList[i]})
                }else{
                    accountListFiltered.push(accountList[i]);
                }
            }

            // filtered account switched on data storage 

            const accountListFinishChecked = accountList.filter((data)=>{
                if(accountListFiltered.indexOf(data) <= -1){
                    return data
                }
            })
            localStorage.setItem('accountList',JSON.stringify(accountListFinishChecked))

            // filtered account switched list

            const uniqAccountList = Array.from(
                new Map(accountSwitchList.map(user => [user.email, user])).values()
            );

            const accSwitched = uniqAccountList.filter(data => {
                if(data.email !== user.email){
                    return data
                }
            } )
            setAccountSwitched(accSwitched)
        } catch (error) {
            if(error.response.status === 400){
            }else{
                console.log(error)
            }
        }
    }


    useEffect(()=>{
        setDate()
    }, [] )

    useEffect(()=>{
        getUser()
        fetchUserProfile()
    },[])
    
    useEffect( ()=>{
        fetchUserList()
    } ,[user] )
    

    return (
            <Box className=  'w-[100%] h-[100vh] flex'>
                {
                    sm  || md || lg || xl? 
                        null
                    :

                    <Box className = 'w-[14%] h-[100vh] flex-none bg-NEUTRAL-100 flex flex-col items-center gap-[10px] border-r-[1px] border-r-TEXT-4 '>
                        <Box className={`py-[10px] pl-[10%] flex items-center ${xl ? 'justify-center' : 'justify-start' } gap-[8px] w-[100%]`}>
                            <img className='w-[40px] h-[40px]' src='/images/icon/logo/planify.png' />
                            { xl ? '' : <p className='bg-gradient-to-b from-[#44B8F8] to-[#4E5FE5] text-transparent bg-clip-text ont-poppins text-[24px] font-extrabold'>Planify</p>}
                        </Box>
                        <AppSidebar
                            isSubscription={userSubscription != null ? true : false}
                            isDrawer = {false}
                            title = {props.title}
                        />
                    </Box>
                }
                <Box className={` ${ sm || md || lg || xl ? 'w-[100%]' : 'w-[86%]' } h-[100vh] flex-none flex  flex-col`}>
                    <nav className='w-[100%] flex-none h-auto bg-NEUTRAL-100 py-[15px] px-[30px] flex items-center justify-between border-b-[1px] border-b-TEXT-4 '>
                        <Box className = 'flex items-center gap-[20px]' >
                            {

                                sm || lg || md || xl? 

                                <AppDrawer>
                                    <AppSidebar
                                        isSubscription={userSubscription != null ? true : false}
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
                                style = {` ${expanded == false ? 'rounded-t-[20px]' : 'rounded-[20px]' } bg-white  shadow-xl relative w-auto xl:w-[auto]`}
                                onClick={value => {
                                    setExpanded(value)
                                }}
                                componentHandle = {
                                        <AppProfileButton
                                            isItemDropDown ={true}
                                            dropDownIcon={true}
                                            dropDownType={expanded}
                                            image = {user.profileImage }
                                            name = {user.name || ''}
                                            countProduct = {`${user.productCount || 0} Produk`}
                                        />
                                }
                                componentItemStyle={'bg-white'}
                                componentItemList = {
                                    <div className="flex flex-col gap-[6px] bg-white rounded-b-[20px]">
                                        {
                                            accountSwitched.map((data , index) => {
                                                return(
                                                    <AppProfileButton
                                                        key={index}
                                                        isItemDropDown ={true}
                                                        dropDownIcon={false}
                                                        image = { data.profileImage}
                                                        name = {data.name || ''}
                                                        countProduct = {`${data.productCount || '0'} Produk`}
                                                        onClick={()=>{
                                                            dispatch(setToken(data.token) )
                                                            window.location.reload()
                                                        }}
                                                    /> 
                                                ) 
                                            })
                                        }
                                        <AppButton
                                            className='w-[100%] text-[14px] xl:text-[12px] py-[10px] bg-CUSTOM-RED shadow-xl text-white font-poppins rounded-[30px]'
                                            text={sm ? '+' : 'Tambah Akun' }
                                            onClick={()=>{
                                                push('/auth/signin')
                                                localStorage.setItem('isAccountAdd' , true)
                                            }}
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