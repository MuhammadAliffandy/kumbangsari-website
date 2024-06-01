import { formatRupiahNumber } from "@/app/utils/helper";
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import AppButton from "@/app/components/appButton/appButton";

export const subscriptionList = [
    {
        title: 'Paket Dasar',
        subtitle: 'Cocok Untuk Pemula',
        image : '/images/icon/paket/basic.svg',
        price : 100000,
        benefit : [
            'Rekomendasi Konten',
            'Jadwal dan Kalender',
            '1 Produk',
            'Semua Platform',
            '50 Generate AI / Hari',
            '15 Autopost'
        ]
    },
    {
        title: 'Paket Premium',
        subtitle: 'Cocok Untuk Menengah',
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
        subtitle: 'Cocok Untuk Profesional',
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

const SubscriptionList = (props) => {
    return (
        <>
            <Grid container  justifyContent="flex-center" alignItems="flex-center" spacing={2} className="p-[20px] h-[80vh] md:h-[100%] lg:h-[100%] xl:h-[100%] overflow-y-scroll scrollbar scrollbar-w-[8px] scrollbar-h-[10px] scrollbar-track-transparent scrollbar-thumb-gray-300 scrollbar-thumb-rounded-full " >
                {
                    subscriptionList.map((data,index)=>{
                        return(
                            <Grid key={index} item  xs={12} xl={4} lg={4} md={4} >
                                <Box className='hover:shadow-xl text-black flex flex-col items-center gap-[10px] bg-white p-[20px] border-[1px] border-TEXT-4  rounded-[20px]' >
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
                                                        <span key={index} className="flex">
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
                                                props.onClick({...data,codeNumber : index + 1})
                                            }}
                                        />
                                    </Box>
                                </Box>
                            </Grid>
                        )
                    })
                }
            </Grid> 
        </>
    )
}

export default SubscriptionList;