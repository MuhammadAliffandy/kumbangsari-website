import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box'
import AppCloseButton from '../appCloseButton/appCloseButton';

const AppCustomModal = (props) => {
    return (
        <Modal 
            open={props.open}
            className='flex flex-col justify-center items-center'
        >
            <Box className = {`${props.width ? props.width : 'w-auto' }  h-auto rounded-[20px] items-center bg-white p-[20px] flex flex-col gap-[15px] border-[2px]`}>
                {props.withClose ? 
                    <Box className='w-[100%] flex justify-end'>
                            <AppCloseButton
                                    onClick = {()=>{
                                        props.onCloseButton(false)
                                    }}
                                />
                        </Box> : null
                }
                { props.modalType == 'modal-status' ? <img className='w-[50px] h-[50px]' src={`/images/icon/${props.status}.svg`} /> : null}
                <Box className={`flex flex-col gap-[8px] w-[100%] items-${ props.alignment ? props.alignment : 'start' }`}>
                    <p className={`${props.titleColor || 'text-TEXT-1'} text-[16px] font-bold`}>{props.title || 'title'}</p>
                    <p className={`${props.subtitleColor || 'text-TEXT-1'} text-[14px] font-medium`} >{props.subtitle || 'subtitle'}</p>
                </Box>
                {props.children}
            </Box>
        </Modal>
    )
}

export default AppCustomModal;