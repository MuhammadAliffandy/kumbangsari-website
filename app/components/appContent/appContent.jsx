import Box from '@mui/material/Box'
import AppButton from '../appButton/appButton'
import AppAnimationContent from '../appAnimation/appAnimationContent'


const AppContent = (props) => {
    return(
        <AppAnimationContent>
            <Box className={` ${  props.image != null && props.caption == null && props.hashtag == null ? 'flex flex-col items-center' : 'flex items-center' } p-[12px] gap-[12px] rounded-[15px] shadow-CUSTOM-2`} >
                { props.image != null && props.caption == null && props.hashtag == null ? <img src={props.image} className='rounded-[15px] w-[180px] h-[180px]' />  : props.image ? <img src={props.image} className='rounded-[15px] w-[120px] h-[120px]' /> : null }
                <Box className = 'flex flex-col gap-[8px]'> 
                    { props.caption ? <p className='text-[12px] text-TEXT-1 font-semibold'>{props.caption}</p> : null}
                    {  props.hashtag ? <p className='text-[10px] text-PRIMARY-400'>{props.hashtag}</p> : null }
                    <Box>
                        <AppButton
                            text='Lihat Detail'
                            onClick={props.onClick}
                            className={'py-[8px] px-[14px] text-[12px] bg-CUSTOM-RED shadow-xl text-white font-poppins rounded-[20px]'}
                        />
                    </Box>
                </Box>
            </Box>
        </AppAnimationContent>
    )
}

export default AppContent;