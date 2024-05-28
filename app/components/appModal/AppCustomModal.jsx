import Modal from '@mui/material/Modal';
import { motion } from 'framer-motion';
import Box from '@mui/material/Box'
import AppCloseButton from '../appCloseButton/appCloseButton';

const AppCustomModal = (props) => {
    return (
        <Modal 
            open={props.open}
            onClose={props.onClose}
            className='flex flex-col justify-center items-center'
        >
            <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.2 }}
                className = {`${props.width ? props.width : 'w-auto' }  h-auto rounded-[20px] items-center bg-white p-[20px] flex flex-col gap-[15px] border-[2px]`}>
                {
                    <Box className={`w-[100%] flex  ${props.modalType == 'modal-common' || props.titleTop ? 'justify-between' : 'justify-end' } `}>
                            {props.modalType == 'modal-common' || props.titleTop ? <p className={`${props.titleColor || 'text-TEXT-1'} text-[16px] font-bold`}>{props.title || 'title'}</p> : null }
                            {   props.withClose ?  <AppCloseButton
                                    onClick = {()=>{
                                        props.onCloseButton(false)
                                    }}
                                />: null}
                        </Box> 
                }
                { props.modalType == 'modal-status' ? <img className='w-[50px] h-[50px]' src={`/images/icon/${props.status}.svg`} /> : null}
                {
                props.modalType == 'modal-status' ? 
                <Box className={`flex flex-col gap-[8px] w-[100%] items-${ props.alignment ? props.alignment : 'start' }`}>
                    { props.titleTop ? null : <p className={`${props.titleColor || 'text-TEXT-1'} text-[16px] font-bold`}>{props.title || 'title'}</p>}
                    <p className={`${props.subtitleColor || 'text-TEXT-1'} text-[14px] font-medium`} >{props.subtitle || 'subtitle'}</p>
                </Box> : null
                }  
                {props.children}
            </motion.div>
        </Modal>
    )
}

export default AppCustomModal;