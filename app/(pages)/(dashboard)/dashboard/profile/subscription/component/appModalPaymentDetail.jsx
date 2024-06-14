import { motion } from 'framer-motion';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box'
import { subscriptionList } from '@/app/(pages)/(dashboard)/dashboard/profile/subscription/component/subscriptionList'
import AppButton from '@/app/components/appButton/appButton'
import AppCloseButton from '@/app/components/appCloseButton/appCloseButton'
import { formatRupiahNumber } from '@/app/utils/helper';
import { toast } from 'react-toastify';


const AppModalPaymentDetail = (props) => {
    
    return(
        <Modal 
            open={props.open}
            className='flex flex-col justify-center items-center'
        >
                <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.2 }}
                    className = 'w-[90%] md:w-[60%] lg:w-[60%] xl:w-[60%] h-auto rounded-[20px] bg-white p-[20px] '>
                    <Box className='flex flex-col gap-[25px]'>
                        <Box className = 'flex justify-between'>
                            <p className = 'text-[18px] font-bold text-black' >Detail Pembayaran</p>
                            <AppCloseButton
                                onClick = {()=>{
                                    props.onCloseButton(false)
                                }}
                            />
                        </Box>
                        
                        {/*  */}
                        <Box className='flex flex-col xl:flex-row lg:flex-row w-[100%] gap-[15px]'>
                                <Box className=' w-[100%] xl:w-[50%] lg:w-[50%] border-[1px] border-NEUTRAL-100 rounded-[20px]'>
                                    <Box className='flex flex-col gap-[15px] p-[20px]'>
                                        <p className = 'text-[18px] font-bold text-PRIMARY-500' >{props.data.title || 'Paket'}</p>
                                        <Box className={'flex flex-col gap-[5px]'}>
                                            {
                                                props.data.length != 0 ? 
                                                props.data.benefit.map((data,index)=>{
                                                    return(
                                                        <span className="flex">
                                                            <img src={'/images/icon/success-check.svg'} alt="icon-check" />    
                                                            <p className="text-[14px] text-TEXT-1">{data}</p>
                                                        </span>
                                                    )
                                                }) : null
                                            }
                                        </Box>
                                    </Box>
                                </Box>
                                <Box className='w-[100%] flex  flex-col gap-[15px]'>

                                    <Box className='border-[1px] border-NEUTRAL-100 rounded-[20px] flex flex-col p-[20px] gap-[15px]'>
                                        <p className = 'text-[14px] font-bold text-black' >Detail Tagihan</p>
                                        <Box className='flex flex-col gap-[10px]'>
                                            <span className="flex w-[100%] justify-between">
                                                <p className="text-[12px] text-TEXT-1">{`Harga Awal`}</p>
                                                <p className="text-[12px] text-TEXT-1 font-bold">Rp {formatRupiahNumber(props.data.price || 0)}</p>
                                            </span>
                                            <span className="flex w-[100%] justify-between">
                                                <p className="text-[12px] text-TEXT-1">{`Diskon`}</p>
                                                <p className="text-[12px] text-TEXT-1 font-bold">{`Rp 0`}</p>
                                            </span>
                                        </Box>
                                        <Box className='bg-TEXT-4 h-[1px] w-[100%]'></Box>
                                        <span className="flex w-[100%] justify-between">
                                            <p className="text-[14px] text-TEXT-1">{`Total Tagihan`}</p>
                                            <p className="text-[14px] text-TEXT-1 font-bold">Rp {formatRupiahNumber(props.data.price || 0)}</p>
                                        </span>
                                    </Box>
                                    {/*  */}
                                    <Box className='w-[100%] '>
                                        <AppButton
                                            className='w-[100%] text-[14px] py-[6px] bg-CUSTOM-RED hover:bg-SECONDARY-600 shadow-xl text-white font-poppins rounded-[18px]'
                                            text={'Bayar'} 
                                            type = {'Submit'}
                                            fontSize = {'12px'}
                                            onClick={props.onClick}
                                        />
                                    </Box>
                                </Box>
                        </Box>
                        {/*  */}
                                

                        
                    </Box>
                </motion.div>
        </Modal>
    )
}

export default AppModalPaymentDetail;