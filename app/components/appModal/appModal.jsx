import { motion } from 'framer-motion';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box'
import AppCloseButton from '../appCloseButton/appCloseButton';

const AppModal = (props) => {
    return (
        <Modal 
            open={props.open}
            className='flex flex-col justify-center items-center'
        >
            <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.2 }}
                className={`${props.width ? props.width : 'w-auto'} h-auto rounded-[20px] bg-white p-[20px] flex flex-col gap-[15px] border-[2px]`}
            >
                    {props.withClose ? 
                        <Box className='w-[100%] flex justify-end'>
                                <AppCloseButton
                                        onClick = {()=>{
                                            props.onCloseButton(false)
                                        }}
                                    />
                            </Box> : null
                    }
                    {props.children}
            </motion.div>
        </Modal>
    )
}

export default AppModal;