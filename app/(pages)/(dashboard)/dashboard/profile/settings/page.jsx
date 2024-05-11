'use client'

import AppLayout from "../../component/appLayout"
import AppCheckBox from "@/app/components/appCheckBox/appCheckBox"
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import AppModalThirdParty from './component/appModalThirdParty'
import AppDropDown from "@/app/components/appDropDown/appDropDown"
import { useState } from "react"
import { listDropNotifHour, listDropNotifMonth } from "@/app/utils/model"


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
    // state data
    const [notifMonth , setNotifMonth] = useState('1m')
    const [notifHour , setNotifHour] = useState('1h')
    
    const handleDropDown = (event)=>{
        setNotifMonth(event.target.value)
    }

    const handleDropDownNotifHour = (event)=>{
        setNotifHour(event.target.value)
    }

    return(
        <AppLayout title={'Profil > Pengaturan'} >
            <AppModalThirdParty
                open ={modalThirdParty}
                onCloseButton = { value => setModalThirdParty(value)}
            />
            <Box className = 'grow h-[86%]  p-[20px] flex flex-col gap-[20px]'>
                <Box className='w-[100%] h-[100%] rounded-[20px] flex flex-col gap-[20px]'>
                    <p className="text-TEXT-1 font-bold text-[16px]">Riwayat Aktivitas</p> 
                    <Grid container  justifyContent="flex-center" alignItems="flex-center" spacing={2} className="w-[100%]" >
                        {
                            historyActivity.map(data => {
                                return (
                                    <Grid xs={12} xl={4} lg={4} md={12} sm={12} item>
                                        <Box className='flex gap-[10px] items-center bg-NEUTRAL-100 p-[10px] rounded-[20px]'>
                                            <img className="w-[40px] h-[40px]" src={data.icon} alt="icon-settings" />
                                            <Box className='flex flex-col gap-[8px]'>
                                                <p className="text-TEXT-1 text-[16px] font-bold">{data.title}</p>
                                                <p className="text-TEXT-1 text-[12px] ">{data.logData}</p>
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
                                value= 'true'
                                label = 'Dapatkan informasi terkait fitur baru dan diskon paket yang tersedia'
                                onChange= {(value , label)=>{

                                }}
                            />
                            <AppCheckBox
                                value= 'true'
                                label = 'Letakkan notifikasi yang belum dibaca di bagian paling atas'
                                onChange= {(value , label)=>{

                                }}
                            />
                        </Box>
                        {/*  */}
                        <Box className='flex flex-col gap-[10px] w-[100%]'>
                            <p className="text-TEXT-1 font-bold text-[16px]">Konektivitas</p> 
                            <Box className='flex flex-col gap-[10px] pl-[20px]'>
                                <AppCheckBox
                                    value= 'true'
                                    label = 'Status konektivitas (berhasil/gagal)'
                                    onChange= {(value , label)=>{

                                    }}
                                />
                                <AppCheckBox
                                    value= 'true'
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
                                    label = 'Riwayat ubah data akun'
                                    onChange= {(value , label)=>{

                                    }}
                                />
                                <AppCheckBox
                                    value= 'true'
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
                                    onChange= {(value , label)=>{

                                    }}
                                />
                                <AppCheckBox
                                    value= 'true'
                                    label = 'Status Pembayaran'
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
                                    label = 'Keberhasilan autopost'
                                    onChange= {(value , label)=>{

                                    }}
                                />
                                <AppCheckBox
                                    value= 'true'
                                    label = 'Himbauan tingkat keoptimalan produk'
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
                            <p onClick={()=> {setModalThirdParty(true)}} className="text-PRIMARY-400 text-[14px] underline cursor-pointer ">Akses Aplikasi pihak ketiga</p>     
                        </Box>
                    </Box>
                </Box>
            </Box>
        </AppLayout>
    ) 
}

export default SettingsPage;