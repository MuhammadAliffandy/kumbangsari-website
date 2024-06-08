import { motion } from 'framer-motion';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box'
import AppTextField from '@/app/components/appTextField/appTextField'
import AppButton from '@/app/components/appButton/appButton'
import AppCloseButton from '@/app/components/appCloseButton/appCloseButton'
import { useEffect, useState } from 'react';


const AppModalPendingPay = (props) => {

    const calculateTimeLeft = (expiryDate) => {
        
        const countDownDate = new Date(expiryDate).getTime();
        const now = new Date().getTime();
        const distance = countDownDate - now;
    
        let timeLeft = {};
    
        if (distance > 0) {
            timeLeft = {
                hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
                minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
                seconds: Math.floor((distance % (1000 * 60)) / 1000)
            };
        }
    
        return timeLeft;
    };
    
    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(props.expiryDate));

    useEffect(() => {

        
        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft(props.expiryDate));
        }, 1000);

        return () => clearInterval(timer);
    }, [props.open]);

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
                            <Box className='flex items-center justify-center gap-[10px]'>
                                <p className='p-[15px] bg-PRIMARY-400 text-white text-[24px] rounded-[15px]'>{timeLeft.hours || '00'}</p>
                                <p className='text-TEXT-3 text-[18px] font-bold'>:</p>
                                <p className='p-[15px] bg-PRIMARY-400 text-white text-[24px] rounded-[15px]'>{timeLeft.minutes || '00'}</p>
                                <p className='text-TEXT-3 text-[18px] font-bold'>:</p>
                                <p className='p-[15px] bg-PRIMARY-400 text-white text-[24px] rounded-[15px]'>{timeLeft.seconds || '00'}</p>
                            </Box>

                            {/*  */}
                            <Box className='flex items-center gap-[10px] bg-STATE-YELLOW-BASE bg-opacity-[20%] p-[15px] rounded-[15px]'>
                                <img className='w-[24px] h-[24px] ' src='/images/icon/pending.svg' />
                                <Box className='flex flex-col items-start justify-center'>
                                    <p className='flex text-STATE-YELLOW-DARKEN text-[14px]'>Pembayaran Berhasil Dilakukan pada : </p>
                                    <p className='flex text-STATE-YELLOW-DARKEN text-[14px] font-bold'>{props.updatedAt}</p>
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

                            {/*  */}

                            <Box className='w-[100%] h-[1px] bg-TEXT-4'></Box>    
                            
                            <AppButton
                                className={' flex text-white gap-[10px] w-auto justify-center items-center text-[12px] bg-SECONDARY-500 rounded-[12px] px-[40px] py-[8px] shadow-xl'}
                                text={'Lanjutkan Pembayaran'} 
                                type = {'Submit'}
                                onClick = {()=>{

                                    if(props.status == 'waiting'){
                                        window.location.href = props.callbackUrl
                                    }
                                }}
                            />

                        </Box>
                    </Box>
                </motion.div>
        </Modal>
    )
}

export default AppModalPendingPay;