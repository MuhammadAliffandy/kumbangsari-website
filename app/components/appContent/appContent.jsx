import Box from '@mui/material/Box'
import AppButton from '../appButton/appButton'
import AppCustomButton from '../appButton/appCustomButton'
import AppAnimationContent from '../appAnimation/appAnimationContent'
import { listPlatform } from '@/app/utils/model'


const AppContent = (props) => {
    return(
        <AppAnimationContent>
            <Box className={` ${  props.image != null && props.caption == null && props.hashtag == null ? 'flex flex-col items-center' : 'flex items-center' } p-[12px] gap-[12px] rounded-[15px] shadow-CUSTOM-2`} >
                {
                    props.image != null && props.caption == null && props.hashtag == null ?   
                    <Box className='w-[100%] '> <img src={props.image} className='rounded-[15px] w-[380px] h-[140px] object-cover' />  </Box>
                    : props.image != null ? 
                    <Box className='w-[100%] '> <img src={props.image} className='rounded-[15px] w-[380px] h-[120px] object-cover' /> </Box> 
                    : null
                }
                <Box className = 'grow flex flex-col gap-[8px] '> 
                    {
                        props.caption ? <Box className = 'h-[34px] overflow-hidden text-ellipsis'>
                            <p className='text-[12px] text-TEXT-1 font-semibold '>{props.caption}</p>
                        </Box> : null
                    }
                    {
                        props.hashtag ? 
                        <Box className = 'h-[18px] overflow-hidden'>
                                <p className='text-[10px] text-PRIMARY-400'>{props.hashtag}</p>
                        </Box> : null
                    }
                    {
                        props.platform ? 
                        <Box className = 'flex gap-[6px] items-center'>
                            <img className='w-[18px] h-[18px] rounded-[100%]' src={ props.platform == 'facebook'? listPlatform.facebook : props.platform == 'instagram'? listPlatform.instagram : props.platform == 'twitter'? listPlatform.twitter : null  }/>
                            <p className='text-TEXT-3 text-[10px] font-medium'>{ props.productName || 'Bakso aci mantap'}</p>
                        </Box>: null
                    }
                    <Box>
                    {
                        props.isDashboard ? 
                            <AppCustomButton className='flex gap-[10px] items-center bg-white rounded-[20px] px-[15px] py-[5px] border-[1px] border-TEXT-4' onClick={props.onClick}>
                                    <img className='w-[18px] h-[18px] ' src={'/images/icon/sparkling-black.svg'}/>
                                    {props.isResponsive ? null : <p className="text-TEXT-1 font-bold text-[12px]">Lihat Detail</p>} 
                            </AppCustomButton>
                        :  <AppButton
                                text='Lihat Detail'
                                onClick={props.onClick}
                                className={'py-[8px] px-[14px] text-[12px] bg-CUSTOM-RED shadow-xl text-white font-poppins rounded-[20px]'}
                            />
                    }
                    </Box>
                </Box>
            </Box>
        </AppAnimationContent>
    )
}

export default AppContent;