import { motion } from 'framer-motion';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box'
import AppCloseButton from '@/app/components/appCloseButton/appCloseButton'
import SubscriptionList from './subscriptionList';


const AppModalSubscriptionList = (props) => {
    
    return(
        <Modal 
            open={props.open}
            onClose={props.onClose}
            className='flex flex-col justify-center items-center'
        >
            <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.2 }} 
                className = 'w-[80%] h-auto rounded-[20px] bg-white p-[20px] flex flex-col gap-[15px]'>
                <Box className = 'flex justify-between'>
                    <p className = 'text-[18px] font-bold text-black' >Paket Berlangganan</p>
                    <AppCloseButton
                        onClick = {()=>{
                            props.onCloseButton(false)
                        }}
                    />
                </Box>
                <SubscriptionList
                    onClick={(value)=>{props.onClick(value)}}
                />
            </motion.div>
        </Modal>
    )
}

export default AppModalSubscriptionList;