import AppLayout from "../../component/appLayout"
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'



const SettingsPage = () => {
    return(
        <AppLayout title={'Pengaturan'} >
            <Box className = 'grow h-[86%] bg-NEUTRAL-100 p-[20px] flex flex-col gap-[20px]'>
                <Box className='bg-red-500 w-[100%] h-[100%] rounded-[20px] flex flex-col'>
                    <p className="text-TEXT-1 font-bold text-[16px]">Riwayat Aktivitas</p> 
                    <Grid container  justifyContent="flex-center" alignItems="flex-center" spacing={2} className="w-[100%]" >
                        {/* {
                            exampleProduct.map(data => {
                                return (
                                    <Grid xs={4} item>
                                        <Box className='p-[20px] bg-NEUTRAL-100 rounded-[20px] flex flex-col gap-[8px] hover:shadow-xl'>
                                            <p className="text-TEXT-3 text-[12px]">{data.productName}</p>
                                            <Box className='flex justify-between items-center'>
                                                <Box className='flex flex-col'>
                                                    <p className="text-TEXT-1 text-[28px] font-bold">14.000</p>
                                                    <span className="flex gap-[10px] items-center">
                                                        <img src="/images/icon/analyst/traffic-up.svg" alt="icon-grow"/>
                                                        <p className="text-STATE-GREEN-BASE text-[12px] font-bold">15%</p>
                                                    </span>
                                                </Box>
                                                <img src="/images/icon/analyst/growth-up.svg" alt="icon-grow" className="w-auto h-[60px]"/>
                                            </Box>
                                        </Box>
                                    </Grid>
                                )
                            })
                        } */}
                    </Grid>
                </Box>
            </Box>
        </AppLayout>
    ) 
}

export default SettingsPage;