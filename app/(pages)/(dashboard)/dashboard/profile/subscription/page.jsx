'use client'
import AppLayout from "../../component/appLayout";
import AppButton from "@/app/components/appButton/appButton";
import { formatRupiahNumber } from "@/app/utils/helper";
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'

const subscriptionList = [
    {
        title: 'Paket Dasar',
        subtitle: 'Cocok Untuk Bla',
        image : '/images/icon/paket/basic.svg',
        price : 100000,
        benefit : [
            'Rekomendasi Konten',
            'Jadwal dan Kalender',
            '1 Produk',
            'Semua Platform',
            '5x Generate AI / Hari',
            'xx Autopost'
        ]
    },
    {
        title: 'Paket Premium',
        subtitle: 'Cocok Untuk Bla',
        image : '/images/icon/paket/premium.svg',
        price : 200000,
        benefit : [
            'Rekomendasi Konten',
            'Jadwal dan Kalender',
            '1 Produk',
            'Semua Platform',
            'Unlimited Generate AI / Hari',
            'Unlimited Autopost'
        ]
    },
    {
        title: 'Paket Profesional',
        subtitle: 'Cocok Untuk Bla',
        image : '/images/icon/paket/pro.svg',
        price : 350000,
        benefit : [
            'Rekomendasi Konten',
            'Jadwal dan Kalender',
            '3 Produk',
            'Semua Platform',
            'Unlimited Generate AI / Hari',
            'Unlimited Autopost'
        ]
    },
]


const SubscriptionPage = () => {
    return(
        <AppLayout title={'Profil > Berlangganan'} >
            <Box className='grow h-[86%] bg-NEUTRAL-100 p-[20px]'>
                {/* <Box className='h-[100%] w-[100%] flex flex-col border-[1px] border-TEXT-4 rounded-[20px] overflow-x-hidden scrollbar scrollbar-w-[8px] scrollbar-h-[10px] scrollbar-track-transparent scrollbar-thumb-gray-100 scrollbar-thumb-rounded-full'>
                    <Grid container  justifyContent="flex-center" alignItems="flex-center" spacing={2} className="p-[20px]" >
                        {
                            subscriptionList.map((data,index)=>{
                                return(
                                    <Grid item xs={4}>
                                        <Box className='text-black flex flex-col items-center gap-[10px] bg-white p-[20px] border-[1px] border-TEXT-4  rounded-[20px]' >
                                            <p className="text-TEXT-1 text-[22px] font-bold">{data.title}</p>
                                            <Box className='flex flex-col items-center gap-[20px] w-[100%]'>
                                                <p>{data.subtitle}</p>
                                                <img className="w-[80px] h-[80px]" src={data.image} alt="image-subscription"  />
                                                <span className="flex items-center gap-[8px]">
                                                    <p className="text-TEXT-3">Rp</p>
                                                    <p className="text-[30px] font-bold">{formatRupiahNumber(data.price)}</p>
                                                    <p className="text-TEXT-3">/bln</p>
                                                </span>
                                                <Box className='flex flex-col gap-[10px]'>
                                                    {
                                                        data.benefit.map((data,index)=>{
                                                            return(
                                                                <span className="flex">
                                                                    <img src={'/images/icon/success-check.svg'} alt="icon-check" />    
                                                                    <p className="text-[14px]">{data}</p>
                                                                </span>
                                                            )
                                                        })
                                                    }
                                                </Box>
                                                <AppButton
                                                    className={' flex text-white gap-[10px] w-[100%] justify-center items-center text-[14px] bg-SECONDARY-500 rounded-[10px] px-[25px] py-[8px] shadow-xl'}
                                                    text={'Beli Paket'} 
                                                    type = {'Submit'}
                                                    onClick = {()=>{

                                                    }}
                                                />
                                            </Box>
                                        </Box>
                                    </Grid>
                                )
                            })
                        }
                    </Grid> 
                </Box> */}
                <Box className='h-[100%] w-[100%] flex flex-col border-[1px] border-TEXT-4 rounded-[20px] overflow-x-hidden scrollbar scrollbar-w-[8px] scrollbar-h-[10px] scrollbar-track-transparent scrollbar-thumb-gray-100 scrollbar-thumb-rounded-full'>
                    
                </Box>
            </Box>
            
        </AppLayout>
    )
}

export default SubscriptionPage;