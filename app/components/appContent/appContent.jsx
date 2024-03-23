import Box from '@mui/material/Box'
import AppButton from '../appButton/appButton'


const AppContent = (props) => {
    return(
        <Box className='flex items-start p-[12px] gap-[12px] rounded-[15px] shadow-CUSTOM-2' >
            <img src={props.image} className='rounded-[15px] w-[120px] h-[120px]' />
            <Box className = 'flex flex-col gap-[8px]'> 
                <p className='text-[14px] text-TEXT-1 font-semibold'>{props.caption || 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.'}</p>
                <p className='text-[12px] text-PRIMARY-400'>{props.hashtag || '#dad #sdsas #dfafs'}</p>
                <Box>
                    <AppButton
                        text='Lihat Detail'
                        onClick={props.onClick}
                        className={'py-[8px] px-[14px] text-[12px] bg-CUSTOM-RED shadow-xl text-white font-poppins rounded-[20px]'}
                    />
                </Box>
            </Box>
              
        </Box>
    )
}

export default AppContent;