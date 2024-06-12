'use client'

import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box'
import AppCloseButton from '@/app/components/appCloseButton/appCloseButton';
import AppButton from '@/app/components/appButton/appButton';
import { motion } from 'framer-motion';

const AppModalConnection = (props) => {
    return(
        <Modal
            open={props.open}
            className='flex flex-col justify-center items-center'
        >
            <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.2 }}
                className = ' w-[80%] md:w-[40%] lg:w-[40%]  xl:w-[30%] h-auto rounded-[20px] bg-white p-[20px] '>
                <Box  className='flex flex-col gap-[25px]'>
                    <Box className = 'flex justify-between'>
                        <p className = 'text-[16px] font-bold text-black' >Hubungkan {props.platform}</p>
                        <AppCloseButton
                            onClick = {()=>{
                                props.onCloseButton(false)
                            }}
                        />
                    </Box>
                    
                    <Box className='flex gap-[20px] items-center justify-center w-[100%]'>
                            <img alt='img-platform' className=' w-[50px] xl:w-[80px] h-[50px] xl:h-[80px] rounded-[100%]' src={props.imagePlatform} />
                            <img alt='img-platform' className='w-[auto] h-[30px] xl:h-[50px] ' src={'/images/icon/connect.svg'} />
                            <img alt='img-platform' className=' w-[50px] xl:w-[80px] h-[50px] xl:h-[80px] ' src={'/images/icon/logo/planify.png'} />
                    </Box>

                    <Box className='flex flex-col gap-[10px]'>
                        <p className = 'text-[18px] font-bold text-black' >Hubungkan akun {props.platform} ke Planify</p>
                        <p className = 'text-[16px]  text-black' >Kami akan menghubungkanmu ke halaman <b>{props.platform}</b>. Masuk dengan akun yang sudah terdaftar atau buat akun baru untuk menghubungkan akunmu!</p>
                        <p className = 'text-[16px]  text-black' >Pastikan memberikan akses kepada <b className='text-PRIMARY-500'>Planify</b> dan nikmati kemudahan pengunggahan konten dengan kami.</p>
                    </Box>
                    
                    <Box className='w-[100%] flex justify-end '>
                            <Box className=' w-[60%] md:w-[30%] lg:w-[30%]  xl:w-[30%]'>
                                <AppButton
                                    text={'Selanjutnya'} 
                                    type = {'button'}
                                    fontSize = {'12px'}
                                    onClick = {()=>{
                                        props.onClick()
                                    }}
                                />
                            </Box>
                    </Box>
                </Box>
            </motion.div>
        </Modal>
    )
}

export default AppModalConnection;