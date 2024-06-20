'use client'

import AppLayout from "../../component/AppLayout"
import AppCheckBox from "@/app/components/appCheckBox/appCheckBox"
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import AppModalThirdParty from './component/appModalThirdParty'
import AppModalProductList from './component/appModalProductList'
import AppDropDown from "@/app/components/appDropDown/appDropDown"
import { useEffect, useState } from "react"
import { listDropNotifHour, listDropNotifMonth, listDropNotifDay } from "@/app/utils/model"
import { convertToIndonesianDate } from "@/app/utils/helper"
import { toast } from "react-toastify"
import { editUserSettings, getUserActivityHistory, getUserSettings } from "@/app/api/repository/userRepository"
import AppToastPending from "@/app/components/AppToastPending/appToastPending"
import images from '@/public/images/images'

const historyActivity = [
    {
        title : 'Terakhir Login',
        logData : '15 September 2024',
        icon : images.icon.settings.profileSetting
    },
    {
        title : 'Terakhir Ubah Izin',
        logData : '15 September 2024',
        icon : images.icon.settings.shield
    },
    {
        title : 'Terakhir Unggah Konten',
        logData : '15 September 2024',
        icon : images.icon.settings.gallery
    },
]

const SettingsPage = () => {
    // state modal
    const [modalThirdParty , setModalThirdParty ] = useState(false)
    const [modalProductList , setModalProductList ] = useState(false)
    // state data
    const [productSelect , setProductSelect ] = useState([])
    const [notifDay , setNotifDay] = useState('DAY_1')
    const [notifMonth , setNotifMonth] = useState('MONTH_1')
    const [notifHour , setNotifHour] = useState('MINUTES_30')
    const [lastLogin , setLastLogin] = useState('')
    const [lastChange , setLastChange] = useState('')
    const [lastUpload , setLastUpload] = useState('')
    const [settingsData , setSettingsData] = useState([])

    const fetchUserActivityHistory = async () => {
        try {
            const res = await getUserActivityHistory()

            if(res.status == 'OK'){
                setLastLogin(convertToIndonesianDate(res.data.lastLogin))
                setLastChange(res.data.lastChangePermission ? convertToIndonesianDate(res.data.lastChangePermission) : 'Data Kosong')
                setLastUpload(res.data.lastUploadContent ? convertToIndonesianDate(res.data.lastUploadContent) : 'Data Kosong')
            }
        } catch (error) {
            toast.error(error.data.message)
        }
    }

    const fetchUserSettings = async () => {
        const res = await getUserSettings()
        if(res.status == 'OK'){
            setSettingsData(res.data)
            setNotifDay(res.data?.account.reminderExpiresInSubscription)
            setNotifHour(res.data?.security.autoLogOut)
            setNotifMonth(res.data?.security.updatePlatform)
        }
    }
    
    const fetchUpdateUserSettings = async (payload , params) => {
        const res = await editUserSettings(payload , params)
        if(res.status == 'OK'){
            fetchUserSettings()
            toast.success('Update Pengaturan Berhasil')
            fetchUserActivityHistory()
        }
    }

    const notifyFetchUpdateUserSettings = (payload , params) => {
        AppToastPending(fetchUpdateUserSettings(payload , params))
    }

    const handleDropDownDay = (event)=>{
        setNotifDay(event.target.value)
        notifyFetchUpdateUserSettings({value : event.target.value} , 'reminderExpiresInSubscription')
    }
    const handleDropDown = (event)=>{
        setNotifMonth(event.target.value)
    }
    
    const handleDropDownNotifHour = (event)=>{
        setNotifHour(event.target.value)
        notifyFetchUpdateUserSettings({value : event.target.value} , 'autoLogOut')
    }

    useEffect(()=>{
        fetchUserActivityHistory()
        fetchUserSettings()
    },[])

    return(
        <AppLayout title={'Profil > Pengaturan'} >
            <AppModalProductList
                open ={modalProductList}
                onCloseButton = { value => setModalProductList(value)}
                onClick = {(value) => {
                    const thirdParty = []
                    const currentData = value.platform
                    const keys = Object.keys(currentData);

                    for(let i = 0; i < 3 ; i++){
                        if(currentData[keys[i]]){
                            thirdParty.push({
                                platform : keys[i],
                                accessDate: convertToIndonesianDate(value.platformInfo[keys[i]].date),
                                idProduct : value.idProduct
                            })

                        }
                    }

                    setProductSelect(thirdParty)
                    setModalThirdParty(true)
                    setModalProductList(false)
                }}
            />
            <AppModalThirdParty
                data={productSelect}
                open ={modalThirdParty}
                onCloseButton = { value => setModalThirdParty(value)}
            />

            <Box className = 'grow h-[86%] p-[20px] flex flex-col gap-[20px] overflow-x-hidden scrollbar scrollbar-w-[8px] scrollbar-h-[10px] scrollbar-track-transparent scrollbar-thumb-gray-100 scrollbar-thumb-rounded-full'>
                <Box className='w-[100%] h-[100%] rounded-[20px] flex flex-col gap-[20px] '>
                    <p className="text-TEXT-1 font-bold text-[16px]">Riwayat Aktivitas</p> 
                    <Grid container  justifyContent="flex-center" alignItems="flex-center" spacing={2} className="w-[100%]" >
                        {
                            historyActivity.map((data , index) => {
                                return (
                                    <Grid key={index} xs={12} xl={4} lg={4} md={12} sm={12} item>
                                        <Box className='flex gap-[10px] items-center bg-NEUTRAL-100 p-[10px] rounded-[20px]'>
                                            <img className="w-[60px] h-[60px]" src={data.icon} alt="icon-settings" />
                                            <Box className='flex flex-col gap-[8px]'>
                                                <p className="text-TEXT-1 text-[16px] font-bold">{data.title}</p>
                                                <p className="text-TEXT-1 text-[12px] ">{
                                                    index == 0 ? lastLogin : index == 1 ? lastChange : index == 2 ? lastUpload : ''
                                                }</p>
                                            </Box>
                                        </Box>
                                    </Grid>
                                )
                            })
                        }
                    </Grid>
                    <Box className='w-[100%] flex flex-col gap-[10px] items-start bg-NEUTRAL-100 p-[20px] rounded-[20px] '>
                        {/*  */}
                        <Box className='flex flex-col gap-[10px]'>
                            <p className="text-TEXT-1 font-bold text-[16px]">Notifikasi</p> 
                            <AppCheckBox
                                value= {'true'}
                                checked={settingsData.news}
                                label = 'Dapatkan informasi terkait fitur baru dan diskon paket yang tersedia'
                                onChange= {(value , label)=>{
                                    notifyFetchUpdateUserSettings({news : !settingsData.news} , 'news')
                                }}
                            />
                        </Box>
                        {/*  */}
                        <Box className='flex flex-col gap-[10px] w-[100%]'>
                            <p className="text-TEXT-1 font-bold text-[16px]">Konektivitas</p> 
                            <Box className='flex flex-col gap-[10px] pl-[20px]'>
                                <AppCheckBox
                                    value= 'true'
                                    checked={settingsData.connectivity?.statusPlatform || false}
                                    label = 'Status konektivitas (berhasil/gagal)'
                                    onChange= {(value , label)=>{
                                        notifyFetchUpdateUserSettings({statusPlatform : !settingsData.connectivity?.statusPlatform} , 'statusPlatform')
                                    }}
                                />
                                <AppCheckBox
                                    value= 'true'
                                    checked={settingsData.connectivity?.notificationExpiresInPlatform}
                                    label = 'Himbauan untuk perbarui konektivitas'
                                    onChange= {(value , label)=>{
                                        notifyFetchUpdateUserSettings({notificationExpiresInPlatform : !settingsData.connectivity?.notificationExpiresInPlatform} , 'notificationExpiresInPlatform')
                                    }}
                                />
                            </Box>
                        </Box>
                        {/*  */}
                        <Box className='flex flex-col gap-[10px]'>
                            <p className="text-TEXT-1 font-bold text-[16px]">Akun</p> 
                            <Box className='flex flex-col gap-[10px] pl-[20px]'>
                                <AppCheckBox
                                    value= 'true'
                                    checked={settingsData.account?.changeDataAccount}
                                    label = 'Riwayat ubah data akun'
                                    onChange= {(value , label)=>{
                                        notifyFetchUpdateUserSettings({changeDataAccount : !settingsData.account?.changeDataAccount} , 'changeDataAccount')
                                    }}
                                    />
                                <AppCheckBox
                                    value= 'true'
                                    checked={settingsData.account?.notificationExpiresInSubscription}
                                    label = 'Himbauan paket berlangganan telah berakhir'
                                    onChange= {(value , label)=>{
                                        notifyFetchUpdateUserSettings({notificationExpiresInSubscription : !settingsData.account?.notificationExpiresInSubscription} , 'notificationExpiresInSubscription')  
                                    }}
                                />
                                <Box className='flex gap-[10px] items-center  '>
                                    <p className="text-TEXT-1 text-[14px] break-words">Himbauan paket berlangganan berakhir dalam : </p>
                                    <Box className='w-[30%]'>
                                        <AppDropDown
                                                sx={{
                                                    borderRadius: "15px",
                                                    height:'30px',
                                                    backgroundColor: '#E9ECEF',
                                                    width:"30%",
                                                    fontSize:'12px',
                                                    borderColor: 'transparent',
                                                    width:'100%'
                                                }}
                                                value={notifDay}
                                                placeholder={'1 Hari'}
                                                listItem = {listDropNotifDay}
                                                onChange={handleDropDownDay}
                                            />
                                    </Box>
                                </Box>
                            </Box>
                        </Box>
                        {/*  */}
                        <Box className='flex flex-col gap-[10px]'>
                            <p className="text-TEXT-1 font-bold text-[16px]">Pembayaran</p> 
                            <Box className='flex flex-col gap-[10px] pl-[20px]'>
                                <AppCheckBox
                                    value= 'true'
                                    label = 'Batas Waktu Pembayaran'
                                    checked={settingsData.payment?.expiresInPayment}
                                    onChange= {(value , label)=>{
                                        notifyFetchUpdateUserSettings({expiresInPayment : !settingsData.payment?.expiresInPayment} , 'expiresInPayment')  
                                    }}
                                    />
                                <AppCheckBox
                                    value= 'true'
                                    label = 'Status Pembayaran'
                                    checked={settingsData.payment?.statusPayment}
                                    onChange= {(value , label)=>{
                                        notifyFetchUpdateUserSettings({statusPayment : !settingsData.payment?.statusPayment} , 'statusPayment')  
                                    }}
                                    />
                            </Box>
                        </Box>
                        {/*  */}
                        <Box className='flex flex-col gap-[10px]'>
                            <p className="text-TEXT-1 font-bold text-[16px]">Konten</p> 
                            <Box className='flex flex-col gap-[10px] pl-[20px]'>
                                <AppCheckBox
                                    value= 'true'
                                    label = 'Keberhasilan posting'
                                    checked={settingsData.content?.statusPost}
                                    onChange= {(value , label)=>{
                                        notifyFetchUpdateUserSettings({statusPost : !settingsData.content?.statusPost} , 'statusPost')  
                                        
                                    }}
                                    />
                                <AppCheckBox
                                    value= 'true'
                                    label = 'Himbauan tingkat keoptimalan produk'
                                    checked={settingsData.content?.optimalLevel}
                                    onChange= {(value , label)=>{
                                        notifyFetchUpdateUserSettings({optimalLevel : !settingsData.content?.optimalLevel} , 'optimalLevel')  

                                    }}
                                />
                            </Box>
                        </Box>
                        {/*  */}
                        <Box className='h-[1px] w-[100%] bg-TEXT-3'>-</Box>
                        {/*  */}
                        <Box className='flex flex-col gap-[10px]'>
                            <p className="text-TEXT-1 font-bold text-[16px]">Keamanan</p> 
                            <Box className='flex gap-[10px] items-center '>
                                <AppCheckBox
                                    value= 'true'
                                    checked={settingsData.connectivity?.notificationExpiresInPlatform}
                                    label = 'Berikan himbauan aktivitas mencurigakan dalam akun'
                                    onChange= {(value , label)=>{
                                        notifyFetchUpdateUserSettings({notificationExpiresInPlatform : !settingsData.connectivity?.notificationExpiresInPlatform} , 'notificationExpiresInPlatform')
                                    }}
                                />
                            </Box>
                            <p onClick={()=> {setModalProductList(true)}} className="text-PRIMARY-400 text-[14px] underline cursor-pointer ">Akses Aplikasi pihak ketiga</p>     
                        </Box>
                    </Box>
                    
                </Box>
            </Box>
        </AppLayout>
    ) 
}

export default SettingsPage;