import { motion } from 'framer-motion';
import Modal from '@mui/material/Modal';
import Grow from '@mui/material/Grow';
import Box from '@mui/material/Box'
import AppCloseButton from '../appCloseButton/appCloseButton';

const AppModal = (props) => {
    return (
        <Modal 
            open={props.open}
            className='flex flex-col justify-center items-center'
        >
            <Grow
                in={props.open}
                style={{ transformOrigin: '0 0 0' }}
                {...([props.open] ? { timeout: 1000 } : {})}
            >
                <Box
                    className={`${props.width ? props.width : 'w-auto'} h-auto rounded-[20px] bg-white p-[20px] flex flex-col gap-[15px] `}
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
                </Box>
            </Grow>
        </Modal>
    )
}

export default AppModal;