import { motion } from 'framer-motion';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import AppTextField from '@/app/components/appTextField/appTextField'
import AppButton from '@/app/components/appButton/appButton'
import AppCloseButton from '@/app/components/appCloseButton/appCloseButton'
import {  validatePassword, } from '@/app/(pages)/(auth)/auth/component/validation';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

const AppModalPendingPay = (props) => {
    

    return(
        <Modal 
            open={props.open}
            className='flex flex-col justify-center items-center'
        >
                <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.2 }}
                    className = 'w-[30%] h-auto rounded-[20px] bg-white p-[20px] '>
                    <Box  className='flex flex-col gap-[25px]'>
                        <Box className = 'flex justify-between'>
                            <p className = 'text-[16px] font-bold text-black' >Detail Pembayaran</p>
                            <AppCloseButton
                                onClick = {()=>{
                                    props.onCloseButton(false)
                                }}
                            />
                        </Box>
                        
                        <Box className='flex flex-col gap-[10px]'>
                            <Box className='flex items-center justify-center gap-[10px]'>
                                <p className='p-[15px] bg-PRIMARY-400 text-white text-[24px] rounded-[15px]'>00</p>
                                <p className='text-TEXT-3 text-[18px] font-bold'>:</p>
                                <p className='p-[15px] bg-PRIMARY-400 text-white text-[24px] rounded-[15px]'>00</p>
                                <p className='text-TEXT-3 text-[18px] font-bold'>:</p>
                                <p className='p-[15px] bg-PRIMARY-400 text-white text-[24px] rounded-[15px]'>00</p>
                            </Box>

                            {/*  */}
                            <Box className='flex items-center gap-[10px] bg-STATE-YELLOW-BASE bg-opacity-[20%] p-[15px] rounded-[15px]'>
                                <img className='w-[24px] h-[24px] ' src='/images/icon/pending.svg' />
                                <Box className='flex flex-col items-start justify-center'>
                                    <p className='flex text-STATE-YELLOW-DARKEN text-[14px]'>Pembayaran Berhasil Dilakukan pada : </p>
                                    <p className='flex text-STATE-YELLOW-DARKEN text-[14px] font-bold'>17.00 15 Desember 2023</p>
                                </Box>
                            </Box>
                            {/*  */}

                            <Box className='flex items-center justify-between rounded-[15px]'>
                                <Box className='flex flex-col '>
                                    <p className='flex text-TEXT-1 text-[16px] font-bold'>Paket Dasar</p>
                                    <p className='flex text-TEXT-4 text-[12px]'>15 Januari 2024 - 15 Februari 2024</p>

                                </Box>
                                <p className='flex text-TEXT-1 text-[16px] font-bold'>Rp 100.000</p>
                            </Box>

                            {/*  */}

                            <Box className='w-[100%] h-[1px] bg-TEXT-4'></Box>    
                            
                            <AppButton
                                className={' flex text-white gap-[10px] w-auto justify-center items-center text-[12px] bg-SECONDARY-500 rounded-[12px] px-[40px] py-[8px] shadow-xl'}
                                text={'Lanjutkan Pembayaran'} 
                                type = {'Submit'}
                                onClick = {()=>{

                                }}
                            />

                        </Box>
                    </Box>
                </motion.div>
        </Modal>
    )
}

export default AppModalPendingPay;