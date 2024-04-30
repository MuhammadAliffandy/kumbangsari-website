import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import AppTextField from '@/app/components/appTextField/appTextField'
import AppButton from '@/app/components/appButton/appButton'
import AppCloseButton from '@/app/components/appCloseButton/appCloseButton'
import SubscriptionList from './subscriptionList';


const AppModalSubscriptionList = (props) => {
    
    return(
        <Modal 
            open={props.open}
            onClose={props.onClose}
            className='flex flex-col justify-center items-center'
        >
            <Box className = 'w-[80%] h-auto rounded-[20px] bg-white p-[20px] flex flex-col gap-[15px]'>
                <Box className = 'flex justify-between'>
                    <p className = 'text-[18px] font-bold text-black' >Paket Berlangganan</p>
                    <AppCloseButton
                        onClick = {()=>{
                            props.onCloseButton(false)
                        }}
                    />
                </Box>
                <SubscriptionList/>
            </Box>
        </Modal>
    )
}

export default AppModalSubscriptionList;