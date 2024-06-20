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
import images from '@/public/images/images'

const AppModalSuccessPay = (props) => {

    return(
        <Modal 
            open={props.open}
            className='flex flex-col justify-center items-center'
        >
                <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.2 }}
                    className = ' w-[80%] xl:w-[30%] h-auto rounded-[20px] bg-white p-[20px] '>
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
                            {/*  */}
                            <Box className='flex items-center gap-[10px] bg-STATE-GREEN-BASE bg-opacity-[20%] p-[15px] rounded-[15px]'>
                                <img className='w-[24px] h-[24px] ' src={images.icon.success} />
                                <Box className='flex flex-col items-start justify-center'>
                                    <p className='flex text-STATE-GREEN-DARKEN text-[14px]'>Pembayaran Berhasil Dilakukan pada : </p>
                                    <p className='flex text-STATE-GREEN-DARKEN text-[14px] font-bold'>{props.updatedAt}</p>
                                </Box>
                            </Box>
                            {/*  */}

                            <Box className='flex items-center justify-between rounded-[15px]'>
                                <Box className='flex flex-col '>
                                    <p className='flex text-TEXT-1 text-[16px] font-bold'>{props.packet}</p>
                                    <p className='flex text-TEXT-4 text-[12px]'>{props.dateSubscription}</p>

                                </Box>
                                <p className='flex text-TEXT-1 text-[16px] font-bold'>{props.price}</p>
                            </Box>
                        </Box>
                        
                    </Box>
                </motion.div>
        </Modal>
    )
}

export default AppModalSuccessPay;