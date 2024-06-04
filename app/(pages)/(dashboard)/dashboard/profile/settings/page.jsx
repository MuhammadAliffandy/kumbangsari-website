'use client'

import AppLayout from "../../component/appLayout"
import AppCheckBox from "@/app/components/appCheckBox/appCheckBox"
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import AppModalThirdParty from './component/appModalThirdParty'
import AppModalProductList from './component/appModalProductList'
import AppDropDown from "@/app/components/appDropDown/appDropDown"
import { useEffect, useState } from "react"
import { listDropNotifHour, listDropNotifMonth } from "@/app/utils/model"
import { convertToIndonesianDate } from "@/app/utils/helper"
import { toast } from "react-toastify"
import { getUserActivityHistory, getUserSettings } from "@/app/api/repository/userRepository"


const historyActivity = [
    {
        title : 'Terakhir Login',
        logData : '15 September 2024',
        icon : '/images/icon/settings/profile.svg'
    },
    {
        title : 'Terakhir Ubah Izin',
        logData : '15 September 2024',
        icon : '/images/icon/settings/shield.svg'
    },
    {
        title : 'Terakhir Unggah Konten',
        logData : '15 September 2024',
        icon : '/images/icon/settings/gallery.svg'
    },
]

const SettingsPage = () => {
    // state modal
    const [modalThirdParty , setModalThirdParty ] = useState(false)
    const [modalProductList , setModalProductList ] = useState(false)
    // state data
    const [productSelect , setProductSelect ] = useState([])
    const [notifMonth , setNotifMonth] = useState('1m')
    const [notifHour , setNotifHour] = useState('1h')
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
            toast.error('Ada Kesalahan Server')
        }
    }

    const fetchUserSettings = async () => {
        const res = await getUserSettings()
        if(res.status == 'OK'){
            console.log(res.data)
            setSettingsData(res.data)
        }
    }
    
    const handleDropDown = (event)=>{
        setNotifMonth(event.target.value)
    }

    const handleDropDownNotifHour = (event)=>{
        setNotifHour(event.target.value)
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

            <Box className = 'grow h-[86%]  p-[20px] flex flex-col gap-[20px]'>
                <Box className='w-[100%] h-[100%] rounded-[20px] flex flex-col gap-[20px]'>
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
                    <Box className='w-[100%] flex flex-col gap-[10px] items-start bg-NEUTRAL-100 p-[20px] rounded-[20px] overflow-x-hidden scrollbar scrollbar-w-[8px] scrollbar-h-[10px] scrollbar-track-transparent scrollbar-thumb-gray-100 scrollbar-thumb-rounded-full'>
                        {/*  */}
                        <Box className='flex flex-col gap-[10px]'>
                            <p className="text-TEXT-1 font-bold text-[16px]">Notifikasi</p> 
                            <AppCheckBox
                                value= {'true'}
                                checked={settingsData.news}
                                label = 'Dapatkan informasi terkait fitur baru dan diskon paket yang tersedia'
                                onChange= {(value , label)=>{

                                }}
                            />
                            {/* <AppCheckBox
                                value= 'true'
                                label = 'Letakkan notifikasi yang belum dibaca di bagian paling atas'
                                onChange= {(value , label)=>{

                                }}
                            /> */}
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

                                    }}
                                />
                                <AppCheckBox
                                    value= 'true'
                                    checked={settingsData.connectivity?.reminder}
                                    label = 'Himbauan untuk perbarui konektivitas'
                                    onChange= {(value , label)=>{

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
                                    checked={settingsData.account?.historyUpdateAccount}
                                    label = 'Riwayat ubah data akun'
                                    onChange= {(value , label)=>{
                                        
                                    }}
                                    />
                                <AppCheckBox
                                    value= 'true'
                                    checked={settingsData.account?.notificationSubscription}
                                    label = 'Himbauan paket berlangganan telah berakhir'
                                    onChange= {(value , label)=>{

                                    }}
                                />
                                <Box className='flex gap-[10px] items-center  '>
                                    <p className="text-TEXT-1 text-[14px] whitespace-nowrap">Himbauan paket berlangganan berakhir dalam : </p>
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
                                                value={notifMonth}
                                                placeholder={'1 Bulan'}
                                                listItem = {listDropNotifMonth}
                                                onChange={handleDropDown}
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
                                    checked={settingsData.payment?.reminder}
                                    onChange= {(value , label)=>{
                                        
                                    }}
                                    />
                                <AppCheckBox
                                    value= 'true'
                                    label = 'Status Pembayaran'
                                    checked={settingsData.payment?.status}
                                    onChange= {(value , label)=>{

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
                                    checked={settingsData.content?.notification}
                                    onChange= {(value , label)=>{
                                        
                                    }}
                                    />
                                <AppCheckBox
                                    value= 'true'
                                    label = 'Himbauan tingkat keoptimalan produk'
                                    checked={settingsData.content?.optimalProduct}
                                    onChange= {(value , label)=>{

                                    }}
                                />
                            </Box>
                        </Box>
                        {/*  */}
                        <Box className='h-[1px] w-[100%] bg-TEXT-3'>-</Box>
                        {/*  */}
                        <Box className='flex flex-col gap-[10px]'>
                            <p className="text-TEXT-1 font-bold text-[16px]">Keamanan</p> 
                            <Box className='flex gap-[10px] items-center'>
                                <p className="text-TEXT-1 text-[14px] whitespace-nowrap">Perbarui konektivitas dalam kurun waktu : </p>
                                <Box className='w-[30%]'>
                                    <AppDropDown
                                            sx={{
                                                borderRadius: "15px",
                                                height:'30px',
                                                backgroundColor: '#E9ECEF',
                                                width:"30%",
                                                fontSize:'12px',
                                                borderColor: 'transparent',
                                                width:'60%'
                                            }}
                                            value={notifMonth}
                                            placeholder={'1 Bulan'}
                                            listItem = {listDropNotifMonth}
                                            onChange={handleDropDown}
                                        />
                                </Box>
                            </Box>     
                            <Box className='flex gap-[10px] items-center '>
                                <p className="text-TEXT-1 text-[14px] whitespace-nowrap">Keluar secara otomatis apabila tidak ada aktivitas dalam waktu: </p>
                                <Box className='w-[50%]'>
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
                                            value={notifHour}
                                            placeholder={'30 Menit'}
                                            listItem = {listDropNotifHour}
                                            onChange={handleDropDownNotifHour}
                                        />
                                </Box>
                            </Box>
                            <AppCheckBox
                                    value= 'true'
                                    label = 'Berikan himbauan aktivitas mencurigakan dalam akun'
                                    onChange= {(value , label)=>{

                                    }}
                                />
                            <p onClick={()=> {setModalProductList(true)}} className="text-PRIMARY-400 text-[14px] underline cursor-pointer ">Akses Aplikasi pihak ketiga</p>     
                        </Box>
                    </Box>
                </Box>
            </Box>
        </AppLayout>
    ) 
}

export default SettingsPage;