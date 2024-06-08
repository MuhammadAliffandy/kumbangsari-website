import { motion } from 'framer-motion';
import { Popover } from 'react-tiny-popover';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import AppCustomButton from '@/app/components/appButton/appCustomButton';
import AppButton from '@/app/components/appButton/appButton';
import Skeleton from 'react-loading-skeleton'
import { useState } from 'react';

const AppPopupImage = (props) => {
    const [open, setOpen] = useState(false);

    return (
        <Popover
            isOpen={open}
            positions={[ 'left', 'bottom']}
            containerStyle={{ zIndex: 1300 , paddingLeft: props.isDashboard ? '6%' : '6%' , paddingRight : props.isDashboard ? '15%' : '0%'}}
            align="center"
            content={
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    onMouseEnter={() => {setOpen(true)}}
                    onMouseLeave = {() => { setOpen(false)}}
                    className = {`${props.images.length == 0  ? 'w-[auto]' : 'w-[100%]'} h-auto rounded-[20px] bg-white p-[20px] flex flex-col gap-[15px] border-[2px] border-TEXT-1 shadow-xl`}>
                    {/* headline */}
                    <Box className = 'flex justify-between'>
                        <p className = 'text-[18px] font-bold text-black' >Rekomendasi Gambar</p>
                    </Box>
                    {/* content  */}
                    <Box className={`flex flex-col gap-[15px] w-[100%] h-auto`}>
                    {
                        <Grid container spacing={2} >
                            {
                                props.images.length == 0 && props.isDashboard ? null :
                                props.images.length != 0 ?

                                props.images.map((data,index)=>{
                                    return(
                                        <Grid onClick={()=>{props.onClick(data)}} item xs={4} key={index}>
                                            <Box>
                                                <img className='cursor-pointer w-[300px] h-[200px] object-cover rounded-[15px]' src={data} />
                                            </Box>
                                        </Grid>
                                    )
                                })   

                                : 
                                <>
                                    <Grid  item xs={4} >
                                        <Box className='w-[15vw]'>
                                            <Skeleton count={1} className="w-[20vw] h-[200px] "/>
                                        </Box>
                                    </Grid>
                                    <Grid  item xs={4} >
                                        <Box className='w-[15vw]'>
                                            <Skeleton count={1} className="w-[20vw] h-[200px] "/>
                                        </Box>
                                    </Grid>
                                    <Grid  item xs={4} >
                                        <Box className='w-[15vw]'>
                                            <Skeleton count={1} className="w-[20vw] h-[200px] "/>
                                        </Box>
                                    </Grid>
                        
                                </>
                            }
                        </Grid>
                    }
                    {
                        props.images.length != 0  ? null : 
                        
                        props.isDashboard ? 

                        <AppButton
                            className='w-[30vw] py-[15px] bg-CUSTOM-RED shadow-xl text-white my-[10px] font-poppins rounded-[15px]'
                            text = 'Generate'
                            onClick={()=>{
                                props.onGenerate()
                            }}
                        /> : null
                    }
                    </Box>
                </motion.div>
            }>
            <div className='relative' onMouseLeave={() => {setOpen(false)}}>
                <AppCustomButton
                    className='flex items-center gap-[5px]'
                    onMouseEnter={() => setOpen(true)}
                >
                        <img className='w-[14px] h-[14px]' src='/images/icon/sparkling-blue.png' alt="Sparkling icon" />
                        <p className='text-[12px] text-PRIMARY-500 font-poppins font-semibold'>Tampilkan Rekomendasi AI</p>
                </AppCustomButton>
            </div>
    </Popover>
    )
}

export default AppPopupImage;
