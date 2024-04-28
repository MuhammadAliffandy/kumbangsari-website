'use client'
import AppTablePayment from "@/app/components/appTable/appTablePayment";
import AppLayout from "../../component/appLayout";
import AppButton from "@/app/components/appButton/appButton";
import { formatRupiahNumber } from "@/app/utils/helper";
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import LinearProgress from '@mui/material/LinearProgress';


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

const createDataPayment = (date, packet, price, status, ) => {
    return { date, packet, price, status,  };
}

const dataPaymentTable = [
    createDataPayment('15 Desember 2023', 'Paket Dasar', 'Rp 100.000,00', 'success'),
    createDataPayment('15 Desember 2023', 'Paket Dasar', 'Rp 100.000,00', 'waiting'),
    createDataPayment('15 Desember 2023', 'Paket Dasar', 'Rp 100.000,00', 'waiting'),
    createDataPayment('15 Desember 2023', 'Paket Dasar', 'Rp 100.000,00', 'waiting'),
    createDataPayment('15 Desember 2023', 'Paket Dasar', 'Rp 100.000,00', 'waiting'),
    createDataPayment('15 Desember 2023', 'Paket Dasar', 'Rp 100.000,00', 'waiting'),
];

const SubscriptionPage = () => {
    return(
        <AppLayout title={'Profil > Berlangganan'} >
            <Box className='grow h-[86%] bg-NEUTRAL-100 p-[20px] flex flex-col gap-[20px]'>
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
                <Box className='flex-none h-auto w-[100%] flex flex-col border-[1px] border-TEXT-4 rounded-[20px] overflow-x-hidden scrollbar scrollbar-w-[8px] scrollbar-h-[10px] scrollbar-track-transparent scrollbar-thumb-gray-100 scrollbar-thumb-rounded-full '>
                    <Box className='p-[20px] flex flex-col gap-[15px] '>
                        <Box className='flex gap-[5px]'>
                            <p className="text-PRIMARY-500 font-bold text-[18px]">Paket Dasar</p>
                            <img className="w-[28px] h-[28px]" src="/images/icon/info-packet.svg" />
                        </Box>
                        {/*  */}
                        <Box className='flex gap-[10px] w-[100%] text-[14px]'>
                            <Box className='w-[50%] flex flex-col gap-[8px] p-[10px] rounded-[15px] bg-PRIMARY-100 bg-opacity-[30%]  text-black'>
                                <span className="flex gap-[20px]"><p className="w-[30%]">Jumlah Produk</p><p>: 1</p></span>
                                <span className="flex gap-[20px]"><p className="w-[30%]">Tanggal Pembelian</p><p>: 1 Desemeber 2023</p></span>
                                <span className="flex gap-[20px]"><p className="w-[30%]">Tanggal Berakhir</p><p>: 1</p></span>
                            </Box>
                            <Box className='grow flex flex-col gap-[8px] p-[10px] rounded-[15px] bg-PRIMARY-100 bg-opacity-[30%] text-black font-bold'>
                                <span className="flex gap-[20px]"><p className="w-[30%]">Generate AI</p><p>: 1</p></span>
                                <LinearProgress
                                    sx={{
                                        height: 6,
                                        borderRadius: 5,
                                    }}
                                    variant="determinate"
                                    value={50} 
                                />
                                <span className="flex gap-[20px]"><p className="w-[30%]">Auto Post</p><p>: 1 Desemeber 2023</p></span>
                                <LinearProgress
                                    sx={{
                                        height: 6,
                                        borderRadius: 5,
                                    }}
                                    variant="determinate"
                                    value={50} 
                                />
                            </Box>
                        </Box>
                        {/*  */}
                        <Box className='flex gap-[10px] justify-end'> 
                                <AppButton
                                    className={' flex text-white gap-[10px] w-auto justify-center items-center text-[12px] bg-NEUTRAL-500 rounded-[12px] px-[25px] py-[8px] shadow-xl'}
                                    text={'Berhenti Langganan'} 
                                    type = {'Submit'}
                                    onClick = {()=>{

                                    }}
                                />
                                <AppButton
                                    className={' flex text-white gap-[10px] w-auto justify-center items-center text-[12px] bg-SECONDARY-500 rounded-[12px] px-[40px] py-[8px] shadow-xl'}
                                    text={'Ubah Paket'} 
                                    type = {'Submit'}
                                    onClick = {()=>{

                                    }}
                                />
                        </Box>
                    </Box>
                </Box>
                <Box className='grow w-[100%] flex flex-col border-[1px] border-TEXT-4 rounded-[20px] overflow-x-hidden scrollbar scrollbar-w-[8px] scrollbar-h-[10px] scrollbar-track-transparent scrollbar-thumb-gray-100 scrollbar-thumb-rounded-full '>
                    <Box className='p-[20px] flex flex-col gap-[15px]'>
                        <p className="text-TEXT-1 font-bold text-[16px]">Riwayat Pembayaran</p> 
                        <AppTablePayment
                            data={dataPaymentTable}
                            onClick={()=>{}}
                        />
                    </Box>
                </Box>
            </Box>
            
        </AppLayout>
    )
}

export default SubscriptionPage;