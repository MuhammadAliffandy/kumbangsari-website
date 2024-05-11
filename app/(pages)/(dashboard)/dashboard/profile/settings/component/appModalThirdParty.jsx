import { motion } from 'framer-motion';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box'
import AppButton from '@/app/components/appButton/appButton'
import AppCloseButton from '@/app/components/appCloseButton/appCloseButton'
import { listPlatform } from '@/app/utils/model';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

const thirdPartyAccess = [
    {
        platform : 'instagram',
        accessDate : '14 September 2024' 
    },
    {
        platform : 'facebook',
        accessDate : '14 September 2024' 
    },
    {
        platform : 'twitter',
        accessDate : '14 September 2024' 
    },
]

const AppModalThirdParty = (props) => {


    return(
        <Modal 
            open={props.open}
            className='flex flex-col justify-center items-center'
        >
                <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.2 }}
                    className = 'w-[40%] h-auto rounded-[20px] bg-white p-[20px] '>
                    <Box  className='flex flex-col gap-[25px]'>
                        <Box className = 'flex justify-between'>
                            <p className = 'text-[16px] font-bold text-black' >Daftar Aplikasi Pihak Ketiga</p>
                            <AppCloseButton
                                onClick = {()=>{
                                    props.onCloseButton(false)
                                }}
                            />
                        </Box>
                        
                        <Box className='flex flex-col gap-[10px]'>
                            {/*  */}
                            {
                                thirdPartyAccess.map(data => {
                                    return(
                                        <Box className='flex items-center p-[10px] gap-[10px] bg-NEUTRAL-100 rounded-[20px] justify-between'>
                                            <Box className='flex gap-[10px] '>
                                                <img className='w-[40px] h-[40px] rounded-[100%]' src={ data.platform == 'facebook'? listPlatform.facebook : data.platform == 'instagram'? listPlatform.instagram : data.platform == 'twitter'? listPlatform.twitter : null  }/>
                                                <Box className='flex flex-col items-start'>
                                                    <p className="text-TEXT-1 text-[14px] font-bold">{ data.platform == 'facebook'? 'Facebook' : data.platform == 'instagram'? 'Instagram' : data.platform == 'twitter'? 'Twitter' : null  }</p>
                                                    <p className="text-TEXT-1 text-[12px] ">Tgl pemberian akses: { data.accessDate}</p>
                                                </Box>
                                            </Box>
                                            <AppButton
                                                className='w-[20%] text-[12px] py-[6px] bg-CUSTOM-RED shadow-xl text-white font-poppins rounded-[12px]'
                                                text={'Hapus Akses'} 
                                                type = {'Submit'}
                                                fontSize = {'12px'}
                                                onClick={()=>{}}
                                            />
                                        </Box>
                                    )
                                })
                            }
                        </Box>
                        
                    </Box>
                </motion.div>
        </Modal>
    )
}

export default AppModalThirdParty;